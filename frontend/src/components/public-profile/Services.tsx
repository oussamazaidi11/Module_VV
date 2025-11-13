import { useState } from "react";
import type { Service } from "../../types";
import DateValidation from "./DateValidation";

interface Props {
  services: Service[];
}

export default function Services({ services }: Props) {
  const StatusColor = {
    Available:
      "cursor-pointer hover:opacity-80 transition-all capitalize font-[600] text-[14px]  whitespace-nowrap  h-fit rounded-[36px] border-[1px] px-[12px] py-[8px] bg-[#203132] text-[#36C973]  border-[#36C973]",
    Limited:
      "cursor-pointer hover:opacity-80 transition-all capitalize font-[600] text-[14px]  whitespace-nowrap  h-fit rounded-[36px] border-[1px] px-[12px] py-[8px] bg-[#383524] text-[#F4CD57]  border-[#F4CD57]",
    Unavailable:
      "cursor-pointer hover:opacity-80 transition-all capitalize font-[600] text-[14px]  whitespace-nowrap  h-fit rounded-[36px] border-[1px] px-[12px] py-[8px] bg-[#352331] text-[#FF6464]  border-[#FF6464]",
  };

  const [SelectedService, setSelectedServ] = useState<string>("");
  const [SelectedStatus, setSelectedStatus] = useState<
    "Available" | "Limited" | "Unavailable"
  >("Available");

  const [SelectedSerDesc, setSelectedServDesc] = useState<string>("");
  const [SelectedAvailableDates, setSelectedAVDates] = useState<string[]>([]);
  const [SelecteLimettedDates, setSelectedLIMDates] = useState<string[]>([]);
  const [SelectedUNavailableDates, setSelectedUNDates] = useState<string[]>([]);
  const [showCalender, setShowCalender] = useState(false);

  return (
    <div className="flex flex-col pb-[20px] gap-[32px]">
      <div className="flex gap-[16px] items-center ">
        <img src="Clipboard-list.svg" alt="service-icon" />
        <h1 className="text-[24px] font-[700]  whitespace-nowrap">
          Services & Availability
        </h1>
      </div>
      <div className=" space-y-[16px]">
        {services.map((service) => (
          <div key={service.id} className="space-y-[16px]">
            <p className="font-[600] text-[18px]">{service.type}</p>
            <div className="flex gap-[10px] flex-wrap">
              {service.services.map((serv) => (
                <div
                  onClick={() => {
                    setSelectedServ(serv.name);
                    setSelectedStatus(serv.status);
                    setSelectedAVDates(serv.availbal_dates);
                    setSelectedServDesc(serv.desc as string);
                    setSelectedLIMDates(serv.Limited_dates);
                    setSelectedUNDates(serv.Unavailable_dates);
                    setShowCalender(true);
                  }}
                  key={serv.id}
                  className={`${StatusColor[serv.status]}`}
                >
                  {serv.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-[9px] items-center">
        <img src="SmallInfo.svg" alt="info-icon" />
        <span className="text-[12px] font-[400] text-[#888888]">
          View availability by selecting a service
        </span>
      </div>

      {showCalender && (
        <DateValidation
          service_name={SelectedService}
          status={SelectedStatus}
          desc={SelectedSerDesc}
          AVDates={SelectedAvailableDates}
          UNAVDates={SelectedUNavailableDates}
          LIMDates={SelecteLimettedDates}
          ShowCalender={setShowCalender}
        />
      )}
    </div>
  );
}
