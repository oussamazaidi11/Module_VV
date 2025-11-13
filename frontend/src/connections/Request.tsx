import { Check, Trash2 } from "lucide-react";

const placeholderImage =
  "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";

const fakeRequests = [
  {
    id: 1,
    initials: "DD",
    name: "Digital Dreamscapes",
    message: "Wants to add you to their vendor pool",
    image:
      "https://cdn.twocontinents.com/cdn-cgi/image/width=1920/https://cdn.twocontinents.com/top_rides_at_img_worlds_of_adventure_spiderman_4_145192c8a4.jpg",
  },
  {
    id: 2,
    initials: "QE",
    name: "Quantum Effects",
    message: "Wants to add you to their vendor pool",
    image:
      "",
  },
  {
    id: 3,
    initials: "IW",
    name: "Illusion Works",
    message: "Wants to add you to their vendor pool",
    image: "", 
  },
];

export default function Request() {
  return (
    <div className="flex flex-col gap-[48px] items-start self-stretch shrink-0 flex-nowrap relative z-[16]">
      <div className="flex pt-[50px] pr-[30px] pb-[50px] pl-[30px] flex-col gap-[48px] items-start self-stretch shrink-0 flex-nowrap bg-[#21242b] rounded-[12px] border-solid border border-[#434956] relative z-[17]">
        
        {/* Header */}
        <div className="flex flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[18]">
          <div className="flex gap-[1006px] items-center self-stretch shrink-0 flex-nowrap relative z-[19]">
            <span className="h-[34px] shrink-0 basis-auto font-['Inter'] text-[28px] font-semibold leading-[33.886px] text-[#fff]">
              Connection Requests
            </span>
          </div>
          <div className="flex w-[425px] flex-col gap-[10px] items-center shrink-0 flex-nowrap relative z-[21]">
            <span className="flex w-[425px] h-[19px] justify-start items-start font-['Roboto'] text-[16px] text-[#888888]">
              Studios that want to connect with you
            </span>
          </div>
        </div>

        {/* Request List */}
        <div className="flex flex-col gap-[48px] items-start self-stretch shrink-0 flex-nowrap relative z-[23]">
          {fakeRequests.map((req) => (
            <div key={req.id} className="flex flex-col gap-[32px] items-start self-stretch">
              <div className="flex p-[20px] justify-between items-center self-stretch bg-[#21252b] rounded-[12px] border border-[#434956]">
                
                {/* Left side */}
                <div className="flex w-[339px] gap-[15px] items-center">
                  <div className="w-[59px] h-[59px] relative">
                    <div
                      className="w-[59px] h-[59px] bg-cover bg-no-repeat rounded-full absolute top-0 left-0"
                      style={{
                        backgroundImage: `url(${
                          req.image && req.image.trim() !== ""
                            ? req.image
                            : placeholderImage
                        })`,
                      }}
                    />
                  </div>
                  <div className="flex w-[265px] flex-col gap-[9px] justify-center">
                    <span className="text-[18px] font-medium text-[#fff] font-['Roboto'] " >
                      {req.name}
                    </span>
                    <span className="text-[16px] text-[#888888] font-['Roboto']">
                      {req.message}
                    </span>
                  </div>
                </div>

                {/* Right side */}
                <div className="flex w-[160px] gap-[16px] justify-end items-center">
                  <div className="flex w-[120px] p-[8px_16px] gap-[8px] justify-center items-center bg-[#17181d] rounded-[8px] border border-[#868282] cursor-pointer">
                    <span className="text-[16px] font-medium text-[#f6f6f6] font-['Roboto']">
                      Approve
                    </span>
                    <Check className="text-[#FFFFFF]"/>
                  </div>
                  <div className="w-[24px] h-[24px] cursor-pointer">
                    <Trash2 className="w-5 h-5 text-[#AA3A39]" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
