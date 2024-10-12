/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      // Suppress the dynamic import warnings related to `keyv`
      config.ignoreWarnings = [
        {
          module: /keyv/,
          message: /the request of a dependency is an expression/,
        },
      ];
  
      return config;
    },
  };
  
  export default nextConfig;
  