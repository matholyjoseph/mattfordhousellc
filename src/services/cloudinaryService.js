const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Upload an image file directly to Cloudinary using unsigned upload presets.
 * @param {File} file - Native HTML File object
 * @param {string} folder - Destination subfolder in Media Library (e.g. 'books', 'blogs')
 * @returns {Promise<{secure_url: string, public_id: string}>}
 */
export const uploadImageToCloudinary = async (file, folder = "general") => {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error(
      "Cloudinary settings are missing. Please configure VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your local .env file."
    );
  }

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", folder);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error?.message || `Cloudinary upload failed with status ${response.status}`
      );
    }

    const data = await response.json();
    return {
      secure_url: data.secure_url,
      public_id: data.public_id
    };
  } catch (error) {
    console.error("Cloudinary upload service error:", error);
    throw error;
  }
};
