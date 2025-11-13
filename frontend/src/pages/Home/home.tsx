import { useEffect, useState } from "react";
import {
  Search,
  CirclePlus,
  Briefcase,
  Star,
  Users,
  MessageSquare,
  Activity,
  X,
  User,
  ArrowRight,
} from "lucide-react";

interface ActivityItem {
  type: "vendor" | "message" | "project" | "note";
  text: string;
  time: string;
}

interface DashboardData {
  userName: string;
  projectCount: number;
  vendorCount: number;
  requestCount: number;
  unreadMessages: number;
  activities: ActivityItem[];
}

export default function Main() {
  const [data, setData] = useState<DashboardData>({
    userName: "Mohavvved Ghoul",
    projectCount: 0,
    vendorCount: 0,
    requestCount: 0,
    unreadMessages: 0,
    activities: [],
  });

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/dashboard")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: DashboardData) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="main-container w-[1440px] bg-[#17181d] relative overflow-hidden mx-auto my-0">
      <div className="flex w-[1300px] flex-col gap-[48px] items-start flex-nowrap relative mt-0 mr-0 mb-0 ml-[70px]">
        <div className="flex justify-between items-center self-stretch shrink-0 flex-nowrap relative z-30">
          <div className="flex w-[355px] flex-col gap-[8px] items-start shrink-0 flex-nowrap relative z-[31]">
            <span className="h-[44px] shrink-0 basis-auto font-['Inter'] text-[36px] font-semibold leading-[43.568px] text-[#fff] relative text-left whitespace-nowrap z-[32]">
              Home
            </span>
            <span className="flex w-[355px] h-[16px] justify-start items-start shrink-0 basis-auto font-['Roboto'] text-[14px] font-normal leading-[16px] text-[#888888] relative text-left whitespace-nowrap z-[33]">
              Manage projects, find vendors, and track collaborations.
            </span>
          </div>
        </div>
      </div>
      <div className="flex w-[1300px] flex-col gap-[40px] items-start flex-nowrap relative z-[34] mt-[56px] mr-0 mb-0 ml-[70px]">
        <div className="flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[48px] items-start self-stretch shrink-0 flex-nowrap rounded-[12px] relative z-[35] bg-gradient-to-r from-[#5D7CBF] to-[#7BB2D0]">
          <div className="flex flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[36]">
            <span className="flex w-[324px] h-[34px] justify-start items-start shrink-0 basis-auto font-['Inter'] text-[28px] font-semibold leading-[33.886px] text-[#131e2f] relative text-center whitespace-nowrap z-[37]">
              Welcome back, {data.userName}!
            </span>
            <span className="h-[19px] self-stretch shrink-0 basis-auto font-['Roboto'] text-[16px] font-normal leading-[18.75px] text-[#fff] relative text-left whitespace-nowrap z-[38]">
              Ready to bring your next big project to life?
            </span>
          </div>
          <div className="flex w-[346px] gap-[28px] items-center shrink-0 flex-nowrap relative z-[39]">
            <div className="flex w-[163px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#17181d] rounded-[8px] border-solid border border-[#868282] relative z-40">
              <CirclePlus className="text-[#FFFFFF]" />
              <span className="h-[19px] shrink-0 basis-auto font-['Roboto'] text-[16px] font-medium leading-[18.75px] text-[#f6f6f6] relative text-left whitespace-nowrap z-[43]">
                Create Project
              </span>
            </div>
            <div className="flex w-[155px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[rgba(246,246,246,0.08)] rounded-[8px] relative z-[44]">
              <Search className="text-[#FFFFFF]" />
              <span className="h-[19px] shrink-0 basis-auto font-['Roboto'] text-[16px] font-medium leading-[18.75px] text-[#f6f6f6] relative text-left whitespace-nowrap z-[47]">
                Find Vendors
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center self-stretch shrink-0 flex-nowrap relative z-[48]">
          <div className="flex w-[296px] h-[245px] pt-[20px] pr-[20px] pb-[20px] pl-[20px] flex-col justify-between items-start shrink-0 flex-nowrap bg-[#21242b] rounded-[12px] border-solid border border-[#777b83] relative z-[49]">
            <div className="flex flex-col gap-[32px] items-end self-stretch shrink-0 flex-nowrap relative z-50">
              <div className="flex justify-between items-start self-stretch shrink-0 flex-nowrap relative z-[51]">
                <div className="flex flex-col gap-[16px] items-start grow shrink-0 basis-0 flex-nowrap relative z-[52]">
                  <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Roboto'] text-[18px] font-medium leading-[21px] text-[#fff] relative text-left whitespace-nowrap z-[53]">
                    Project Management
                  </span>
                  <span className="h-[16px] shrink-0 basis-auto font-['Roboto'] text-[14px] font-normal leading-[16px] text-[#777b83] relative text-left whitespace-nowrap z-[54]">
                    Project(s) awaiting assignment
                  </span>
                </div>
                <Briefcase className="w-[24px] h-[24px] shrink-0 text-[#FFFFFF] relative z-[55]" />
              </div>
              <span className="h-[58px] self-stretch shrink-0 basis-auto font-['Inter'] text-[48px] font-bold leading-[58px] text-[#fff] relative text-right whitespace-nowrap z-[56]">
                {data.projectCount}
              </span>
            </div>
            <div className="flex w-[139px] pt-[4px] pr-[8px] pb-[4px] pl-[8px] gap-[4px] justify-center items-center shrink-0 flex-nowrap rounded-[4px] relative z-[57]">
              <span className="h-[16px] shrink-0 basis-auto  font-['Roboto'] text-[14px] font-medium leading-[16px] text-[#5473c1] relative text-left whitespace-nowrap z-[58]">
                View all projects
              </span>
              <ArrowRight className="stroke-[#73B4BC]" />
            </div>
          </div>
          <div className="flex w-[296px] h-[245px] pt-[20px] pr-[20px] pb-[20px] pl-[20px] flex-col justify-between items-start shrink-0 flex-nowrap bg-[#21242b] rounded-[12px] border-solid border border-[#777b83] relative z-[61]">
            <div className="flex flex-col gap-[32px] items-end self-stretch shrink-0 flex-nowrap relative z-[62]">
              <div className="flex justify-between items-start self-stretch shrink-0 flex-nowrap relative z-[63]">
                <div className="flex flex-col gap-[16px] items-start grow shrink-0 basis-0 flex-nowrap relative z-[64]">
                  <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Roboto'] text-[18px] font-medium leading-[21px] text-[#fff] relative text-left whitespace-nowrap z-[65]">
                    My Vendor Pool
                  </span>
                  <span className="h-[16px] shrink-0 basis-auto font-['Roboto'] text-[14px] font-normal leading-[16px] text-[#777b83] relative text-left whitespace-nowrap z-[66]">
                    Active collaborations
                  </span>
                </div>
                <Users className="w-[24px] h-[24px] shrink-0 text-[#FFFFFF] relative z-[67]" />
              </div>
              <span className="h-[58px] self-stretch shrink-0 basis-auto font-['Inter'] text-[48px] font-bold leading-[58px] text-[#fff] relative text-right whitespace-nowrap z-[68]">
                {data.vendorCount}
              </span>
            </div>
            <div className="flex w-[141px] pt-[4px] pr-[8px] pb-[4px] pl-[8px] gap-[4px] justify-center items-center shrink-0 flex-nowrap rounded-[4px] relative z-[69]">
              <span className="h-[16px] shrink-0 basis-auto font-['Roboto'] text-[14px] font-medium leading-[16px] text-[#5473c1] relative text-left whitespace-nowrap z-[70]">
                Manage vendors
              </span>
              <ArrowRight className="stroke-[#73B4BC]" />
            </div>
          </div>
          <div className="flex w-[296px] h-[245px] pt-[20px] pr-[20px] pb-[20px] pl-[20px] flex-col justify-between items-start shrink-0 flex-nowrap bg-[#21242b] rounded-[12px] border-solid border border-[#777b83] relative z-[73]">
            <div className="flex flex-col gap-[32px] items-end self-stretch shrink-0 flex-nowrap relative z-[74]">
              <div className="flex justify-between items-start self-stretch shrink-0 flex-nowrap relative z-[75]">
                <div className="flex flex-col gap-[16px] items-start grow shrink-0 basis-0 flex-nowrap relative z-[76]">
                  <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Roboto'] text-[18px] font-medium leading-[21px] text-[#fff] relative text-left whitespace-nowrap z-[77]">
                    Access Requests
                  </span>
                  <span className="h-[16px] shrink-0 basis-auto font-['Roboto'] text-[14px] font-normal leading-[16px] text-[#777b83] relative text-left whitespace-nowrap z-[78]">
                    Pending requests
                  </span>
                </div>
                <Activity className="w-[24px] h-[24px] shrink-0 text-[#FFFFFF] relative z-[79]" />
              </div>
              <span className="h-[58px] self-stretch shrink-0 basis-auto font-['Inter'] text-[48px] font-bold leading-[58px] text-[#fff] relative text-right whitespace-nowrap z-[80]">
                {data.requestCount}
              </span>
            </div>
            <div className="flex w-[125px] pt-[4px] pr-[8px] pb-[4px] pl-[8px] gap-[4px] justify-center items-center shrink-0 flex-nowrap rounded-[4px] relative z-[81]">
              <span className="h-[16px] shrink-0 basis-auto font-['Roboto'] text-[14px] font-medium leading-[16px] text-[#5473c1] relative text-left whitespace-nowrap z-[82]">
                View requests
              </span>
              <ArrowRight className="stroke-[#73B4BC]" />
            </div>
          </div>
          <div className="flex w-[296px] h-[245px] pt-[20px] pr-[20px] pb-[20px] pl-[20px] flex-col gap-[12px] items-start shrink-0 flex-nowrap bg-[#21242b] rounded-[12px] border-solid border border-[#777b83] relative z-[85]">
            <div className="flex flex-col gap-[32px] items-end self-stretch shrink-0 flex-nowrap relative z-[86]">
              <div className="flex justify-between items-start self-stretch shrink-0 flex-nowrap relative z-[87]">
                <div className="flex flex-col gap-[16px] items-start grow shrink-0 basis-0 flex-nowrap relative z-[88]">
                  <span className="h-[21px] self-stretch shrink-0 basis-auto font-['Roboto'] text-[18px] font-medium leading-[21px] text-[#fff] relative text-left whitespace-nowrap z-[89]">
                    Inbox
                  </span>
                  <span className="h-[16px] shrink-0 basis-auto font-['Roboto'] text-[14px] font-normal leading-[16px] text-[#777b83] relative text-left whitespace-nowrap z-[90]">
                    messages waiting
                  </span>
                </div>
                <MessageSquare className="w-[24px] h-[24px] shrink-0 text-[#FFFFFF] relative z-[91]" />
              </div>
              <div className="flex flex-col gap-[8px] items-end self-stretch shrink-0 flex-nowrap relative z-[92]">
                <span className="h-[58px] self-stretch shrink-0 basis-auto font-['Inter'] text-[48px] font-bold leading-[58px] text-[#fff] relative text-right whitespace-nowrap z-[93]">
                  {data.unreadMessages}
                </span>
                {data.unreadMessages != 0 && (
                  <div className="flex w-[55px] pt-[2px] pr-[8px] pb-[2px] pl-[8px] gap-[10px] justify-center items-center shrink-0 flex-nowrap bg-[#dc292c] rounded-[12px] relative z-[94]">
                    <span className="h-[14px] shrink-0 basis-auto font-['Roboto'] text-[12px] font-semibold leading-[14px] text-[#fff] relative text-left whitespace-nowrap z-[95]">
                      Unread
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex w-[137px] pt-[4px] pr-[8px] pb-[4px] pl-[8px] gap-[4px] justify-center items-center shrink-0 flex-nowrap rounded-[4px] relative z-[96]">
              <span className="h-[16px] shrink-0 basis-auto font-['Roboto'] text-[14px] font-medium leading-[16px] text-[#5473c1] relative text-left whitespace-nowrap z-[97]">
                Open messages
              </span>
              <ArrowRight className="stroke-[#73B4BC]" />
            </div>
          </div>
        </div>
        <div className="flex h-[343px] pt-[20px] pr-[20px] pb-[20px] pl-[20px] flex-col gap-[32px] items-start self-stretch shrink-0 flex-nowrap bg-[#21242b] rounded-[12px] border-solid border border-[#777b83] relative z-[100]">
          <div className="flex w-[324px] gap-[14px] items-start shrink-0 flex-nowrap relative z-[101]">
            <Activity className="w-[24px] h-[24px] shrink-0 text-[#FFFFFF] relative z-[102]" />
            <div className="flex w-[286px] flex-col gap-[8px] items-start shrink-0 flex-nowrap relative z-[103]">
              <span className="h-[23px] self-stretch shrink-0 basis-auto font-['Roboto'] text-[20px] font-bold leading-[23px] text-[#fff] relative text-left whitespace-nowrap z-[104]">
                Recent Activity
              </span>
              <span className="h-[16px] shrink-0 basis-auto font-['Roboto'] text-[14px] font-normal leading-[16px] text-[#777b83] relative text-left whitespace-nowrap z-[105]">
                An overview of recent events on your account.
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-[22px] items-start self-stretch shrink-0 flex-nowrap relative z-[106]">
            {data.activities.length === 0 ? (
              <div className="flex gap-[14px] items-center self-stretch shrink-0 flex-nowrap relative z-[107]">
                <X className="w-[24px] h-[24px] shrink-0 text-[#FFFFFF]" />
                <div className="flex w-[314px] flex-col gap-[8px] items-center shrink-0 flex-nowrap relative z-[109]">
                  <span className="h-[16px] self-stretch shrink-0 basis-auto font-['Roboto'] text-[14px] font-normal leading-[16px] text-[#fff] relative text-left whitespace-nowrap z-[110]">
                    No recent activity
                  </span>
                </div>
              </div>
            ) : (
              data.activities.map((activity, index) => (
                <div
                  key={index}
                  className="flex gap-[14px] items-start self-stretch shrink-0 flex-nowrap relative z-[107]"
                >
                  <div className="w-[24px] h-[24px] shrink-0">
                    {activity.type === "vendor" && (
                      <User className="text-[#FFFFFF]" size={24} />
                    )}
                    {activity.type === "message" && (
                      <MessageSquare className="text-[#FFFFFF]" size={24} />
                    )}
                    {activity.type === "project" && (
                      <Star className="text-[#FFFFFF]" size={24} />
                    )}
                    {activity.type === "note" && (
                      <Star className="text-[#FFFFFF]" size={24} />
                    )}
                  </div>
                  <div className="flex w-[314px] flex-col gap-[8px] items-start shrink-0 flex-nowrap relative z-[109]">
                    <span className="h-[16px] self-stretch shrink-0 basis-auto font-['Roboto'] text-[14px] font-normal leading-[16px] text-[#fff] relative text-left whitespace-nowrap z-[110]">
                      {activity.text}
                    </span>
                    <span className="h-[14px] self-stretch shrink-0 basis-auto font-['Roboto'] text-[12px] font-normal leading-[14px] text-[#888888] relative text-left whitespace-nowrap z-[111]">
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
