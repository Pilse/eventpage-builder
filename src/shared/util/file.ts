export const getImageUrlFromBlobFile = (blob: Blob) => {
  return URL.createObjectURL(blob);
};

export const getImageSizeFromBlobFile = (blob: Blob): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      resolve({ width: image.width, height: image.height });
    };
    image.src = URL.createObjectURL(blob);
  });
};
