import type { NavBarItems, TaskInfo } from "../../../types";

import TaskMat from "./task-material/TaskMat";
import SendTasks from "./task-material/SendTasks";
import { useState } from "react";
import NavBarHeader from "./NavBarHeader";
import NavBarMenu from "./NavBarMenu";
import Versions from "./versions/Versions";
import {
  useShowSendTaskStore,
  useShowSendVersStore,
} from "@/store/tasks/store";
import SendVersions from "./versions/SendVersions";

const NavBarRoutes=(userRole:Props["userRole"]): NavBarItems[] => [
  {
    label: "Details",
  },
  {
    label: "Bid & Proposal",
  },
  {
    label: "Outsourcing",
  },
  {
    label: "Task Materials",

    component: <TaskMat userRole={userRole} />,
  },
  {
    label: "Versions",
    component: <Versions userRole={userRole} />,
  },
  {
    label: "Access",
  },
];

interface Props {
  taskInfo: TaskInfo;
  showNavBar: (value: boolean) => void;
  userRole: "CLIENT" | "COLLABOR" | "UNKNOWN"; 
}
export default function Navabr({ taskInfo, showNavBar ,userRole}: Props) {
  const [ActivePage, setActivePage] = useState<string>("Task Materials");
  const { isOpen: isTaskMatOpen } = useShowSendTaskStore();
  const { isOpen: isSendVerOpen } = useShowSendVersStore();
    const getNavBarRoutes = NavBarRoutes(userRole);
  return (
    <>
      {/* A closing Div */}
      <div
        className="fixed top-0 left-0 w-full h-svh bg-black/55"
        onClick={() => showNavBar(false)}
      />

      <nav className="z-40  fixed top-0  right-0  motion-preset-slide-left   sm:max-w-[655px] sm:min-w-[655px] min-h-svh  w-full   flex flex-col gap-[32px]     rounded-[10px] p-[20px] bg-[#17181D]">
        {/*Close Navbar */}
        <div className="flex justify-end w-full ">
          <img
            onClick={() => showNavBar(false)}
            src="x.svg"
            alt=""
            className="cursor-pointer "
          />
        </div>
        <NavBarHeader taskInfo={taskInfo} />
        {/*NavBar Route Menu */}
        <NavBarMenu
          ActivePage={ActivePage}
          setActivePage={setActivePage}
          NavBarRoutes={getNavBarRoutes}
        />
        {/**
         * childrens
         * ["Details", "Bid & Proposal", "Outsourcing", "Task Materials", "Versions", "Access"];
         */}
        <div>{NavBarRoutes(userRole).find((r) => r.label === ActivePage)?.component}</div>
      </nav>

      {/**
       * Other Prompts
       *  <SendTasks /> for send material tasks
       *  <SendVersions /> for send versions
       */}
      {isTaskMatOpen && <SendTasks />}
      {isSendVerOpen && <SendVersions />}
    </>
  );
}
