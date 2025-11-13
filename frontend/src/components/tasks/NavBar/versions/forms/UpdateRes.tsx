import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UploadedFile } from "../../../../../types";
import { taskID } from "../../../../../Usr";

import {
  ACCEPTED_FILE_TYPES,
  fileSchema,
  formatFileSize,
  getFileIcon,
  type FileFormData,
} from "../../../../../utils/utils";
import {useShowSendVersStore } from "@/store/tasks/store";
import {client,collabor} from "../../../../../Usr"
import { createVersion, updateVersion } from "@/api/Version";
import toast from "react-hot-toast";

interface Props {
  verID: string;
  close: () => void;
  update:boolean;
  versionName:string
}

export default function SendRes({ verID,close,update,versionName }: Props) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [versionN,setversionN]=useState("")


  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FileFormData>({
    resolver: zodResolver(fileSchema),
  });

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substring(7),
        file,
        size: formatFileSize(file.size),
      }));

      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  useEffect(() => {
    setValue("files", uploadedFiles.map((f) => f.file) as [File, ...File[]]);

  }, [uploadedFiles, setValue]);

  /**
   * --- HANDLE FILE SUBMISSION ---
   * - files: File[] (required)
   *   → Array of files uploaded by the user.
   *   → Each file must:
   *       - Be an instance of File
   *       - Have a size ≤ 100 MB
   *   → Maximum allowed files: 10
   */
 const onSubmit = async (data: FileFormData) => {
     console.log("Submitted files:", data,versionN);
    if (uploadedFiles.length === 0) {
     console.warn("No files uploaded");
     return;
   }
 
   // Map all uploaded files to backend resource format
   /// herrrreee the azuure services  cuz  exp.com is the server azure to send the resource 
 
   const uploadedResources = await Promise.all(
     data.files.map(async (file) => {
       const formData = new FormData();
       formData.append("file", file);
       formData.append("userId", client.id);
   
       const res = await fetch(`http://localhost:3000/azure/upload`, {
         method: "POST",
         body: formData,
       });
       const json = await res.json();
       console.log(json.url)
   
       return {
         resourceUrl: json.url,       // Azure URL returned by backend
         resourceSize: file.size ,
         uploadedByUserID: client.id,
         uploadedAt: new Date(),
         taskMaterialID: "",          // backend sets this
       };
     })
   );
   const payload = {
    versionName:versionName,
    versionWithResources: true,
    versionWithPackage: false,
    taskID: taskID, 
    resource: uploadedResources.length === 1 ? uploadedResources[0] : uploadedResources,
  };
  console.log(payload)
  try {
     toast.loading("Updating Version",{duration:3000})
    const res = await updateVersion(collabor.id,verID, payload);
   
    console.log("Version Updated successfully:", res);
    close();
    toast.success("Updated with success",{duration:1000})
     
  
  } catch (error) {
    console.error(error);
      toast.error("Please check your storage ",{duration:1000})
      close()
  }
 
  
  
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sm:w-[471px]">
      {/*Upload Area */}
         <div className="mb-2">
  <input
    className="w-full bg-transparent border-none outline-none focus:outline-none focus:border-none"
    placeholder=" Version name..."
             value={versionName}
          onChange={(e) => setversionN(e.target.value)} 
          disabled
  />
</div>
      <div
        className={`border-2 border-dashed rounded-lg px-[16px] py-[24px] mb-[32px] text-center
              ${
                isDragging
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-600"
              }
              ${errors.files ? "border-red-500" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept={ACCEPTED_FILE_TYPES.join(",")}
          className="hidden"
          id="fileInput"
          onChange={(e) => handleFileUpload(e.target.files)}
        />
        <p className="mb-4 text-sm text-[#4d5055]">
          Drag and drop files here, or
        </p>
        <label
          htmlFor="fileInput"
          className="gap-2 inline-flex items-center px-4 py-2 text-white bg-[#32353b] rounded-[8px] cursor-pointer hover:opacity-80"
        >
          <img src="Upload.svg" alt="" />
          Upload From Desktop
        </label>
        {errors.files && (
          <p className="mt-2 text-red-500">{errors.files.message}</p>
        )}
      </div>
      {/* File List */}
      {uploadedFiles.length > 0 && (
        <div className="mb-[56px] flex flex-col gap-[8px]">
          <p className="font-[500] text-[18px]">Uploaded Files</p>
          <div className="overflow-auto h-[20svh] flex flex-col gap-[8px] ">
            {uploadedFiles.map((file) => (
              <div className=" text-[#8b8b8e] rounded-[8px] flex items-center justify-between text-sm py-[12px] px-[16px] bg-[#17181D]">
                <div className="flex gap-[8px]">
                  <img src={getFileIcon(file.file.type)} alt="" />
                  <span className="overflow-auto text-nowrap sm:w-[300px] w-[100px] ">
                    {file.file.name}
                  </span>
                </div>
                <div
                  onClick={() => removeFile(file.id)}
                  className="flex gap-[8px] cursor-pointer whitespace-nowrap"
                >
                  <span className="truncate">{file.size}</span>
                  <img src="ben.svg" alt="ben-icon" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Actions */}
      <div className="flex justify-end gap-[32px] text-sm">
        <button
          onClick={close}
          type="button"
          className=" transition-all px-6 py-2 text-white bg-[#32353b] rounded-lg outline-none hover:opacity-75 cursor-pointer"
        >
          Close
        </button>
        <button
          type="submit"
          className=" transition-all cursor-pointer px-6 py-2 text-white bg-[#5473C1] rounded-lg hover:opacity-75"
        >
          Confirm
        </button>
      </div>
    </form>
  );
}
