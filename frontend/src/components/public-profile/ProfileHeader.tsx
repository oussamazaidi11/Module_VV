import { useEffect, useState } from "react";

interface ProfileInfo {
  profileImg: string;
  bannerImg: string;
  profileName: string;
}

export default function ProfileHeader() {
  const [Profileinfo, setProfileInfo] = useState<ProfileInfo>();
  useEffect(() => {
    //Fetch your data here
    setProfileInfo({
      profileImg: "",
      bannerImg: "",
      profileName: "Pixel Perfect Studios",
    });
  }, []);
  return (
    <div>
      {/*BANNER*/}
      <div className="h-[300px] w-full bg-[#cccccc] rounded-tl-[12px] rounded-tr-[12px] flex items-center justify-center">
        {/*
        / * Set the banner img HERE
        /* Delete the span of the dimenssions below

            <img src={Profileinfo?.bannerImg} alt="banner img" className="w-full h-full" />
        */}
        <span className="text-[#878383] font-[700] text-6xl">1200 x 300</span>
      </div>
      {/*PROFILE INFORMATIONS*/}
      <div className="relative flex sm:flex-row flex-col lg:h-[125px] h-auto  bg-[#21252b] rounded-br-[12px] rounded-bl-[12px]">
        {/*PROFILE IMAGE */}
        <div className="sm:absolute relative  flex items-center justify-center  bottom-[55px] sm:left-[53px]   h-[170px] w-[170px] rounded-full bg-[#D9D9D9] border-[5px] border-[#21252B] z-10">
          {/*
            /* Set the Profile image Here
            <img src={Profileinfo?.profileImg} alt="profile img" className="w-full h-full" />
          */}
          <span className=" absolute bottom-2 right-2 text-sm bg-[#F4CD57] text-black size-[24] font-[700] rounded-[4px] p-[2px]">
            Pre
          </span>
        </div>
        <div className="sm:pl-[247px] flex md:flex-row flex-col gap-5 w-full h-auto justify-between  px-[24px] py-[40.5px] ">
          {/*PROFILE NAME */}
          <h3 className="xl:text-4xl lg:text-2xl text-3xl  font-[600]  tracking-wide">
            {Profileinfo?.profileName}
          </h3>
          {/*BUTTONS */}
          <div className="flex lg:flex-row flex-col gap-[10px] ">
            {/*Connect Button*/}
            <div className="flex cursor-pointer hover:opacity-80 transition-all text-[16px] items-center  gap-2 rounded-[8px] bg-[#5473C1] w-[120px] h-[36px]  px-4 py-2 ">
              <img src="LinkIcon.svg" alt="connect icon" />
              <span>Connect</span>
            </div>
            {/*Message Button*/}
            <div className="border-[1px] border-[#878383] flex cursor-pointer hover:opacity-80 transition-all text-[16px] items-center  gap-2 rounded-[8px] bg-[#17181D] w-[126px] h-[36px]  px-4 py-2 ">
              <img src="messageIcon.svg" alt="message icon" />
              <span>Message</span>
            </div>
            {/*Request Private Infos Button*/}
            <div className="flex cursor-pointer hover:opacity-80 transition-all text-[16px] text-black items-center  gap-2 rounded-[8px] bg-white w-[214px] h-[36px]  px-4 py-2 ">
              <img src="lockIcon.svg" alt="Request Private info icon" />
              <span>Request Private Infos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
