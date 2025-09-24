import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadIcon, CheckCircleIcon } from './ui/Icons';
import { Button } from './ui/Button';
import { SectionWrapper } from './ui/SectionWrapper';
import { formatFileSize } from '../utils/helpers';

interface ProcessedFile {
  name: string;
  originalSize: number;
  newSize: number;
  downloadUrl: string;
}

export const ConverterTool = React.forwardRef<HTMLElement>((props, ref) => {
  const [file, setFile] = useState<File | null>(null);
  const [processedFile, setProcessedFile] = useState<ProcessedFile | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcessing = async (selectedFile: File) => {
    if (!selectedFile) return;
    
    setFile(selectedFile);
    setProcessedFile(null);
    setError("");
    setIsProcessing(true);

    try {
      // Simulate backend processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const isVideo = selectedFile.type.startsWith("video/");
      const ext = isVideo ? "mp4" : "jpg";
      const newName = selectedFile.name.replace(/\.[^/.]+$/, "") + `_pixora-ready.${ext}`;
      const compressionRatio = isVideo ? 0.65 : 0.45;
      const compressedSize = Math.round(selectedFile.size * compressionRatio);

      setProcessedFile({
        name: newName,
        originalSize: selectedFile.size,
        newSize: compressedSize,
        downloadUrl: URL.createObjectURL(selectedFile),
      });
    } catch (err) {
      setError("Failed to process file. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = (files: FileList | null) => {
    if (files && files[0]) {
      const selectedFile = files[0];
      
      // Validate file size (max 100MB)
      if (selectedFile.size > 100 * 1024 * 1024) {
        setError("File size must be less than 100MB");
        return;
      }

      // Validate file type
      const validTypes = ['image/', 'video/'];
      if (!validTypes.some(type => selectedFile.type.startsWith(type))) {
        setError("Please select a valid image or video file");
        return;
      }

      handleFileProcessing(selectedFile);
    }
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer?.files) {
      handleFileSelect(e.dataTransfer.files);
    }
  }, []);

  const handleReset = () => {
    setFile(null);
    setProcessedFile(null);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <SectionWrapper 
      id="converter" 
      ref={ref} 
      background="gray" 
      padding="xl"
      className="relative"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              File Converter Tool
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload your photos and videos to convert them into PIXORA-compatible formats
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!processedFile && !isProcessing ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  className={`
                    relative flex flex-col items-center justify-center 
                    p-12 md:p-16 lg:p-20 border-3 border-dashed rounded-2xl 
                    cursor-pointer transition-all duration-300 group
                    ${isDragging 
                      ? "border-blue-500 bg-blue-50 scale-105" 
                      : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                    }
                  `}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    accept="image/*,video/*,.heic,.hevc,.mov"
                  />
                  
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                    <UploadIcon size={64} className="text-gray-400 group-hover:text-blue-500" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                    Drag & Drop Your Files Here
                  </h3>
                  
                  <p className="text-gray-600 mb-6 text-center max-w-md">
                    Supports photos & videos including HEIC, MOV, MP4, JPG, PNG and more
                  </p>
                  
                  <Button variant="primary" size="lg" className="mb-4">
                    Choose Files
                  </Button>
                  
                  <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-500">
                    <span>• Max size: 100MB</span>
                    <span>• Free conversion</span>
                    <span>• Secure & private</span>
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    🔒 Files are processed securely and automatically deleted after conversion
                  </p>
                </div>
              </motion.div>
            ) : isProcessing ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-16"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 border-4 border-blue-200 rounded-full mx-auto animate-spin">
                    <div className="w-20 h-20 border-t-4 border-blue-600 rounded-full animate-spin" />
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-gray-800 mb-3">
                  Processing Your File...
                </h3>
                
                <p className="text-lg text-gray-600 mb-6">
                  Converting and optimizing for your PIXORA frame
                </p>

                <div className="bg-gray-100 rounded-full h-2 w-64 mx-auto">
                  <div className="bg-blue-600 h-2 rounded-full w-full animate-pulse" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center"
              >
                <div className="mb-8">
                  <CheckCircleIcon 
                    size={80} 
                    className="text-green-500 mx-auto mb-4" 
                  />
                  <h3 className="text-3xl font-bold text-green-600 mb-2">
                    Conversion Successful!
                  </h3>
                  <p className="text-lg text-gray-600">
                    Your file is now ready for your PIXORA frame
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <motion.div 
                    className="bg-gray-50 p-6 rounded-2xl border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="font-bold text-gray-800 mb-2 text-lg">Original File</h4>
                    <p className="text-gray-600 mb-2 truncate text-sm">
                      {file?.name}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatFileSize(processedFile!.originalSize)}
                    </p>
                  </motion.div>

                  <motion.div 
                    className="bg-green-50 p-6 rounded-2xl border border-green-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="font-bold text-green-800 mb-2 text-lg">Converted File</h4>
                    <p className="text-green-700 mb-2 truncate text-sm">
                      {processedFile!.name}
                    </p>
                    <p className="text-2xl font-bold text-green-700">
                      {formatFileSize(processedFile!.newSize)}
                    </p>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {Math.round((1 - processedFile!.newSize / processedFile!.originalSize) * 100)}% smaller
                      </span>
                    </div>
                  </motion.div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    as="a"
                    href={processedFile!.downloadUrl}
                    download={processedFile!.name}
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Download Converted File
                  </Button>
                  
                  <Button
                    onClick={handleReset}
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Convert Another File
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </SectionWrapper>
  );
});

ConverterTool.displayName = "ConverterTool";