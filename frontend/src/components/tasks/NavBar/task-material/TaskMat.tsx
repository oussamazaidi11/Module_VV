import { useEffect, useState } from "react";

import TaskCard from "./cards/TaskVersCard";
import type { TaskMatInfo } from "../../../../types";
import { useShowSendTaskStore } from "@/store/tasks/store";
import { getAllTaskMaterials,deleteTaskMaterial } from "@/api/TaskMaterial";
import {client,collabor} from "../../../../Usr"
import toast from "react-hot-toast";

interface TaskMatProps {
  userRole: "CLIENT" | "COLLABOR" | "UNKNOWN";
}


  export default function TaskMat({userRole}:TaskMatProps) {
    const { open } = useShowSendTaskStore();
    const [taskMatinfo, setTaskMatinfo] = useState<TaskMatInfo[]>([]);
    const isclient=userRole==="CLIENT"

  
    /**
     * Fetch Task materials Here
     */
  useEffect(() => {
    const fetchTaskMats = async () => {
      try {
        
        const res = await getAllTaskMaterials();
       

        const mapped: TaskMatInfo[] = res.map((tm: any) => ({
          id: tm.taskMaterialID, 
          
          name: tm.taskMaterialName,
          desc: `Sent by ${tm.userSenderID} on ${
            tm.updatedAt ? new Date(tm.updatedAt).toLocaleString() : "N/A"
          }`,
          data: [
            // map resources
            ...(tm.resources?.map((r: any) => ({
              type: r.resourceMimeType.toLowerCase() ? "img" : "file",
              name: r.resourceSize,
              url: r.resourceUrl,
              img: r.resourceMimeType.toLowerCase()? r.resourceUrl : undefined,
            })) || []),
            // add package if exists
            ...(tm.package
              ? [
                  {
                    type: "file",
                    name: tm.package.packageName || "Unnamed package",
                    url: tm.package.packageLink || "#",
                    

                  },
                ]
              : []),
          ],
        }));
          toast.dismiss();
  toast.loading("Taskmaterial Loading", { duration: 3000 });

        setTaskMatinfo(mapped); // update state
      } catch (err) {
        console.error("Failed to fetch taskMaterials:", err);
      }
    };
  
    fetchTaskMats();
      
   
    
  }, []);


    /**
     * Delete a task material
     * @param taskId 
     * 
     */
    
   const DeleteTask =async (taskId: string) => {
      
      try{
        toast.loading("Deleting",{duration:3000})
        const res=await deleteTaskMaterial(client.id,taskId)
        // 123it s the id of a  client user 
        toast.success("Deleted With suceess",{duration:1000})
        
        setTaskMatinfo(taskMatinfo.filter((taskmat) => taskmat.id.toString() != taskId));
      }catch(error){
        console.log(error)

      }

      
    };

    return (
      <div className="flex  flex-col gap-[32px]  ">
        {/*Task material flow and send material */}
        <div className="flex items-center justify-between flex-1 w-full ">
          <span className="p-[8px] font-[600] text-lg text-[#888888] border-l-2 border-[#5473C1] ">
            Task Materials FLOW
          </span>

          {isclient &&(<button
            onClick={open}
            className=" cursor-pointer hover:bg-white hover:text-black transition-all bg-[#45464a] text-white text-[13px] font-[400] py-[8px] px-[16px] rounded-[8px]"
          >
            Send Task Material
          </button> )}
        </div>
      {/*Task materials */}
      <div className="flex flex-col  sm:h-[52svh] h-[57svh]  overflow-y-auto  gap-[32px]">
        {taskMatinfo.map((taskmat,i) => (
          <TaskCard
           userid={client.id}
            key={taskmat.id ?? i}
            taskmat={taskmat}
            DeleteTask={DeleteTask} 
            userRole={userRole}          />
        ))}
      </div>
    </div>
  );
}
