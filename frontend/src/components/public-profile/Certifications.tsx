import { memo, useEffect, useState } from "react";

export default memo(function Certifications() {
  const [certifications, setCertifications] = useState<string[]>([]);

  useEffect(() => {
    // fetch your data from the api
    setCertifications(["TPN Assessed", "ISO/IEC 27001"]);
  }, []);

  return (
    <div className="bg-[#21252B] border border-[#434956] space-y-[16px] rounded-[12px] px-[30px] py-[50px]">
      <div className="flex items-start gap-[16px]">
        <img src="Badge-check.svg" alt="certification-icon" />
        <div className="flex flex-col gap-[16px] items-start ">
          <h1 className="text-[24px] font-[700]">Certifications</h1>
          {/*Certifications */}
          <div className="flex gap-[8px] flex-wrap">
            {certifications.length === 0 ? (
              <span className="text-[#777B83] text-sm">
                There is no cerfications for now
              </span>
            ) : (
              certifications.map((certf, index) => (
                <div
                  key={index}
                  className="bg-[#464C5D] text-white px-[8px] py-[4px] rounded-[30px] text-[12px] font-[400]"
                >
                  {certf}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
