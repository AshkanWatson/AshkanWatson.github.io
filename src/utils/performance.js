// Add performance utilities
export const lazyLoadImages = () => {
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]')
    images.forEach(img => {
      img.src = img.dataset.src
    })
  } else {
    // Fallback to Intersection Observer
    // Add intersection observer code here
  }
} 