/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
};

module.exports = nextConfig; 