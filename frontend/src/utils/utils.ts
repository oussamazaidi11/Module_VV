import z from "zod";

/**
 * UTILS FOR THE TASK NAVBAR
 * Zod schema for file validation
 * Handle File Images
 * Define allowed file types
 * Zod schema for form validation
 */

// Zod schema for file validation
export const fileSchema = z.object({
  files: z
    .array(
      z
        .instanceof(File)
        .refine((file) => file.size <= 100_000_000, {
          message: "File size must be less than 100MB",
        })
         .refine((file) => {
          const ext = file.name.split(".").pop()?.toLowerCase(); // "exe", "pdf"
          const mime = file.type; // might be empty
          
          // Check MIME type OR file extension
          const validMime = ACCEPTED_FILE_TYPES.includes(mime);
          const validExt =
            ext &&
            ACCEPTED_FILE_TYPES.some(
              (type) =>
                type.startsWith(".") && type.slice(1).toLowerCase() === ext
            );

          return validMime || validExt;
        }, { message: "Unsupported file type" })
    )
    .max(10, { message: "You can upload up to 10 files only." })
    .nonempty({ message: "Please select at least one file." }),
});
export type FileFormData = z.infer<typeof fileSchema>;

//  Handle Files
export const getFileIcon = (filetype: string) => {
  if (filetype.includes("image/")) return "file-img.svg";
  else if (filetype.includes("video/")) return "vd.svg";
  else return "file.svg";
};
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Define allowed file types
export const ACCEPTED_FILE_TYPES = [
  // Images
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/bmp",
  "image/webp",

  // Videos
  "video/mp4",
  "video/quicktime", // .mov
  "video/x-msvideo", // .avi
  "video/x-matroska", // .mkv
  "video/webm",

  // Audio
  "audio/mpeg", // .mp3
  "audio/wav",
  "audio/ogg",
  "audio/mp4", // .m4a

  // Documents
  "application/pdf",
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/vnd.ms-excel", // .xls
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx

  // Archives
  "application/zip",
  "application/vnd.rar",
  "application/x-7z-compressed", // .7z
  "application/x-tar",
  "application/gzip", // .gz

  // Optional wildcard for convenience
  "image/*",
  "video/*",
  "audio/*",

  // Extra formats (if you explicitly support them)
  ".exr",
  ".mov",
];
/**
 * Zod schema for form validation
 * 1 - Zod schema for form sendVersion
 * 2 - Zod schema for form TaksMaterials
 * 3 - Zod schema for form feedbacks
 */
// 1 -  Zod schema for form TaksMaterials
export const sendTaskSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
 
  packageLink: z.string().regex(/^(https?:\/\/)?([\w\-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/,"Please enter a valid URL"),
  sendAt: z.date({
    required_error: "Send date is required",
  }),
  expirationDate: z.date().optional(),
  password: z.string().optional(),
  information: z.string().optional(),
});
export type SendTaskFormData = z.infer<typeof sendTaskSchema>;

export const TaskSchema = z.object({
  taskname: z
    .string()
    .min(4, { message: " Name is required at least 4 caracter" })
    .max(300, { message: " Name cannot exceed 300 characters" })
    .trim(),
});
export type taskForm = z.infer<typeof TaskSchema>;

// 2 - Zod schema for form sendVersion
export const sendVersionSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),

  packageLink: z.string().regex(/^(https?:\/\/)?([\w\-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/,"Please enter a valid URL"),
  sendAt: z.date({
    required_error: "Send date is required",
  }),
  expirationDate: z.date().optional(),
  password: z.string().optional(),
  information: z.string().optional(),
});
export type SendVersionFormData = z.infer<typeof sendVersionSchema>;

export const VersionSchema = z.object({
  version_name: z
    .string()
    .min(4, { message: "Version Name is required at least 4 caracter" })
    .max(300,{message:"Must be lower than 300 caracter"})
    .trim(),
});
export type versionForm = z.infer<typeof VersionSchema>;

// 3 - Zod schema for form feedbacks
export const feedBackSchema = z.object({
  message: z.string().min(6, { message: "field required at least 6 caracteres" }),
});
export type feedBackForm = z.infer<typeof feedBackSchema>;
