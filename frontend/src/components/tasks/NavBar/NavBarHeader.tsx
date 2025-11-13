import type { TaskInfo } from "../../../types";

interface Props {
  taskInfo: TaskInfo;
}

export default function NavBarHeader({ taskInfo }: Props) {
  const StatusColor = {
    "Assigned to":
      "cursor-pointer hover:opacity-80 transition-all capitalize font-[600] text-[14px]  whitespace-nowrap  h-fit rounded-[36px] border-[1px] px-[12px] py-[8px] bg-[#203132] text-[#36C973]  border-[#36C973]",
    Published:
      "cursor-pointer hover:opacity-80 transition-all capitalize font-[600] text-[14px]  whitespace-nowrap  h-fit rounded-[36px] border-[1px] px-[12px] py-[8px] bg-[#2C323E] text-[#2676CF]  border-[#2676CF]",
    "Not Assigned":
      "cursor-pointer hover:opacity-80 transition-all capitalize font-[600] text-[14px]  whitespace-nowrap  h-fit rounded-[36px] border-[1px] px-[12px] py-[8px] bg-[#352331] text-[#FF6464]  border-[#FF6464]",
  };

  return (
    <div className="flex flex-col  gap-[18px]">
      <p className=" font-[700]  text-2xl">{taskInfo.name}</p>
      <div className="flex  gap-[16px] items-center">
        <div className={`${StatusColor[taskInfo.status]} w-fit `}>
          {taskInfo.status}
        </div>
        <span className="text-sm font-[400] text-[#888888]">
          {taskInfo.AssignedTo}
        </span>
      </div>
    </div>
  );
}
