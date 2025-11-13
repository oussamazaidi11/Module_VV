import { memo, useEffect, useState } from "react";

export default memo(function About() {
  const [aboutData, setAboutData] = useState<string>();

  useEffect(() => {
    // fetch your data here
    setAboutData(`
    Pixel Perfect Studios is a premier visual effects house specializing in creating stunning,
     photorealistic worlds for film, television, and games.
      With a team of world-class artists and technicians
    , we push the boundaries of what's possible in digital artistry.
    `);
  }, []);

  return (
    <div className=" bg-[#21252B] border border-[#434956] space-y-[28px] rounded-[12px] px-[30px] py-[50px]">
      <div className="flex gap-[16px] items-center ">
        <img src="Info.svg" alt="about-icon" />
        <h1 className="text-[24px] font-[700]">About</h1>
      </div>
      <p className="text-[#777B83]">{aboutData}</p>
    </div>
  );
});
