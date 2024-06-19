// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: ['raw.githubusercontent.com'],
//       },
// };

// export default nextConfig;


const nextConfig = {
    output: 'standalone',
    images: {
      domains: ['raw.githubusercontent.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.dummyjson.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
  }
  
  export default nextConfig;
  