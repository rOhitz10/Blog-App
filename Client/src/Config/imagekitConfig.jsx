import ImageKit from 'imagekit';

// Initialize ImageKit
export const imagekit = new ImageKit({
  publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
  privateKey: import.meta.env.VITE_IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT
});

// Test connection
export const testImageKitConnection = async () => {
  try {
    const result = await imagekit.getFileList({
      limit: 1
    });
    return result.$ResponseMetadata.httpStatusCode === 200;
  } catch (error) {
    console.error('ImageKit connection test failed:', error);
    return false;
  }
};

export default imagekit;