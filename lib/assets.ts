// Next.js applies basePath to its bundles, but public files need an explicit prefix.
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');
export function publicAsset(name:string){return `${basePath}/${name.replace(/^\//,'')}`;}
