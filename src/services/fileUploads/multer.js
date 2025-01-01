import multer from "multer";
import { allowedExtensions } from "../../types/enum/allExtentions.js";
import AppError from "../../utils/appError.js";

const mullterMiddleware = ({ extensions = allowedExtensions.image } = {}) => {
  // console.log("Allowed Extensions:", extensions);

  // File filter function
  const fileFilter = function (req, file, cb) {
    const fileExtension = file.mimetype.split("/")[1];
    if (extensions.includes(fileExtension)) {
      return cb(null, true);
    }
    cb(
      new AppError(
        `File format not allowed. Please upload a file with one of the following extensions: [ ${extensions.join(
          ", "
        )} ].`,
        400
      ),
      false
    );
  };

  return multer({
    fileFilter,
  });
};

// Combine image and document extensions
const uploadFiles = (fields) =>
  mullterMiddleware({
    extensions: [...allowedExtensions.image, ...allowedExtensions.document],
  }).fields(fields);

export { uploadFiles };

