import { useState } from "react";
import type { VersionInfo } from "../../../../../types";
import FeedBacks from "../FeedBacks";
import {client,collabor} from "../../../../../Usr"
import UpdatePac from "../forms/UpdatePac";
import UpdateRes from "../forms/UpdateRes";
import { File,Folder,Music4 } from "lucide-react";


interface Props {
  version: VersionInfo;
  DeleteVersion: (value: string) => void;
  userRole: "CLIENT" | "COLLABOR" | "UNKNOWN";
  userid:string
}

export default function VersionCard({ version, DeleteVersion,userRole,userid }: Props) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [update ,setUpdate]=useState(false)

  

  return (
    <div className=" flex flex-col gap-[24px] rounded-[12px] h-fit p-[20px] bg-[#21242D]">
      {/*Header*/}
      <div>
        <div className="flex justify-between">
          <p className="font-[500] text-lg">{version.name}</p>
          <div className="relative">
            {userid===collabor.id &&(
               <button
              onClick={() => setShowMenu(!showMenu)}
              className=" hover:bg-black/45 cursor-pointer w-[30px]  rounded-[24px] flex items-center justify-center p-2  "
            >
              <img src="Vector.svg" alt="" />
            </button>
            )}
           

            {showMenu && (
              <div className=" z-10 absolute top-8  right-3 bg-[#17181D] motion-preset-expand motion-duration-200 border border-[#393D46] flex flex-col gap-[8px] w-[72px]  p-[10px] items-start justify-center rounded-[5px]">
                <div
                  onClick={()=>setUpdate(!update)}
                  className="flex cursor-pointer hover:opacity-80 transition-all gap-[4px] items-center "
                >
                  <img src="Edit.svg" alt="" />
                  <span className="text-[12px]">Edit</span>
                </div>
                <div
                  onClick={() => DeleteVersion(version.id.toString())}
                  className="flex cursor-pointer hover:opacity-80 transition-all gap-[3px] items-center "
                >
                  <img src="delete.svg" alt="" />
                  <span className="text-[#AA3A39] text-[12px]">Delete</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <span className="text-sm text-[#888888] font-[300]">
          {version.desc}
        </span>
      </div>
      {/*DATA */}
      <section className="flex flex-wrap w-full gap-5">
    {version.data.map((d) =>
        d.type === "file" ? (
          <div> <div className=" w-full border border-[#393D46] rounded-[12px] block p-[16px] bg-[#17181D]">
              <span>Package: {d.name}</span>
              <div className="flex items-center gap-1 font-[500]">
                <span>Link: </span>
                <a href={d.url} className="text-[#5473C1]">
                  Download Link
                </a>
              </div>
            </div>
          {update && (
         <div className="fixed inset-0 z-50 bg-black/60">
           <div className=" absolute top-1/2 left-[-400px] -translate-x-1/2 -translate-y-1/2 border border-[#393D46] rounded-[12px] p-6 shadow-lg bg-[#17181D]">
             <UpdatePac
               update={update}
                versionName={version.name}
               verID={version.id.toString()}
               close={() => setUpdate(false)}
             />
           </div>
         </div>
       )}     
          </div> ) :(
          <div> <a
              href={d.url}
              className=" border border-[#393D46] rounded-[12px] block w-[173px] h-[188px] p-[16px] bg-[#17181D]"
            >
              <div className="flex flex-col gap-[10px]">
               {/*here if is pdf so u can add pdf icon else just diplay it like image */ }
               {(() => {
  const ext = d.img?.split("?")[0].split(".").pop()?.toLowerCase();

  // === File type groups ===
  const videoExts = ["mp4", "mov", "avi", "mkv", "webm"];
  const audioExts = ["mp3", "wav", "ogg", "m4a"];
  const documentExts = ["pdf", "doc", "docx", "xls", "xlsx"];
  const archiveExts = ["zip", "rar", "7z", "tar", "gz"];

  if (!ext) {
    // fallback: unknown or missing extension
    return (
      <div className="flex flex-col items-center justify-center w-[138.32px] h-[134px] bg-gray-700 rounded-[5.36px] text-white text-xs">
        ❓<span className="mt-1">Unknown</span>
      </div>
    );
  }


  if (videoExts.includes(ext)) {
    return (
      <video
        controls
        className="rounded-[5.36px] w-[138.32px] h-[134px] object-cover"
      >
        <source src={d.img} type={`video/${ext === "mov" ? "quicktime" : ext}`} />
        Your browser does not support the video tag.
      </video>
    );
  }


  if (audioExts.includes(ext)) {
    return (
      <div className="flex flex-col items-center justify-center w-[138.32px] h-[134px] bg-[#222] rounded-[5.36px] text-white text-xs">
        <Music4/><span className="mt-1 capitalize">Audio</span>
      </div>
    );
  }


  if (documentExts.includes(ext)) {
    return (
      <div className="flex flex-col items-center justify-center w-[138.32px] h-[134px] bg-[#222] rounded-[5.36px] text-white text-xs">
        <File/> <span className="mt-1 uppercase">{ext}</span>
      </div>
    );
  }


  if (archiveExts.includes(ext)) {
    return (
      <div className="flex flex-col items-center justify-center w-[138.32px] h-[134px] bg-[#222] rounded-[5.36px] text-white text-xs">
        <Folder/><span className="mt-1 capitalize">Archive</span>
      </div>
    );
  }

  // === DEFAULT (IMAGE or unknown visual) ===
  return (
    <img
      src={d.img}
      alt="Preview"
      className="rounded-[5.36px] w-[138.32px] h-[134px] object-cover"
    />
  );
})()}
                <span className="text-sm text-[#888888] text-center">
                  {d.name.slice(0,5)}
                </span>
              </div>
            </a>
             {update && (
         <div className="fixed inset-0 z-50 bg-black/60">
           <div className=" absolute top-1/2 left-[-400px] -translate-x-1/2 -translate-y-1/2 border border-[#393D46] rounded-[12px] p-6 shadow-lg bg-[#17181D]">
             <UpdateRes
              versionName={version.name}
               update={update}
               verID={version.id.toString()}
               close={() => setUpdate(false)}
             />
           </div>
         </div>
       )}
        </div>    )
  )}
    
      </section>
      <div className="text-gray-700 bg-gray-700 w-full h-[1px]"></div>
      {/*Feedback */}
      <FeedBacks versionId={version.id} userRole={userRole} />
    </div>
  );
}
