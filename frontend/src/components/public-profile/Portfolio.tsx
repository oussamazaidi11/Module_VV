import { useEffect, useState } from "react";

interface Project {
  id: number;
  img: string;
  title: string;
  desc: string;
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2;

  const totalPages = Math.ceil(projects.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = projects.slice(startIndex, startIndex + rowsPerPage);

  useEffect(() => {
    //fetch your data here
    setProjects([
      {
        id: 0,
        img: "",
        title: "Project Hyperion",
        desc: "Explosive VFX for a blockbuster film.",
      },
      {
        id: 1,
        img: "",
        title: "Project Hyperion1",
        desc: "Explosive VFX for a blockbuster film.",
      },
      {
        id: 2,
        img: "",
        title: "Project Hyperion2",
        desc: "Explosive VFX for a blockbuster film.",
      },
      {
        id: 3,
        img: "",
        title: "Project Hyperion3",
        desc: "Explosive VFX for a blockbuster film.",
      },
      {
        id: 3,
        img: "",
        title: "Project Hyperion3",
        desc: "Explosive VFX for a blockbuster film.",
      },
    ]);
  }, []);
  return (
    <div className="bg-[#21252B] border border-[#434956] space-y-[28px] rounded-[12px] px-[30px] py-[50px]">
      <div className="flex gap-[16px] items-center ">
        <img src="Image.svg" alt="about-icon" />
        <h1 className="text-[24px] font-[700]">Portfolio</h1>
      </div>
      {/*Projects */}
      <div className="flex flex-wrap items-center lg:justify-normal justify-center gap-[53px]">
        {projects.length === 0 ? (
          <span className="text-sm text-[#777B83]">
            There is no projects for now
          </span>
        ) : (
          paginatedData.map((proj) => (
            <div
              key={proj.id}
              className="w-[388px]  rounded-[12px] space-y-[16px]"
            >
              <img
                src={proj.img}
                alt="project-img"
                className="bg-[#F6F6F6] h-[318px] w-full rounded-[12px]"
              />
              <div className=" space-y-[8px]">
                <h1 className="font-[700] text-lg">{proj.title}</h1>
                <span className="text-[#777B83] font-[500] text-[16px]">
                  {proj.desc}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end ">
        <div className="flex items-center justify-center mt-4 space-x-[24px]">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="rounded-full cursor-pointer  hover:bg-gray-400 transition-all  w-[40px] p-[10px] h-[40px] flex  items-center justify-center"
          >
            <img src="Chevron-left.svg" alt="chevron-icon" />
          </button>

          <span
            className={`text-white rounded-full p-[10px] border-white w-[40px] h-[40px] flex  items-center justify-center ${
              currentPage === currentPage && "border"
            }`}
          >
            {currentPage}
          </span>
          <span
            className={`text-white rounded-full p-[10px] border-white w-[40px] h-[40px] flex  items-center justify-center ${
              currentPage + 1 === currentPage && "border"
            }`}
          >
            {currentPage !== totalPages && currentPage + 1}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="rounded-full cursor-pointer rotate-180 hover:bg-gray-400 transition-all  w-[40px] p-[10px] h-[40px] flex  items-center justify-center"
          >
            <img src="Chevron-left.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
