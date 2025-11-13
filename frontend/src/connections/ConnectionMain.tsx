import { useState } from "react";
import "../index.css";
import Request from "./Request";
import Invitations from "./invitation";
import Connection from "./Connection";

export default function Main() {
  const [activeTab, setActiveTab] = useState<"requests" | "connections" | "invitations">("requests");

  const getTabClass = (tabName: "requests" | "connections" | "invitations") =>
    activeTab === tabName
      ? "flex w-[228px] h-[37px] justify-center items-center rounded-[8px] bg-[#17181d]"
      : "flex w-[228px] h-[37px] justify-center items-center rounded-[8px] hover:bg-[#2a2c33] transition";

  return (
    <div className="main-container flex w-[1300px] flex-col gap-[48px] items-start relative mx-auto my-0">
      {/* Header */}
      <div className="flex h-[148px] flex-col gap-[24px] items-start self-stretch shrink-0 relative">
        <div className="flex w-[1300px] justify-between items-center">
          <div className="flex w-[526px] flex-col gap-[8px] items-start">
            <span className="h-[44px] font-['Inter'] text-[36px] font-semibold leading-[43.568px] text-[#fff]">
              Connections
            </span>
            <span className="h-[19px] font-['Roboto'] text-[15px] text-[#888888]">
              Your professional network. Connect with vendor and add them to your pool
            </span>
          </div>
          <div className="cursor-pointer flex w-[269px] py-[12px] px-[24px] gap-[12px] justify-center items-center bg-[#5473c1] rounded-[12px] cursor-pointer hover:opacity-90 transition">
            <div className="flex w-[24px] h-[24px] p-[2px] justify-center items-center">
              <div className="w-[20px] h-[20px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-08-07/wFDb88hVhR.png)] bg-cover bg-no-repeat" />
            </div>
            <span className="text-[20px] font-medium text-[#f6f6f6] font-['Roboto']">Find new connection</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex p-[8px] justify-between items-center self-stretch bg-[#393d46] rounded-[12px]">
          <div className={getTabClass("requests")} onClick={() => setActiveTab("requests")}>
            <span className="text-[20px] text-[#fff] font-['Roboto'] cursor-pointer">Connection requests</span>
          </div>
          <div className={getTabClass("connections")} onClick={() => setActiveTab("connections")}>
            <span className="text-[20px] text-[#fff] font-['Roboto'] cursor-pointer">My connections</span>
          </div>
          <div className={getTabClass("invitations")} onClick={() => setActiveTab("invitations")}>
            <span className="text-[20px] text-[#fff] font-['Roboto'] cursor-pointer">Sent invitations</span>
          </div>
        </div>
      </div>

      {/* Active Tab Content */}
      <div className="w-full">
        {activeTab === "requests" && <Request />}
        {activeTab === "connections" && <Connection />}
        {activeTab === "invitations" && <Invitations />}
      </div>
    </div>
  );
}
