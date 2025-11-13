import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TaskSchema, type taskForm } from "../../../../utils/utils";
import SendPac from "./forms/SendPac";
import SendRes from "./forms/SendRes";
import { useShowSendTaskStore } from "@/store/tasks/store";
import { createTaskMaterial } from "@/api/TaskMaterial";
type forms = "send" | "pac" | "res" | string;
const Descriptions = {
  send: "Enter a name for your material, then select the type you want to send",
  res: "Upload local files a resources for this version",
  pac: "Send a link to a package delierable",
};
type DescriptionType = keyof typeof Descriptions;
  
export default function SendTasks() {
  /**
   * 'send' stand for the first page where you can choose the type of task
   * 'pac' stand for the form that send data directly from the machine
   * 'res' stand for the form that send data by a link
   * @default 'send'' the first one that should appear to he user
   */
  const [forms, setForms] = useState<forms>("send");
  const [data, setData] = useState<string>("");
  const { close } = useShowSendTaskStore();

  //Handle Submit
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<taskForm>({ resolver: zodResolver(TaskSchema) });
  const onsubmit = async(data: taskForm, e?: React.BaseSyntheticEvent) => {
    if (!e) return;
    const SubmitedButton = (e.nativeEvent as SubmitEvent).submitter;
    const ButtonName = (SubmitedButton as HTMLButtonElement).name;
    setForms(ButtonName);
    setData(data.taskname);
   
    
    
  };

  return (
    <div
      className={`${
        forms !== "pac" && "items-center"
      }    fixed  top-0 left-0 flex justify-center w-full h-screen sm:p-10 p-5 overflow-auto bg-black/30 backdrop-blur-sm z-40`}
    >
      <div
        className={` bg-[#21242B] p-[32px] rounded-lg  ${
          forms !== "pac" && "sm:w-[571px] "
        }   sm:w-fit h-fit  overflow-auto  motion-preset-expand w-full
        `}
      >
        {/* <Header>*/}
        <div className="flex items-center mb-[24px] ">
          <button
            onClick={() => (forms === "send" ? close() : setForms("send"))}
            className=" cursor-pointer hover:opacity-75 mr-4 text-white rounded-[8px] px-3 py-2 text-sm bg-[#32353b] transition-all"
          >
            ← Back
          </button>
          <button
            onClick={close}
            className="w-10 h-10 ml-auto text-white transition-all cursor-pointer rounded-3xl hover:opacity-75 hover:bg-gray-600"
          >
            ✕
          </button>
        </div>

        <h1 className="mb-[8px] text-xl font-semibold text-white">
          Send Task Material
        </h1>
        <p className="mb-[42px] text-[#888888] font-[400] text-[14px]">
          {Descriptions[forms as DescriptionType]}
        </p>

        {/*<Childrens> */}
        {forms === "send" && (
          <form
            onSubmit={handleSubmit(onsubmit)}
            className="flex flex-col gap-[32px]"
          >
            <div className="flex flex-col gap-[8px]">
              <p>Task Material Name</p>
              <input
                type="text"
                className="px-[16px] py-[12px] bg-[#17181D] w-full rounded-[8px] placeholder:text-[#8b8b8e] outline-none text-sm"
                placeholder="e.g V001 Plates"
                {...register("taskname")}
              />
              {errors.taskname?.message && (
                <span className="pl-2 text-sm text-red-500">
                  {errors.taskname.message}
                </span>
              )}
            </div>
            <div className="flex gap-[32px]">
              <button
                className=" flex-1 cursor-pointer hover:opacity-80 transition-all hover:scale-105  px-[16px] py-[12px] bg-[#17181D] flex items-center flex-col gap-[16px] justify-center rounded-[8px]"
                type="submit"
                name="res"
              >
                <img src="Hard-drive.svg" alt="" />
                <div className="flex flex-col gap-[8px]">
                  <span>Resources</span>
                  <span className="text-sm text-[#8b8b8e]">
                    Upload files directly from <br /> your machine
                  </span>
                </div>
              </button>
              <button
                className=" flex-1 cursor-pointer hover:opacity-80 transition-all hover:scale-105 px-[16px] py-[12px] bg-[#17181D] flex items-center flex-col gap-[16px] justify-center rounded-[8px]"
                type="submit"
                name="pac"
              >
                <img src="Package.svg" alt="" />

                <div className="flex flex-col gap-[8px]">
                  <span>Data Package</span>
                  <span className="text-sm text-[#8b8b8e]">
                    Send a link to packaged <br /> deliverable
                  </span>
                </div>
              </button>
            </div>
          </form>
        )}
        {forms === "pac" && <SendPac taskName={data} />}
        {forms === "res" && <SendRes taskName={data} />}
        {/*</Childrens>*/}
      </div>
    </div>
  );
}
