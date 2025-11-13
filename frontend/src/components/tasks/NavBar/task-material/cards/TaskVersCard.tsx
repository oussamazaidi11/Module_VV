import { useState } from "react";
import type { TaskMatInfo } from "../../../../../types";
import FeedBacks from "../FeedBacks";
import UpdateRes from "../forms/UpdateRes";
import UpdatePac from "../forms/UpdatePac";
import { File,Folder,Music4 } from "lucide-react";
interface Props {
  taskmat: TaskMatInfo;
  DeleteTask: (value: string) => void;
   userRole: "CLIENT" | "COLLABOR" | "UNKNOWN";
   userid:string;
}


export default function TaskVersCard({ taskmat, DeleteTask,userRole,userid }: Props) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [update ,setUpdate]=useState(false)
  const[updatep,setUpdatep]=useState(false)
 
 
 



  


  return (
    <div className=" flex flex-col gap-[24px] rounded-[12px] h-fit p-[20px] bg-[#21242D]">
      {/*Header*/}
      <div>
        <div className="flex justify-between">
          <p className="font-[500] text-lg">{taskmat.name}</p>
          <div className="relative">
            {userRole==="CLIENT" && (
           
              <button
              onClick={() => setShowMenu(!showMenu)}
              className=" hover:bg-black/45 cursor-pointer w-[30px]  rounded-[24px] flex items-center justify-center p-2  "
            >
              <img src="Vector.svg" alt="" />
            </button>  )}
            
           
            

            {showMenu   && (
              <div className=" z-10 absolute top-8  right-3 bg-[#17181D] motion-preset-expand motion-duration-200 border border-[#393D46] flex flex-col gap-[8px] w-[72px]  p-[10px] items-start justify-center rounded-[5px]">
                <div
                 onClick={()=>{
                    setUpdate(!update)
                  }} 
                  
                  className="flex cursor-pointer hover:opacity-80 transition-all gap-[4px] items-center "
                >
                  <img src="Edit.svg" alt="" />
                  <span className="text-[12px] w-[10px]">Edit</span>
                </div>
                <div
                  onClick={() => DeleteTask(taskmat.id.toString())}
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
          {taskmat.desc}
        </span>
      </div>
      {/*DATA */}
      <section className="flex flex-wrap w-full gap-5">
 {taskmat.data.map((d) =>
        d.type === "file" ? (
     <div>  <div className=" w-full border border-[#393D46] rounded-[12px] block p-[16px] bg-[#17181D]">
              <span>Package: {d.name}</span>
              <div className="flex items-center gap-1 font-[500]">
                <span>Link: </span>
                <a href={d.url} className="text-[#5473C1]">
                  Download Link
                </a>
              </div>
            </div>
            <div>


              {update && (
  <div className="fixed inset-0 z-50 bg-black/60">
    <div className=" absolute top-1/2 left-[-400px] -translate-x-1/2 -translate-y-1/2 border border-[#393D46] rounded-[12px] p-6 shadow-lg bg-[#17181D]">
      <UpdatePac
        update={update}
        taskmaterN={taskmat.name}
        taskmID={taskmat.id.toString()}
        close={() => setUpdate(false)}
      />
    </div>
  </div>
)}

            </div>
    



         </div>      ) :(
            <div>
            <a
              href={d.url}
              className=" border border-[#393D46] rounded-[12px] block w-[173px] h-[188px] p-[16px] bg-[#17181D]"
            >
              
              <div className="flex flex-col gap-[10px]">
               
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

  // === VIDEO ===
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

  // === AUDIO ===
  if (audioExts.includes(ext)) {
    return (
      <div className="flex flex-col items-center justify-center w-[138.32px] h-[134px] bg-[#222] rounded-[5.36px] text-white text-xs">
        <Music4/><span className="mt-1 capitalize">Audio</span>
      </div>
    );
  }

  // === DOCUMENTS (PDF, DOC, XLS, etc.) ===
  if (documentExts.includes(ext)) {
    return (
      <div className="flex flex-col items-center justify-center w-[138.32px] h-[134px] bg-[#222] rounded-[5.36px] text-white text-xs">
        <File/><span className="mt-1 uppercase">{ext}</span>
      </div>
    );
  }

  // === ARCHIVES (ZIP, RAR, etc.) ===
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
                  {d.name.slice(0,6)} 
                </span>
   
              </div>
            </a>
   
                  {update && (
  <div className="fixed inset-0 z-50 bg-black/60">
    <div className="absolute top-1/2 left-[-400px] -translate-x-1/2 -translate-y-1/2 
                    bg-[#17181D] border border-[#393D46] rounded-[12px] p-6 shadow-lg">
      <UpdateRes  update={update} taskmID={taskmat.id.toString()} taskmaterN={taskmat.name} close={() => setUpdate(false)} />
    </div>
  </div>
)}
          
          
          
         </div> )
  )}
      


      </section>
      <div className="text-gray-700 bg-gray-700 w-full h-[1px]"></div>
      {/*Feedback */}
      <FeedBacks taskmatId={taskmat.id.toString()} userRole={userRole} />
    </div>
  );
}
