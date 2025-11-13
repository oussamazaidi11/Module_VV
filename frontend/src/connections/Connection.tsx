import { useEffect, useState } from "react";
import { Eye, MessageCircle, PlusCircle, Star } from "lucide-react";

interface Vendor {
  id: number;
  initials: string;
  name: string;
  addedBy: string;
  rating: number;
  skills: string[];
  actions: {
    viewProfile: boolean;
    message: boolean;
    addToVendorPool: boolean;
  };
}

const fakeVendors: Vendor[] = [
  {
    id: 1,
    initials: "PP",
    name: "Pixel Perfect Studios",
    addedBy: "Alex Durand",
    rating: 5,
    skills: ["Compositing", "3D Modeling", "Animation", "VFX Supervision"],
    actions: { viewProfile: true, message: true, addToVendorPool: true },
  },
  {
    id: 2,
    initials: "VM",
    name: "VFX Masters Co.",
    addedBy: "Alex Durand",
    rating: 4,
    skills: ["VFX Supervision", "Rotoscoping", "Animation"],
    actions: { viewProfile: true, message: true, addToVendorPool: true },
  },
  {
    id: 3,
    initials: "CA",
    name: "Creative Animation Hub",
    addedBy: "Chloé Petit",
    rating: 4.5,
    skills: ["Character Animation", "Ringing", "Animation"],
    actions: { viewProfile: true, message: true, addToVendorPool: true },
  },
];

export default function Connection() {
  const [vendors, setVendors] = useState<Vendor[]>([]);

  useEffect(() => {
    // Simulate fake data fetching
    const timer = setTimeout(() => {
      setVendors(fakeVendors);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="main-container flex w-[1300px] flex-col gap-[16px] items-start flex-nowrap relative mx-auto my-0">
      {vendors.length === 0 ? (
        <div className="text-white p-6 text-center">Loading vendors...</div>
      ) : (
        vendors.map((vendor) => (
          <div
            key={vendor.id}
            className="flex pt-[24px] pr-[16px] pb-[24px] pl-[30px] justify-between items-start self-stretch shrink-0 flex-nowrap bg-[#21242c] rounded-[12px] border border-[#727378] relative"
          >
            <div className="flex w-[600px] gap-[20px] items-start shrink-0 flex-nowrap relative">
              <div className="flex w-[63px] pt-[12px] pr-[12px] pb-[12px] pl-[12px] gap-[10px] justify-center items-center shrink-0 flex-nowrap bg-[#d9d9d9] rounded-[30px] relative z-10">
                <span className="h-[36px] shrink-0 basis-auto font-['Inter'] text-[30px] font-medium leading-[36px] text-[#9a9a9a] relative text-left whitespace-nowrap">
                  {vendor.initials}
                </span>
              </div>

              <div className="flex w-[516px] flex-col gap-[16px] items-start shrink-0 flex-nowrap relative">
                <div className="flex w-[508px] items-start shrink-0 flex-nowrap relative">
                  <div className="flex w-[309px] flex-col items-start shrink-0 flex-nowrap relative">
                    <span className="h-[29px] self-stretch shrink-0 basis-auto font-['Inter'] text-[24px] font-medium leading-[29px] text-[#fff] relative text-left whitespace-nowrap">
                      {vendor.name}
                    </span>
                    <span className="h-[19px] self-stretch shrink-0 basis-auto font-['Roboto'] text-[16px] font-normal leading-[18.75px] text-[#9da392] relative text-left whitespace-nowrap">
                      Added by {vendor.addedBy}
                    </span>
                  </div>
                  <div className="flex w-[199px] flex-col gap-[10px] items-start shrink-0 flex-nowrap relative">
                    <div className="flex gap-[16px] items-center self-stretch shrink-0 flex-nowrap relative">
                      <div className="flex w-[128px] gap-[2px] justify-center items-center shrink-0 flex-nowrap relative">
                        {Array(5).fill(null).map((_, i) => (
  <Star
    key={i}
    className={`w-6 h-6 ${
      i < Math.floor(vendor.rating)
        ? "text-[#F4CD57] fill-current"
        : "text-[#FFFFFF]"
    }`}
  />
))}
                      </div>
                      <span className="flex w-[47px] h-[23px] justify-start items-start shrink-0 basis-auto font-['Roboto'] text-[20px] font-normal leading-[23px] text-[#fff] relative text-left whitespace-nowrap">
                        ({vendor.rating.toFixed(1)})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex w-[516px] flex-col gap-[24px] items-start shrink-0 flex-nowrap relative">
                  <div className="flex w-[474px] gap-[16px] justify-start items-center shrink-0 flex-nowrap relative">
                    {vendor.skills.map((skill, idx) => (
                      <div
                        key={idx}
                        className={`flex pt-[8px] pr-[12px] pb-[8px] pl-[12px] gap-[10px] justify-center items-center shrink-0 flex-nowrap rounded-[36px] border ${
                          idx % 2 === 0
                            ? "bg-[#275240] border-[#36c973]"
                            : "bg-[#5c5338] border-[#f4cd57]"
                        }`}
                      >
                        <span className="h-[16px] shrink-0 basis-auto font-['Roboto'] text-[14px] font-semibold leading-[16px] text-[#fff] relative text-left whitespace-nowrap">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex w-[503px] gap-[16px] items-center shrink-0 flex-nowrap relative">
                    {vendor.actions.viewProfile && (
                      <button className="cursor-pointer flex w-[155px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#5473c1] rounded-[8px] relative text-white font-['Roboto'] font-medium text-[16px] leading-[18.75px]">
                        <Eye className="w-5 h-5" />
                        View Profile
                      </button>
                    )}
                    {vendor.actions.message && (
                      <button className="cursor-pointer flex w-[126px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#17181d] rounded-[8px] border border-[#868282] relative text-white font-['Roboto'] font-medium text-[16px] leading-[18.75px]">
                        <MessageCircle className="w-5 h-5" />
                        Message
                      </button>
                    )}
                    {vendor.actions.addToVendorPool && (
                      <button className="cursor-pointer flex w-[220px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[rgba(246,246,246,0.08)] rounded-[8px] relative text-white font-['Roboto'] font-medium text-[16px] leading-[18.75px]">
                        <PlusCircle className="w-5 h-5" />
                        Add to Vendor Pool
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
