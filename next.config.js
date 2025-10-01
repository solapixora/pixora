/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  experimental: {
    optimizeCss: true,
  },
  webpack: (config, { isServer }) => {
    // Exclude ffmpeg/ffprobe installer packages from client-side bundle
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        crypto: false,
      };
    }
    
    // Ignore non-JS files in node_modules (like README.md)
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    });

    // Mark these packages as external for server-side
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        '@ffmpeg-installer/ffmpeg': 'commonjs @ffmpeg-installer/ffmpeg',
        '@ffprobe-installer/ffprobe': 'commonjs @ffprobe-installer/ffprobe',
        'fluent-ffmpeg': 'commonjs fluent-ffmpeg',
      });
    }

    return config;
  },
}

module.exports = nextConfig
