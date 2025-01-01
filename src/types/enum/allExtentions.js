export const allowedExtensions = {
  image: ["jpg", "jpeg", "png", "gif"],
  video: ["mp4", "avi", "mkv"],
  audio: ["mp3", "wav"],
  document: ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt"],
  code: ["js", "jsx", "ts", "tsx", "html", "css", "scss", "json", "xml"],
  compressed: ["zip", "rar", "7z"],
};
Object.freeze(allowedExtensions);

export const roleEnum = {
  admin: "admin",
  beneficiary: "beneficiary",
  specialist: "specialist",
};
Object.freeze(roleEnum);
