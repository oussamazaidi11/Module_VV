import { useEffect, useState } from "react";
import Details from "./Details";
import type { Detail, Service, Tool } from "../../types";
import Services from "./Services";
import Tools from "./Tools";

export default function RightSection() {
  const [details, setDetails] = useState<Detail>({} as Detail);
  const [services, setServices] = useState<Service[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    //Set details
    setDetails({
      rating: 4,
      adress: "los Angles, USA",
      time_loc: "PST (UTX-8)",
      phone: "+1(555)123-4567",
      mail: "contact@pixelperfect.com",
      website_link: "pixelperfect.com",
      team_size: "Team Size: 50-100",
    });
    // SetServices
    setServices([
      {
        id: 0,
        type: "VFX & Film",
        services: [
          {
            id: 0,
            name: "3D Modeling",
            desc: "Creating 3D models of objects and characters.",
            status: "Limited",
            availbal_dates: [
              "2025-07-02",
              "2025-07-07",
              "2025-07-08",
              "2025-07-14",
              "2025-07-21",
              "2025-07-23",
              "2025-07-24",
              "2025-07-28",
              "2025-07-29",
              "2025-07-30",
            ],
            Limited_dates: [
              "2025-07-03",
              "2025-07-09",
              "2025-07-10",
              "2025-07-15",
              "2025-07-16",
              "2025-07-31",
            ],
            Unavailable_dates: [
              "2025-07-04",
              "2025-07-05",
              "2025-07-06",
              "2025-07-11",
              "2025-07-12",
              "2025-07-18",
              "2025-07-19",
              "2025-07-20",
              "2025-07-22",
              "2025-07-25",
              "2025-07-26",
              "2025-07-27",
            ],
          },
          {
            id: 1,
            name: "Compositing",
            status: "Available",
            desc: "Creating 3D models of objects and characters.",

            availbal_dates: [
              "2025-07-02",
              "2025-07-07",
              "2025-07-08",
              "2025-07-14",
              "2025-07-21",
              "2025-07-23",
              "2025-07-24",
              "2025-07-28",
              "2025-07-29",
              "2025-07-30",
            ],
            Limited_dates: [
              "2025-07-03",
              "2025-07-09",
              "2025-07-10",
              "2025-07-15",
              "2025-07-16",
              "2025-07-31",
            ],
            Unavailable_dates: [
              "2025-07-04",
              "2025-07-05",
              "2025-07-06",
              "2025-07-11",
              "2025-07-12",
              "2025-07-18",
              "2025-07-19",
              "2025-07-20",
              "2025-07-22",
              "2025-07-25",
              "2025-07-26",
              "2025-07-27",
            ],
          },
          {
            id: 2,
            name: "VFX Supervision",
            status: "Available",
            desc: "Creating 3D models of objects and characters.",

            availbal_dates: [
              "2025-07-02",
              "2025-07-07",
              "2025-07-08",
              "2025-07-14",
              "2025-07-21",
              "2025-07-23",
              "2025-07-24",
              "2025-07-28",
              "2025-07-29",
              "2025-07-30",
            ],
            Limited_dates: [
              "2025-07-03",
              "2025-07-09",
              "2025-07-10",
              "2025-07-15",
              "2025-07-16",
              "2025-07-31",
            ],
            Unavailable_dates: [
              "2025-07-04",
              "2025-07-05",
              "2025-07-06",
              "2025-07-11",
              "2025-07-12",
              "2025-07-18",
              "2025-07-19",
              "2025-07-20",
              "2025-07-22",
              "2025-07-25",
              "2025-07-26",
              "2025-07-27",
            ],
          },
        ],
      },
      {
        id: 1,
        type: "Animation",

        services: [
          {
            id: 0,
            name: "Animation",
            status: "Limited",
            desc: "Creating 3D models of objects and characters.",

            availbal_dates: [
              "2025-07-02",
              "2025-07-07",
              "2025-07-08",
              "2025-07-14",
              "2025-07-21",
              "2025-07-23",
              "2025-07-24",
              "2025-07-28",
              "2025-07-29",
              "2025-07-30",
            ],
            Limited_dates: [
              "2025-07-03",
              "2025-07-09",
              "2025-07-10",
              "2025-07-15",
              "2025-07-16",
              "2025-07-31",
            ],
            Unavailable_dates: [
              "2025-07-04",
              "2025-07-05",
              "2025-07-06",
              "2025-07-11",
              "2025-07-12",
              "2025-07-18",
              "2025-07-19",
              "2025-07-20",
              "2025-07-22",
              "2025-07-25",
              "2025-07-26",
              "2025-07-27",
            ],
          },
        ],
      },
    ]);
    // SetTools
    setTools([
      {
        id: 0,
        type: "VFX & Film",
        toolses: [
          {
            id: 0,
            name: "Nuke",
          },
          {
            id: 1,
            name: "Houdini",
          },
          {
            id: 2,
            name: "Maya",
          },
          {
            id: 3,
            name: "Arnold",
          },
        ],
      },
      {
        id: 1,
        type: "Animation",
        toolses: [
          {
            id: 0,
            name: "Maya",
          },
          {
            id: 1,
            name: "Zbrush",
          },
          {
            id: 2,
            name: "Blender",
          },
        ],
      },
    ]);
  }, []);

  return (
    <div className="flex flex-col gap-[40px] bg-[#21252B] border border-[#434956] rounded-[12px] px-[30px] py-[50px]">
      {/*Details */}
      <Details details={details} />
      <hr className="text-[#888888]" />
      {/*Services & Availability */}
      <Services services={services} />
      <hr className="text-[#888888]" />
      <Tools tools={tools} />
    </div>
  );
}
