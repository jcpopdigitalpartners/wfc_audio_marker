import type { NextConfig } from 'next';
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');
if (basePath && (!basePath.startsWith('/') || basePath.includes('..'))) {
 throw new Error('NEXT_PUBLIC_BASE_PATH must be a URL prefix such as /my-repository.');
}
const config: NextConfig = {
 output: 'export',
 trailingSlash: true,
 basePath,
 images: { unoptimized: true },
};
export default config;
