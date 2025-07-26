/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Enable image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Bundle optimization
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@tabler/icons-react',
    ],
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      // Tree shaking improvements
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      
      // Optimize chunk splitting
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        maxAsyncRequests: 25,
        cacheGroups: {
          default: false,
          vendors: false,
          // Framework chunk (React, React-DOM, Next.js)
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // Radix UI components
          radix: {
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            name: 'radix',
            chunks: 'all',
            priority: 30,
          },
          // Icons
          icons: {
            test: /[\\/]node_modules[\\/](lucide-react|@tabler\/icons-react)[\\/]/,
            name: 'icons',
            chunks: 'all',
            priority: 30,
          },
          // Motion library
          motion: {
            test: /[\\/]node_modules[\\/](motion|framer-motion)[\\/]/,
            name: 'motion',
            chunks: 'all',
            priority: 30,
          },
          // Other vendor libraries
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
            priority: 20,
            minChunks: 2,
          },
          // App common chunks
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      };
    }
    
    return config;
  },
}

export default nextConfig
