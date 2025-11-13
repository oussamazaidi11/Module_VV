import React from "react";
import type { Detail } from "../../types";

interface Props {
  details: Detail;
}
export default function Details({ details }: Props) {
  return (
    <div className="flex flex-col pb-[20px] gap-[32px]">
      <div className="flex gap-[16px] items-center ">
        <img src="Pin.svg" alt="about-icon" />
        <h1 className="text-[24px] font-[700]">Details</h1>
      </div>
      <div className="flex flex-col gap-[16px]">
        {/*RATING */}
        <span className="text-[16px] font-[300]">Rating</span>
        <div className="flex items-center justify-between">
          <div className="flex gap-[4px]">
            {Array.from({ length: details.rating }).map((_, i) => (
              <img key={i} src="Star.svg" alt="start-icon" />
            ))}
          </div>
          <span className=" font-[400] text-[14px] text-[#777B83]">
            ({details.rating}.0 rating)
          </span>
        </div>
        <hr className="text-[#888888]" />
        <div className="flex gap-[12px]">
          <img src="Map-pin.svg" alt="map-icon" />
          <span className="font-[300] text-[13px]">{details.adress}</span>
        </div>
        <div className="flex gap-[12px]">
          <img src="Clock.svg" alt="clock-icon" />
          <span className="font-[300] text-[13px]">{details.time_loc}</span>
        </div>
        <div className="flex gap-[12px]">
          <img src="Phone.svg" alt="phone-icon" />
          <span className="font-[300] text-[13px]">{details.phone}</span>
        </div>
        <div className="flex gap-[12px]">
          <img src="Mail.svg" alt="mail-icon" />
          <span className="font-[300] text-[13px]">{details.mail}</span>
        </div>
        <div className="flex gap-[12px]">
          <img src="Link-2.svg" alt="link-icon" />
          <span className="font-[300] text-[13px]">{details.website_link}</span>
        </div>
        <div className="flex gap-[12px]">
          <img src="Users.svg" alt="users-icon" />
          <span className="font-[300] text-[13px]">{details.team_size}</span>
        </div>
      </div>
    </div>
  );
}
