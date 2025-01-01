// import { makeFiles } from "./makeFiles.js"; // Your function to upload the image to Cloudinary
// import catchAsyncError from "./catchAsyncError"; // Utility for handling async errors

// export const attachFiles = catchAsyncError(async (req, res, next) => {
//   if (!req.files) return next(); // No files uploaded, move to the next middleware

//   const fieldsToProcess = [
//     "idOrPassport",
//     "resume",
//     "certificates",
//     "ministryLicense",
//     "associationMembership",
//   ];

//   // Process each field defined above
//   for (const field of fieldsToProcess) {
//     const files = req.files[field]; // Access the files uploaded for this field
//     if (!files || files.length === 0) continue; // Skip if no files for the field

//     // Handle single-file fields
//     if (["idOrPassport", "resume", "ministryLicense", "associationMembership"].includes(field)) {
//       const fileDoc = await makeFiles(files[0].path); // Upload file to Cloudinary
//       req.body.specialistFiles[field] = fileDoc._id; // Add the uploaded file's ID to req.body
//     }

//     // Handle multi-file fields (e.g., certificates)
//     if (field === "certificates") {
//       const fileDocs = [];
//       for (const file of files) {
//         const fileDoc = await makeFiles(file.path); // Upload file to Cloudinary
//         fileDocs.push(fileDoc._id); // Collect uploaded file IDs
//       }
//       req.body.specialistFiles[field] = fileDocs; // Add array of file IDs to req.body
//     }
//   }

//   console.log("Processed req.body:", req.body);
//   next();
// });



// import Files from "../../models/Files.js";
// import { uploadFiles as uploadToCloudinary } from "../services/fileUploads/filesController.js"; 

// export const makeFiles = async (req, res, next) => {
//   try {
//     if (!req.files || Object.keys(req.files).length === 0) {
//       return res.status(400).json({ message: "No files uploaded" });
//     }

//     // Process each field and upload files
//     const uploadResults = {};
//     for (const [fieldName, files] of Object.entries(req.files)) {
//       const uploadedFiles = await Promise.all(
//         files.map((file) => uploadToCloudinary(file.path, folderName))
//       );

//       // Handle single and multiple file fields
//       uploadResults[fieldName] =
//         uploadedFiles.length === 1 ? uploadedFiles[0] : uploadedFiles;
//     }

//     // Map results to Files schema
//     const filesData = {
//       idOrPassport: uploadResults.idOrPassport || null,
//       resume: uploadResults.resume || null,
//       certificates: uploadResults.certificates || [],
//       ministryLicense: uploadResults.ministryLicense || null,
//       associationMembership: uploadResults.associationMembership || null,
//     };

//     // Save file data to database
//     const fileDocument = await Files.create(filesData);

//     // Attach the file document ID to the request body
//     req.body.files = fileDocument._id;

//     next();
//   } catch (error) {
//     console.error("Error in makeFiles:", error);
//     res.status(500).json({ message: "File processing failed", error });
//   }
// };
