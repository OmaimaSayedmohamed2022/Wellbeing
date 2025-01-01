import Files from "../models/FilesModel.js";
import { uploadToCloudinary } from "../services/fileUploads/cloudinary.js";

export const makeFiles = async (req, res, next) => {
  try {
    // console.log(req.files, " ** req.body.files ");

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadResults = {};
    // Define required file fields for validation
    const requiredFields = [
      "idOrPassport",
      "resume",
      "ministryLicense",
      "associationMembership",
    ];

    // Loop through required fields and handle file uploads
    for (const fieldName of requiredFields) {
      if (!req.files[fieldName] || req.files[fieldName].length === 0) {
        throw new Error(`Missing required file: ${fieldName}`);
      }

      const file = req.files[fieldName][0]; // Get the first file
      const uploadedFile = await uploadToCloudinary(
        file.buffer,
        `specialist_files/${fieldName}`
      );

      // Save the uploaded file's URL and ID
      uploadResults[fieldName] = {
        url: uploadedFile.secure_url,
        id: uploadedFile.public_id,
      };
    }

    // Handle "certificates" as an optional array
    if (req.files.certificates && req.files.certificates.length > 0) {
      uploadResults.certificates = await Promise.all(
        req.files.certificates.map((file) =>
          uploadToCloudinary(file.buffer, `specialist_files/certificates`)
        )
      ).then((results) =>
        results.map((file) => ({
          url: file.secure_url,
          id: file.public_id,
        }))
      );
    }

    // Create the Files document with the uploaded data
    const fileDocument = await Files.create(uploadResults);

    // Attach the created document's ID to the request body
    req.body.files = fileDocument._id;

    next();
  } catch (error) {
    console.error("Error in makeFiles:", error);
    res.status(500).json({
      message: "Error processing files",
      error: error.message,
    });
  }
};
