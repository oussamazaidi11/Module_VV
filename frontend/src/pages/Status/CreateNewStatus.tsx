import { useState } from "react";
import {X} from "lucide-react";
interface CreateNewStatusProps {
  onClose: () => void;
  onCreate: (newStatus: { name: string; color: string; correspondsTo: string }) => void;
}

export default function CreateNewStatus({ onClose, onCreate }: CreateNewStatusProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#CACACA");
  const [correspondsTo, setCorrespondsTo] = useState("");

  const handleCreate = () => {
    if (!name || !correspondsTo) return; 
    onCreate({ name, color, correspondsTo });
  };

  return (
    <div className=" flex w-[571px] pt-[32px] pr-[32px] pb-[32px] pl-[32px] flex-col gap-[24px] justify-center items-end flex-nowrap bg-[#21242B] rounded-[18px] z-[100]">
      {/* Close Icon */}
      <div
        onClick={onClose}
        className="w-[24px] h-[24px] cursor-pointer  bg-cover bg-no-repeat relative overflow-hidden"
      ><X className="text-[#FFFFFF]"/></div>

      <div className="flex flex-col gap-[42px] items-start self-stretch shrink-0 flex-nowrap relative">
        <div className="flex w-[321px] flex-col gap-[8px] items-start shrink-0 flex-nowrap relative">
          <span className="h-[34px] self-stretch shrink-0 basis-auto font-['Inter'] text-[28px] font-semibold leading-[33.886px] text-[#fff] relative text-left whitespace-nowrap">
            Create New Status
          </span>
          <span className="h-[16px] self-stretch shrink-0 basis-auto font-['Roboto'] text-[14px] font-normal leading-[16px] text-[#888888] relative text-left whitespace-nowrap">
            Define a new status for your project workflows.
          </span>
        </div>

        <div className="flex flex-col gap-[56px] items-end self-stretch shrink-0 flex-nowrap relative">
          <div className="flex w-[507px] flex-col gap-[32px] items-start shrink-0 flex-nowrap relative">
            {/* Status Name Input */}
            <div className="flex h-[89px] flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative">
              <label className="h-[21px] shrink-0 basis-auto font-['Roboto'] text-[18px] font-medium leading-[21px] text-[#fff] relative text-left whitespace-nowrap">
                Status Name
              </label>
              <input
                type="text"
                placeholder="e.g., Awaiting Feedback"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex w-[507px] h-[60px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] bg-[#17181d] rounded-[8px] text-white font-['Roboto'] text-[16px] font-medium leading-[18.75px] outline-none"
              />
            </div>

            {/* Color Picker */}
            <div className="flex h-[89px] flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative">
              <label className="h-[21px] shrink-0 basis-auto font-['Roboto'] text-[18px] font-medium leading-[21px] text-[#fff] relative text-left whitespace-nowrap">
                Color
              </label>
              <div className="flex w-[183px] gap-[8px] justify-end items-center shrink-0 flex-nowrap relative">
                <div className="flex w-[136px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] gap-[8px] items-center shrink-0 flex-nowrap bg-[#17181d] rounded-[8px] relative">
                  <div className="w-[23px] h-[23px] shrink-0 rounded-[4px]" style={{ backgroundColor: color }} />
                  <span className="flex w-[73px] h-[19px] justify-center items-start shrink-0 basis-auto font-['Roboto'] text-[16px] font-medium leading-[18.75px] text-[#fff] relative text-center whitespace-nowrap">
                    {color}
                  </span>
                </div>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-[39px] h-[39px] shrink-0 rounded-[4px] border border-[#575454] cursor-pointer"
                />
              </div>
            </div>

            {/* Corresponds To Select */}
            <div className="flex h-[89px] flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative">
              <label className="h-[21px] shrink-0 basis-auto font-['Roboto'] text-[18px] font-medium leading-[21px] text-[#fff] relative text-left whitespace-nowrap">
                Corresponds To
              </label>
              <select
                value={correspondsTo}
                onChange={(e) => setCorrespondsTo(e.target.value)}
                className="flex w-[507px] h-[60px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] bg-[#17181d] rounded-[8px] text-white font-['Roboto'] text-[16px] font-medium leading-[18.75px] outline-none"
              >
                <option value="">Select a core status</option>
                <option value="Not started">Not started</option>
                <option value="In progress">In progress</option>
                <option value="Done">Done</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex w-[261px] gap-[32px] items-center shrink-0 flex-nowrap relative">
            <button
  onClick={onClose}
  className="border-none rounded-[6px] px-[20px] py-[10px] cursor-pointer text-[0.9rem] bg-transparent text-[#aaa]"
>
  Cancel
</button>

<button
  disabled={!name || !correspondsTo}
  className={`rounded-[6px] px-[20px] py-[10px] text-[0.9rem] font-medium leading-[18.75px] ${
    !name || !correspondsTo
      ? "bg-[#444] text-[#f6f6f6] cursor-not-allowed "
      : "bg-[#5473c1] text-white cursor-pointer"
  }`}
>
  Create Status
</button>


          </div>
        </div>
      </div>
    </div>
  );
}
