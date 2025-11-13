import type { Tool } from "../../types";

interface Props {
  tools: Tool[];
}
export default function Tools({ tools }: Props) {
  return (
    <div className="flex flex-col pb-[20px] gap-[32px]">
      <div className="flex gap-[16px] items-center ">
        <img src="Wrench.svg" alt="service-icon" />
        <h1 className="text-[24px] font-[700] ">Tools</h1>
      </div>
      <div className=" space-y-[16px]">
        {tools.map((tool) => (
          <div key={tool.id} className="space-y-[16px]">
            <p className="font-[600] text-[18px]">{tool.type}</p>
            <div className="flex gap-[10px] flex-wrap">
              {tool.toolses.map((t) => (
                <div
                  key={t.id}
                  className="px-[8px] py-[4px] bg-[#464C5D] rounded-[30px] font-[400] text-[14px]"
                >
                  {t.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
