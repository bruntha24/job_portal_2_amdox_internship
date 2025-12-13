import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// ===== Storage Config =====
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    // DEFAULTS
    let folder = "jobPortal/uploads";
    let resource_type = "image";
    let format = undefined;

    // Resume uploads (PDF, DOC, DOCX)
    if (file.fieldname === "resume") {
      folder = "jobPortal/resumes";
      resource_type = "raw";

      // SET CORRECT FORMAT (IMPORTANT!)
      if (file.mimetype === "application/pdf") format = "pdf";
      if (file.mimetype === "application/msword") format = "doc";
      if (
        file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      )
        format = "docx";
    }

    // Avatars / Logos
    if (file.fieldname === "avatar" || file.fieldname === "companyLogo") {
      folder = "jobPortal/images";
      resource_type = "image";
    }

    return {
      folder,
      resource_type,
      format,
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

// ===== File Filter =====
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "resume") {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC, DOCX allowed for resume"), false);
    }
  } else if (file.fieldname === "avatar" || file.fieldname === "companyLogo") {
    if (file.mimetype.startsWith("image")) cb(null, true);
    else cb(new Error("Only images allowed"), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
