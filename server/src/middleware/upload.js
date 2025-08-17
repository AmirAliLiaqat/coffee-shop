import multer from "multer";

// Configure multer for memory storage
const storage = multer.memoryStorage();

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Add debugging middleware
const uploadWithDebug = (fieldName) => {
  return (req, res, next) => {
    console.log("=== MULTER DEBUG ===");
    console.log("Before multer - req.body:", req.body);
    console.log("Before multer - req.files:", req.files);

    upload.single(fieldName)(req, res, (err) => {
      if (err) {
        console.error("Multer error:", err);
        return res
          .status(400)
          .json({ message: "File upload error: " + err.message });
      }

      console.log("After multer - req.body:", req.body);
      console.log("After multer - req.file:", req.file);
      next();
    });
  };
};

export { uploadWithDebug };
export default upload;
