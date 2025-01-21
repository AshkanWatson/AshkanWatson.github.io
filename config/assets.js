// Create a local assets config file to manage all external resources

// Add type definitions
/** @type {Record<string, {regular: string, bold: string}>} */
const FONTS = {
  inter: {
    regular: '/fonts/Inter-Regular.woff2',
    bold: '/fonts/Inter-Bold.woff2'
  }
};

/** @type {Record<string, string>} */
const IMAGES = {
  spotify: '/images/spotify.svg',
  raycast: '/images/raycast.svg',
  framer: '/images/framer.svg',
  figma: '/images/figma.svg',
  vscode: '/images/vscode.svg'
};

export const assets = {
  fonts: FONTS,
  images: IMAGES
};

// Add a helper function to validate assets
export const validateAsset = (path) => {
  if (!path) throw new Error('Asset path is required');
  return path.startsWith('/') ? path : `/${path}`;
}; 