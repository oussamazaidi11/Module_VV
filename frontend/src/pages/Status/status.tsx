import { PlusCircle } from "lucide-react";
import  { useState } from "react";
import CreateNewStatus from "./CreateNewStatus";

const statusesData = [
  { id: 1, color: "#CACACA", name: "Not started", correspondsTo: "Not started" },
  { id: 2, color: "#3498DB", name: "In progress", correspondsTo: "In progress" },
  { id: 3, color: "#CC99FF", name: "WIP", correspondsTo: "Not started" },
  { id: 4, color: "#F1C40F", name: "Pending review", correspondsTo: "In progress" },
  { id: 5, color: "#1CBC90", name: "Approved", correspondsTo: "Done" },
  { id: 6, color: "#E74C3C", name: "On hold", correspondsTo: "Blocked" },
];


interface Status {
  id: number;
  name: string;
  color: string;
  correspondsTo: string;
}

export default function StatusMan() {
  const [showModal, setShowModal] = useState(false);
  const [statuses, setStatuses] = useState<Status[]>(statusesData);


  const handleCreateStatus = (newStatus: { name: string; color: string; correspondsTo: string }) => {
    fetch("http://localhost:3000/api/statuses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStatus),
    })
      .then((res) => res.json())
      .then((createdStatus) => {
        setStatuses((prev) => [...prev, createdStatus]);
        setShowModal(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="main-container w-[1440px] h-[1024px] bg-[#17181d] relative overflow-hidden mx-auto my-0">
      <div className="flex w-[1300px] flex-col gap-[56px] items-start flex-nowrap relative mt-0 mr-0 mb-0 ml-[70px]">
        <div className="flex flex-col gap-[48px] items-start self-stretch shrink-0 flex-nowrap relative z-[1]">
          <div className="flex justify-between items-center self-stretch shrink-0 flex-nowrap relative z-[31]">
            <div className="flex w-[351px] flex-col gap-[8px] items-start shrink-0 flex-nowrap relative z-[32]">
              <span className="h-[44px] shrink-0 basis-auto font-['Inter'] text-[36px] font-semibold leading-[43.568px] text-[#fff] relative text-left whitespace-nowrap z-[33]">
                Status Management
              </span>
              <span className="h-[16px] shrink-0 basis-auto font-['Roboto'] text-[14px] font-normal leading-[16px] text-[#888888] relative text-left whitespace-nowrap z-[34]">
                Create, edit and reorder status for your projects
              </span>
            </div>
            <button onClick={() => setShowModal(true)} className=" border-none cursor-pointer flex w-[180px] pt-[12px] pr-[24px] pb-[12px] pl-[24px] gap-[12px] justify-center items-center shrink-0 flex-nowrap bg-[#5473c1] rounded-[12px] relative z-[35]">
              <div className="flex w-[24px] h-[24px] pt-[2px] pr-[2px] pb-[2px] pl-[2px] gap-[10px] justify-center items-center shrink-0 flex-nowrap relative z-[36]">
                <div className="w-[24px] h-[24px] shrink-0  relative overflow-hidden z-[37]" ><PlusCircle /></div>
              </div>
              <div className="h-[23px] shrink-0 basis-auto font-['Roboto'] text-[20px] font-medium leading-[23px] text-[#f6f6f6] relative text-left bg-[#5473C1] border-none whitespace-nowrap z-[38]" >
                 Create
              </div>
            </button>
          </div>
        </div>
        <div className="flex pt-[50px] pr-[30px] pb-[50px] pl-[30px] flex-col gap-[42px] items-start self-stretch shrink-0 flex-nowrap bg-[#21242b] rounded-[16px] relative z-[39]">
          <span className="h-[21px] shrink-0 basis-auto font-['Roboto'] text-[18px] font-semibold leading-[21px] text-[#fff] relative text-left whitespace-nowrap z-40">
            Drag items to re-order list
          </span>
          <div className="flex pt-[24px] pr-[48px] pb-[24px] pl-[48px] justify-between items-center self-stretch shrink-0 flex-nowrap border-b border-[#33363D] relative z-[41]">
            <span className="flex w-[221px] h-[19px] justify-start items-start shrink-0 basis-auto font-['Roboto'] text-[16px] font-medium leading-[18.75px] text-[#fff] relative text-left whitespace-nowrap z-[42]">
              Colour{" "}
            </span>
            <div className="flex w-[534px] justify-between items-center shrink-0 flex-nowrap relative z-[43]">
              <span className="flex w-[43px] h-[19px] justify-center items-start shrink-0 basis-auto font-['Roboto'] text-[16px] font-medium leading-[18.75px] text-[#fff] relative text-center whitespace-nowrap z-[44]">
                Name
              </span>
              <span className="flex w-[110px] h-[19px] justify-center items-start shrink-0 basis-auto font-['Roboto'] text-[16px] font-medium leading-[18.75px] text-[#fff] relative text-center whitespace-nowrap z-[45]">
                Corresponds to
              </span>
            </div>
          </div>
          <div className="flex pt-0 pr-[48px] pb-0 pl-[48px] flex-col gap-[64px] items-start self-stretch shrink-0 flex-nowrap relative z-[46]">
            {statuses.map((status) => (
              <div 
                key={status.id}
                className="flex justify-between items-center self-stretch shrink-0 flex-nowrap relative"
              >
                <div className="flex gap-[12px] items-center shrink-0 flex-nowrap">
                  <span className="flex w-[14px] h-[19px] justify-center items-start shrink-0 basis-auto font-['Roboto'] text-[16px] font-medium leading-[18.75px] text-[#fff] relative text-center whitespace-nowrap">
                    {status.id}:
                  </span>
                  <div className="flex gap-[8px] items-center shrink-0 flex-nowrap">
                    <div 
                      className="w-[23px] h-[23px] shrink-0 rounded-[4px] relative overflow-hidden" 
                      style={{ backgroundColor: status.color }}
                    />
                    <span className="flex h-[19px] justify-center items-start shrink-0 basis-auto font-['Roboto'] text-[16px] font-medium leading-[18.75px] text-[#fff] relative text-center whitespace-nowrap">
                      {status.color}
                    </span>
                  </div>
                </div>
                <div className="flex w-[534px] justify-between items-center shrink-0 flex-nowrap">
                  <span className="flex h-[19px] justify-center items-start shrink-0 basis-auto font-['Roboto'] text-[16px] font-medium leading-[18.75px] text-[#fff] relative text-center whitespace-nowrap">
                    {status.name}
                  </span>
                  <span className="flex w-[110px] h-[19px] justify-start items-start shrink-0 basis-auto font-['Roboto'] text-[16px] font-medium leading-[18.75px] text-[#fff] relative text-left whitespace-nowrap">
                    {status.correspondsTo}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModal && (
  <div
  className="fixed inset-0 top-[50%] left-[50%] w-full h-full backdrop-blur-sm flex items-center justify-center z-[100] "
  style={{ transform: "translate(-50%, -50%)",backgroundColor: "rgba(0, 0, 0, 0.7)" }}
>
  <CreateNewStatus
    onClose={() => setShowModal(false)}
    onCreate={handleCreateStatus}
  />
</div>

)}


    </div>
    
  );
}