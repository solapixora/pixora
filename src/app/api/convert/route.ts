import { NextResponse } from 'next/server';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import ffprobeInstaller from '@ffprobe-installer/ffprobe';
import os from 'os';
import path from 'path';
import crypto from 'crypto';
import { promises as fs } from 'fs';

// Ensure we run on the Node.js runtime
export const runtime = 'nodejs';
// Ensure no static optimization/caching interferes
export const dynamic = 'force-dynamic';
// Allow longer processing for ffmpeg
export const maxDuration = 60;

// Handle CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

// Configure ffmpeg binary path
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.setFfprobePath(ffprobeInstaller.path);

export async function POST(req: Request) {
  let inputPath = '';
  let outputPath = '';

  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Extract original file name if available
    const originalName = (file as any)?.name || 'input';
    const inputExt = path.extname(originalName) || '.bin';
    const baseName = path.basename(originalName, inputExt);

    // Write incoming file to a temporary location
    const tmpDir = os.tmpdir();
    const id = crypto.randomUUID();
    inputPath = path.join(tmpDir, `pixora-${id}${inputExt}`);
    outputPath = path.join(tmpDir, `pixora-${id}-out.mp4`);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(inputPath, buffer);

    // Run ffmpeg to transcode to MP4 (H.264/AAC) with 1080p max height
    // Only downscale if larger than 1080p, never upscale, maintain aspect ratio
    await new Promise<void>((resolve, reject) => {
      ffmpeg(inputPath)
        .outputOptions([
          '-c:v', 'libx264',
          '-preset', 'medium',           // Better compression than 'veryfast'
          '-crf', '23',                  // Better quality/size balance (18-28 range, 23 is default)
          '-pix_fmt', 'yuv420p',
          '-vf', 'scale=\'min(1920,iw)\':\'min(1080,ih)\':force_original_aspect_ratio=decrease,pad=ceil(iw/2)*2:ceil(ih/2)*2', // Maintain aspect ratio, ensure even dimensions
          '-maxrate', '5M',              // Limit max bitrate to 5 Mbps
          '-bufsize', '10M',             // Buffer size for rate control
          '-c:a', 'aac',
          '-b:a', '128k',
          '-movflags', '+faststart',
          '-map_metadata', '0',          // Preserve metadata
          '-map_metadata:s:v', '0:s:v',  // Preserve video stream metadata
          '-map_metadata:s:a', '0:s:a',  // Preserve audio stream metadata
        ])
        .on('error', (err) => reject(err))
        .on('end', () => resolve())
        .save(outputPath);
    });

    const outputBuffer = await fs.readFile(outputPath);
    const filename = `${baseName}_pixora-ready.mp4`;

    return new NextResponse(outputBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
        // CORS headers (useful if used cross-origin)
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Expose-Headers': 'Content-Disposition',
      },
    });
  } catch (err: any) {
    console.error('FFmpeg API error:', err);
    return NextResponse.json({ error: 'Conversion failed', details: String(err?.message || err) }, { status: 500 });
  } finally {
    // Cleanup temp files
    try { if (inputPath) await fs.unlink(inputPath); } catch {}
    try { if (outputPath) await fs.unlink(outputPath); } catch {}
  }
}
