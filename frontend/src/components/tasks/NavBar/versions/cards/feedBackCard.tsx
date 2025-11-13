import { useState } from "react";

import type { FeedBack } from "../../../../../types";
import UpdateFeedBack from "../forms/UpdateFeedBack";
import { DEleteFeedBack } from "@/api/Version";
import { client, collabor } from "@/Usr";
import toast from "react-hot-toast";

const StatusColor = {
  "PROCESSED_SUCCESSFULLY":
    "capitalize font-[400] text-sm  whitespace-nowrap h-fit text-[#23A758] ",
 REMARK:
    "capitalize font-[400] text-sm  whitespace-nowrap h-fit text-[#F4CD57] ",
  "MISSING_DATA":
    "capitalize font-[400] text-sm  whitespace-nowrap h-fit text-[#AA3A39] ",
};

const StatusIcon = {
   PROCESSED_SUCCESSFULLY: "approved.svg",
  REMARK: "remark.svg",
  "MISSING_DATA": "rev-needed.svg",
};

interface Props {
  feedback: FeedBack;
  setShowFeedback: (value: boolean) => void;
  setFeedback: (value: FeedBack | null) => void;
  versionId:string
}

export default function FeedBackCard({
  feedback,
  versionId,
  setShowFeedback,
  setFeedback,
}: Props) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
   const [buttonColor, setButtonColor] = useState<string>(
    feedback.feedbackType === "REMARK"
      ? "bg-[#F4CD57]"
      : feedback.feedbackType === "PROCESSED_SUCCESSFULLY"
      ? "bg-[#23A758]"
      : "bg-[#AA3A39]"
  );
  const [update,setupdate]=useState(false)
 
  const DeleteFeedBack=async(id:string)=>{
    try{
      toast.loading("Deleting...",{duration:3000})
    const res =await DEleteFeedBack(client.id,id)
      toast.success("Deleted",{duration:1000})
      setFeedback(null)}catch(err){console.log(err)}

  }




  return (
    <div className="flex items-start gap-2 text-sm">
      <img
        className="bg-[#F6F6F6] h-[40px] w-[40px] rounded-[500px] p-[10px]"
        src={feedback.user_img ||""}
        alt="avatar-img"
      />
      <div className="flex flex-col w-full gap-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-2 pt-2">
            <span className="font-semibold ">{feedback.userReciverFirstName+""+ feedback.userReciverLastName}</span>
            <span className="text-[#888888]">{feedback.createdAt}</span>
          </div>
          <div className="relative ">{ feedback.userReciverID===client.id &&   <button
              onClick={() => setShowMenu(!showMenu)}
              className="z-30 hover:bg-black/45 cursor-pointer w-[30px]  rounded-[24px] flex items-center justify-center p-2  "
            >
              <img src="Vector.svg" />
            </button>}
          
            {/*menu */}
            {showMenu && (
              <div className=" z-10 absolute top-8  right-3 bg-[#17181D] motion-preset-expand motion-duration-200 border border-[#393D46] flex flex-col gap-[8px] w-[72px]  p-[10px] items-start justify-center rounded-[5px]">
                <div
                  onClick={() =>{
                    setupdate(!update)
                  }}
                  className="flex cursor-pointer hover:opacity-80 transition-all gap-[4px] items-center "
                >
                  <img src="Edit.svg" alt="" />
                  <span className="text-[12px]">Edit</span>
                </div>
                <div
                  onClick={() =>{DeleteFeedBack(versionId)}}
                  className="flex cursor-pointer hover:opacity-80 transition-all gap-[3px] items-center "
                >
                  <img src="delete.svg" alt="" />
                  <span className="text-[#AA3A39] text-[12px]">Delete</span>
                </div>
              </div>
            )}
          </div>
        </div>
        {update && (
                  <div className="fixed inset-0 z-50 bg-black/60">
                    <div className="absolute top-1/2 left-[-400px] -translate-x-1/2 -translate-y-1/2 
                                    bg-[#17181D] border border-[#393D46] rounded-[12px] p-6 shadow-lg">
                      <UpdateFeedBack  
                        versionId={versionId}
                        setShowFeedback={setupdate} // modal visibility
                        setButtonColor={setButtonColor} // keep button color logic
                        buttonColor={buttonColor||"bg-[#F4CD57]"} />
                    </div>
                  </div>
                )}

        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
           <img src={StatusIcon[feedback.feedbackType]} alt="icon" />
            <span className={`${StatusColor[feedback.feedbackType]}`}>
              {feedback.status}
            </span>
          </div>

          <p className="text-[#888888]">{feedback.feedbackNote}</p>
        </div>
      </div>
    </div>
  );
}
