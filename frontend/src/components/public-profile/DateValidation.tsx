import CustomCalendar from "./CustomCalendar";

interface Props {
  service_name: string;
  desc?: string;
  status: "Available" | "Limited" | "Unavailable";
  AVDates: string[];
  LIMDates: string[];
  UNAVDates: string[];
  ShowCalender: (value: boolean) => void;
}

export default function DateValidation({
  service_name,
  desc,
  status,
  AVDates,
  LIMDates,
  UNAVDates,
  ShowCalender,
}: Props) {
  const StatusColor = {
    Available:
      "cursor-pointer hover:opacity-80 transition-all capitalize font-[600] text-[14px]  whitespace-nowrap  h-fit rounded-[36px] border-[1px] px-[12px] py-[8px] bg-[#203132] text-[#36C973]  border-[#36C973]",
    Limited:
      "cursor-pointer hover:opacity-80 transition-all capitalize font-[600] text-[14px]  whitespace-nowrap  h-fit rounded-[36px] border-[1px] px-[12px] py-[8px] bg-[#383524] text-[#F4CD57]  border-[#F4CD57]",
    Unavailable:
      "cursor-pointer hover:opacity-80 transition-all capitalize font-[600] text-[14px]  whitespace-nowrap  h-fit rounded-[36px] border-[1px] px-[12px] py-[8px] bg-[#352331] text-[#FF6464]  border-[#FF6464]",
  };

  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-screen">
      {/*a div to close the calender */}
      <div
        onClick={() => ShowCalender(false)}
        className="absolute w-full h-screen bg-black/50 -z-10"
      />
      <div className="bg-[#2C303B] py-[24px] border border-[#7A7E89] rounded-[24px]">
        <div className="flex flex-col gap-[10px] pb-[10px]  px-[12px]">
          <span className={`${StatusColor[status]} w-fit`}>{service_name}</span>
          <span className="text-[14px] font-[400">{desc}</span>
        </div>

        <div className="py-[22px] border-b border-t  border-[#7A7E89]">
          <CustomCalendar
            availableDates={AVDates}
            unlimitedDates={LIMDates}
            unavailableDates={UNAVDates}
          />
        </div>
        <div className=" p-[12px] flex flex-col gap-[16px]">
          <span>LEGEND</span>
          <div className="flex items-center gap-[10px]">
            <span className=" inline-block rounded-full w-[14px] h-[14px] bg-[#24C55D]"></span>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-[10px]">
            <span className=" inline-block rounded-full w-[14px] h-[14px] bg-[#E3B502]"></span>
            <span className="text-sm">Limited</span>
          </div>
          <div className="flex items-center gap-[10px]">
            <span className=" inline-block rounded-full w-[14px] h-[14px] bg-[#F34741]"></span>
            <span className="text-sm">Unavailable</span>
          </div>
        </div>
      </div>
    </div>
  );
}
