import { useEffect, useState } from "react";

import type { TaskInfo } from "../../types";
import Navabr from "../../components/tasks/NavBar/Navabr";
import { collabor,client} from "@/Usr";
import { CheckUserRole } from "@/api/UserCheckRole";
type UserRole = "CLIENT" | "COLLABOR" | "UNKNOWN";
// here the test user just pass one user and import it in component :
// forms for task material :this path :/componenent/NavBar/version or taskMaterial/forms 


export default function Tasks() {
  const [showNavBar, setShowNavBar] = useState<boolean>(false);
  const [taskinfo, setTaskinfo] = useState<TaskInfo>({} as TaskInfo);
   const [userRole, setUserRole] = useState<UserRole>("UNKNOWN");
    

  useEffect(() => {
  const fetchRole = async () => {
  try {
    const res = await CheckUserRole(client.id); 
   console.log(res)
   setUserRole(res.role)
  } catch (err) {
    console.error(err);
    setUserRole("UNKNOWN");
  }
};
fetchRole();
    
    
    


  }, []);

  return (
    <div className="flex items-center justify-center w-full ">
      <button
        onClick={() => setShowNavBar(true)}
        className="p-2 border rounded-md cursor-pointer hover:bg-white hover:text-black"
      >
        Open task material
      </button>
      {showNavBar && <Navabr taskInfo={taskinfo} showNavBar={setShowNavBar} userRole={userRole} />}
    </div>
  );
}
