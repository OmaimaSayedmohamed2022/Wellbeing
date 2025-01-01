import cloudinary from "./cloudinary.js";

export const uploadFiles = async (paths, fieldName) => {
  try {
    const uploadResults = [];


    // Loop through all files in paths array
    for (const file of paths) {
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: "auto", // Automatically detect file type (image, video, raw, etc.)
        folder: `specialist_files/${fieldName}`, // Optional: Specify a folder in Cloudinary
        use_filename: true,
        unique_filename: true,
      });

      const { public_id: fileName, secure_url: fileUrl } = result;
      uploadResults.push({ fileName, fileUrl });
    }

    console.log("All uploads successful:", uploadResults);
    return { uploadResults };
  } catch (error) {
    console.error("Upload failed:", error);
    throw new Error("File upload failed");
  }
};

export const deleteFiles = async (publicIds) => {
  try {
    const deleteResults = [];

    // Loop through all public IDs in the array
    for (const publicId of publicIds) {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: "auto", // Automatically detect file type
      });

      deleteResults.push({ publicId, result });
    }

    console.log("Files deleted successfully:", deleteResults);
    return { deleteResults };
  } catch (error) {
    console.error("File deletion failed:", error);
    throw new Error("Failed to delete files");
  }
};
