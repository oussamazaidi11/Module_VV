import { useEffect, useState } from "react";

import type { VersionInfo } from "../../../../types";
import VersionCard from "./cards/VersionCard";
import { useShowSendVersStore } from "@/store/tasks/store";
import { getAllVersion } from "@/api/Version";
import { deleteVersion } from "@/api/Version";
import {client,collabor} from "../../../../Usr"
import toast from "react-hot-toast";
  interface versionProps {
     userRole: "CLIENT" | "COLLABOR" | "UNKNOWN";
  }
export default function Versions({userRole}:versionProps) {
  const { open } = useShowSendVersStore();
  const [versionInfo, setversionInfo] = useState<VersionInfo[]>([]);

  
useEffect(() => {
  const fetchVersions = async () => {
  
    try {
     
      const res = await getAllVersion();
      console.log(res);

      const mapped: VersionInfo[] = res.map((v: any) => ({
        id: v.versionID,
        name: v.versionName,
        desc: `Sent by ${v.userSenderID} on ${
          v.updatedAt ? new Date(v.updatedAt).toLocaleString() : "N/A"
        }`,
        data: [
          // map resources
          ...(v.versionResources?.map((r: any) => {
            //--------->here just the type of ressource for test it //if you want delete it and replace it like the taskmt fetch 
            ///
           const types=[
  "jpeg",
  "jpg",
  "png",
  "gif",
  "bmp",
  "webp",
  "mp4",
  "mov",
  "avi",
  "mkv",
  "webm",
  "mp3",
  "wav",
  "ogg",
  "m4a",
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "zip",
  "rar",
  "7z",
  "tar",
  "gz",
  "exr"
]
           const isImage = types.some(type => r.resourceMimeType.toLowerCase().includes(type));
            return {
              type: isImage ? "img" : "file",
              name: r.resourceSize,
              url: r.resourceUrl,
              img: isImage ? r.resourceUrl : undefined,
            };
          }) || []),
          // add package if exists
          ...(v.versionPackages
            ? [
                {
                  type: "file",
                  name: v.versionPackages.packageName || "Unnamed package",
                  url: v.versionPackages.packageLink || "#",
                },
              ]
            : []),
        ],
      }));
  toast.dismiss();
  toast.loading("Version Loading", { duration: 3000 });
      setversionInfo(mapped); // update state
    } catch (err) {
      console.error("Failed to fetch versions:", err);
    }
  };
 
  fetchVersions();
}, []);
  /**
   * Delete a Version
   * @param versionId :string
   */
  const DeleteVersion =async (versionId: string) => {
    try{
       toast.loading("Deleting",{duration:3000})
      const res=await deleteVersion(collabor.id,versionId)
       toast.success("Deleted With suceess",{duration:1000})
    setversionInfo(versionInfo.filter((version) => version.id.toString() != versionId.toString()));
    }catch(error){console.log(error)}
  };

  return (
    <div className="flex  flex-col gap-[32px]    ">
      {/*Task material flow and send material */}
      <div className="flex items-center justify-between flex-1 w-full ">
        <span className="p-[8px] font-[600] text-lg text-[#888888] border-l-2 border-[#5473C1] ">
          VERSIONS FLOW
        </span>
        {userRole==="COLLABOR" &&( <button
          onClick={open}
          className=" cursor-pointer hover:bg-white hover:text-black transition-all bg-[#45464a] text-white text-[13px] font-[400] py-[8px] px-[16px] rounded-[8px]"
        >
          Send Version
        </button>)}
       
      </div>
      {/*Task materials */}
      <div className="flex flex-col  gap-[32px]  sm:h-[52svh] h-[57svh] overflow-y-scroll  ">
        {versionInfo.map((version) => (
          <VersionCard
            userid={collabor.id}
            key={version.id}
            version={version}
            DeleteVersion={DeleteVersion}
            userRole={userRole}
          />
        ))}
      </div>
    </div>
  );
}
