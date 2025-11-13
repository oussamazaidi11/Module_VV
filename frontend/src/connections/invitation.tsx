import React from "react";
import { Clock, AlertTriangle } from "lucide-react";


type Invitation = {
  company: string;
  status: "pending" | "expired";
  date: string;
};

const invitations: Invitation[] = [
  { company: "Mohamed Ghoul", status: "pending", date: "July 27, 2025" },
  { company: "Digital Dreamscapes", status: "pending", date: "July 1, 2024" },
  { company: "Digital Dreamscapes", status: "pending", date: "July 1, 2024" },
  { company: "Digital Dreamscapes", status: "expired", date: "July 1, 2024" },
];

export default function Invitations() {
  const getStatusDetails = (status: Invitation["status"]) => {
    switch (status) {
      case "pending":
        return {
          icon: (
            <Clock className="w-[24px] h-[24px] shrink-0 text-[#c8ba8d]" />
          ),
          bgColor: "bg-[#383524]",
          borderColor: "border-[#f4cd57]",
          textColor: "text-[#c8ba8d]",
          label: "Pending",
        };
      case "expired":
        return {
          icon: (
            <AlertTriangle className="w-[24px] h-[24px] shrink-0 text-[#ff6464]" />
          ),
          bgColor: "bg-[#352331]",
          borderColor: "border-[#ff6464]",
          textColor: "text-[#ff6464]",
          label: "Expired",
        };
      default:
        return {
          icon: null,
          bgColor: "",
          borderColor: "",
          textColor: "",
          label: "",
        };
    }
  };

  return (
    <div className="flex pt-[50px] pr-[30px] pb-[50px] pl-[30px] flex-col gap-[48px] items-start self-stretch shrink-0 flex-nowrap bg-[#21242b] rounded-[12px] border-solid border border-[#434956] relative z-[17]">
      <div className="flex gap-[58px] items-start self-stretch shrink-0 flex-nowrap relative">
        <div className="flex w-[415px] flex-col gap-[8px] items-start shrink-0 flex-nowrap relative z-[1]">
          <span className="h-[34px] shrink-0 basis-auto font-['Inter'] text-[28px] font-semibold leading-[33.886px] text-[#fff] relative text-left whitespace-nowrap z-[2]">
            Sent Invitations
          </span>
          <span className="h-[19px] shrink-0 basis-auto font-['Roboto'] text-[16px] font-normal leading-[18.75px] text-[#888888] relative text-left whitespace-nowrap z-[3]">
            Track the status of the connection requests you have sent.
          </span>
        </div>
      </div>
      <div className="flex pt-[32px] pr-[32px] pb-[32px] pl-[32px] flex-col gap-[48px] items-center self-stretch shrink-0 flex-nowrap bg-[#21242b] rounded-[16px] border-solid border border-[#35383f] relative z-[4]">
        <div className="flex w-[1172px] h-[45px] justify-between items-center shrink-0 flex-nowrap border-b border-[#434956]">
          <span className="flex w-[568px] h-[19px] justify-start items-start shrink-0 basis-auto font-['Roboto'] text-[16px] font-medium leading-[18.75px] text-[#888888] relative text-left whitespace-nowrap z-[6]">
            Company name
          </span>
          <div className="flex pt-0 pr-[36px] pb-0 pl-0 justify-between items-center grow shrink-0 basis-0 flex-nowrap relative z-[7]">
            <span className="flex w-[47px] h-[19px] justify-center items-start shrink-0 basis-auto font-['Roboto'] text-[16px] font-medium leading-[18.75px] text-[#888888] relative text-center whitespace-nowrap z-[8]">
              Status
            </span>
            <span className="flex w-[69px] h-[19px] justify-center items-start shrink-0 basis-auto font-['Roboto'] text-[16px] font-medium leading-[18.75px] text-[#888888] relative text-center whitespace-nowrap z-[9]">
              Date sent
            </span>
          </div>
        </div>
        <div className="flex w-[1172px] flex-col gap-[32px] items-start shrink-0 flex-nowrap relative z-10">
          {invitations.map(({ company, status, date }, idx) => {
            const { icon, bgColor, borderColor, textColor, label } =
              getStatusDetails(status);
            return (
              <div
                key={idx}
                className="flex justify-between items-center self-stretch shrink-0 flex-nowrap relative"
              >
                <span className="flex w-[167px] h-[21px] justify-startr items-start shrink-0 basis-auto font-['Roboto'] text-[18px] font-medium leading-[21px] text-[#fff] relative text-center whitespace-nowrap z-[12]">
                  {company}
                </span>
                <div className="flex w-[604px] pt-0 pr-[24px] pb-0 pl-0 justify-between items-center shrink-0 flex-nowrap relative z-[13]">
                  <div
                    className={`${bgColor} ${borderColor} flex w-auto pt-[8px] pr-[12px] pb-[8px] pl-[12px] gap-[8px] items-center shrink-0 flex-nowrap rounded-[36px] border-solid border relative z-[14]`}
                  >
                    {icon}
                    <span
                      className={`${textColor} h-[16px] shrink-0 basis-auto font-['Roboto'] text-[14px] font-semibold leading-[16px] relative text-left whitespace-nowrap z-[16]`}
                    >
                      {label}
                    </span>
                  </div>
                  <span className="flex w-[83px] h-[19px] justify-center items-start shrink-0 basis-auto font-['Roboto'] text-[16px] font-normal leading-[18.75px] text-[#888888] relative text-center whitespace-nowrap z-[17]">
                    {date}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
