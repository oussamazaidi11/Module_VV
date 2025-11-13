import { useEffect, useState } from "react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  img: string;
}

export default function Teams() {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    // fetch your data here
    setTeam([
      {
        id: 0,
        name: "John Doe",
        role: "VFX Supervisor",
        img: "",
      },
      {
        id: 1,
        name: "John Doe",
        role: "VFX Supervisor",
        img: "",
      },
      {
        id: 2,
        name: "John Doe",
        role: "VFX Supervisor",
        img: "",
      },
      {
        id: 3,
        name: "John Doe",
        role: "VFX Supervisor",
        img: "",
      },
    ]);
  }, []);

  return (
    <div className="bg-[#21252B] border border-[#434956] space-y-[28px] rounded-[12px] px-[30px] py-[50px]">
      <div className="flex gap-[16px] items-start ">
        <img src="Users-2.svg" alt="about-icon" />
        <div className="flex flex-col gap-[16px]">
          <h1 className="text-[24px] font-[700]">Team</h1>
          <div className="flex sm:space-x-[156px] gap-5 flex-wrap">
            {team.length === 0 ? (
              <span className="text-sm text-[#777B83]">
                There is no team for now
              </span>
            ) : (
              team.map((user) => (
                <div
                  key={user.id}
                  className="flex sm:flex-row   gap-[16px] items-center"
                >
                  <img
                    src={user.img}
                    alt="user-img"
                    className="w-[80px] h-[80px] p-[10px] bg-white rounded-full flex items-center justify-center"
                  />
                  <div className="flex flex-col items-start">
                    <p className="text-[20px] font-[700]">{user.name}</p>
                    <span className="text-[#777B83] text-[16px]">
                      {user.role}
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
