import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import type { Data } from "../FeedBacks";
import { feedBackSchema, type feedBackForm } from "../../../../../utils/utils";
import TextHover from "@/components/ui/TextHover";
import { setFeedback, updateFeedback } from "@/api/TaskMaterial";
import { collabor,client } from "@/Usr";
import toast from "react-hot-toast";
interface Props {
  setButtonColor: (value: string) => void;
  setShowFeedback: (value: boolean) => void;

  buttonColor: string;
   taskmatId:string
}

export default function UpdateFeedBack({
  setButtonColor,
  setShowFeedback,

  buttonColor,
  taskmatId,
}: Props) {
  const [Status, setStatus] = useState<
    "MISSING_DATA" | "REMARK" | "PROCESSED_SUCCESSFULLY"
  >("REMARK");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<feedBackForm>({
    resolver: zodResolver(feedBackSchema),
  });

  const  onsubmit =async (data: feedBackForm) => {
     const payload={
      feedbackType:Status,
      feedbackNote:data.message

     }
    try{
    
    toast.loading("Updating Feedback...",{duration:3000})
       const res=await updateFeedback(collabor.id,taskmatId,payload)
    toast.success("updated with success",{duration:1000})
    setShowFeedback(false)
    console.log(res)







    }catch(err){ console.log(err+" feedback not send")
      toast.error("Check your info",{duration:2000})
}
  };
  return (
    <div className="flex flex-col gap-[23px] motion-preset-expand ">
      <div className="flex gap-[9px]">
        <TextHover hover_text="Remark">
          <div
            onClick={() => {
              setStatus("REMARK");
              setButtonColor("bg-[#F4CD57]");
            }}
            className={`w-[36px] h-[36px] flex items-center justify-center rounded-[7px]    cursor-pointer hover:opacity-80  ${
              Status === "REMARK"
                ? "border bg-[#383524] border-[#F4CD57]"
                : "bg-[#17181D] border-none"
            } `}
          >
            <img src="message-square-information.svg" alt="" className="" />
          </div>
        </TextHover>
        <TextHover hover_text="PROCESSED_SUCCESSFULLY">
          <div
            onClick={() => {
              setStatus("PROCESSED_SUCCESSFULLY");
              setButtonColor("bg-[#23A758]");
            }}
            className={`w-[36px] h-[36px] bg-[#17181D] flex items-center justify-center rounded-[7px] cursor-pointer hover:opacity-80  ${
              Status === "PROCESSED_SUCCESSFULLY"
                ? "border bg-[#203132] border-[#36C973]"
                : "bg-[#17181D] border-none"
            }`}
          >
            <img src="check-contained.svg" alt="" className="" />
          </div>
        </TextHover>
        <TextHover hover_text="Revision Needed">
          <div
            onClick={() => {
              setStatus("MISSING_DATA");
              setButtonColor("bg-[#AA3A39]");
            }}
            className={`w-[36px] h-[36px] bg-[#17181D] flex items-center justify-center rounded-[7px] cursor-pointer hover:opacity-80 
            ${
              Status === "MISSING_DATA"
                ? " border bg-[#2A1A1E] border-[#DC2D28]"
                : "bg-[#17181D]"
            }
            `}
          >
            <img src="x-circle-contained.svg" alt="" className="" />
          </div>
        </TextHover>
      </div>
      <form
        onSubmit={handleSubmit(onsubmit)}
        className=" flex flex-col gap-[15px] p-[19px] w-full border border-[#393D46] rounded-[14px]"
      >
        <div className="flex flex-col gap-1">
          <textarea
            className="w-full bg-[#17181D] p-[12px] outline-none rounded-[12px] h-[108px]"
            placeholder="Add an optional note.."
            {...register("message")}
          />
          {errors.message?.message && (
            <span className="pl-2 text-sm text-red-500">
              {errors.message?.message}
            </span>
          )}
        </div>

        <div className="flex justify-end w-full  gap-[12px]">
          <button
            onClick={() => setShowFeedback(false)}
            className="px-[11px] py-[5px] bg-[#393D46] text-sm rounded-[5px] cursor-pointer transition-all hover:opacity-80"
          >
            Cancel
          </button>
          <button
            className={`font-[500] px-[11px] py-[5px] text-black  text-sm rounded-[5px] cursor-pointer transition-all hover:opacity-80 ${buttonColor}`}
          >
            Update New FeedBack
          </button>
        </div>
      </form>
    </div>
  );
}
