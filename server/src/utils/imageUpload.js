import cloudinary from "./cloudinary.js";

export const uploadImageToCloudinary = async (file) => {
  try {
    // Convert buffer to base64
    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${b64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "coffee-shop/products",
      resource_type: "auto",
      transformation: [
        { width: 800, height: 600, crop: "fill" },
        { quality: "auto" },
      ],
    });

    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload image");
  }
};

export const deleteImageFromCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl) return;

    // Extract public_id from URL
    const publicId = imageUrl.split("/").slice(-1)[0].split(".")[0];
    const folder = "coffee-shop/products";
    const fullPublicId = `${folder}/${publicId}`;

    await cloudinary.uploader.destroy(fullPublicId);
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    // Don't throw error as this is not critical
  }
};
