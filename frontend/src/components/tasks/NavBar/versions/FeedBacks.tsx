import { useEffect, useState } from "react";
import type { FeedBack } from "../../../../types";
import AddFeedBack from "./forms/AddFeedBack";
import FeedBackCard from "./cards/feedBackCard";
import { GeetFeedBack } from "@/api/Version";

export interface Data {
  message: string;
  status:"PROCESSED_SUCCESSFULLY" | "REMARK" | "MISSING_DATA";
}

interface Props {
  versionId: number;
   userRole: "CLIENT" | "COLLABOR" | "UNKNOWN";
}

export default function FeedBacks({ versionId,userRole }: Props) {
  const [feedback, setFeedback] = useState<FeedBack | null>();
  const [buttonColor, setButtonColor] = useState<string>("bg-[#F4CD57]");
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  const [data, setData] = useState<Data>();

  /**
   * Fetch feedback with the versionId (THE VERSION ID )
   * for deleting a feedback i just set the feedbak as NULL
   */
   
  useEffect(() => {

    //Fake data
     const fetchFeed=async()=>{
        if (data) {
          
          setFeedback({
            userReciverFirstName: feedback?.userReciverFirstName ||"" ,
            userReciverLastName: feedback?.userReciverLastName ||"",
            feedbackNote: data.message,
            user_img: "",
           createdAt: new Date().toISOString(),
           updatedAt:new Date().toISOString(), // or "Jul 1, 2025"
           feedbackType: data.status, // This must be "REMARK" | "PROCESSED_SUCCESSFULLY" | "MISSING_DATA"
           text: data.message,
           status: data.status, 
           userReciverID:feedback?.userReciverID ||""
          
           
            
          });
        } else{ 
          const res=await  GeetFeedBack(versionId.toString())
          
          console.log(res.feedbacks[0])
          setFeedback(res.feedbacks[0])
          
          
          
          
          };}
          fetchFeed()
   
    //Add A feedBack
  }, [versionId, data]);

  if (feedback)
    return (
      <FeedBackCard
         versionId={versionId.toString()}
        feedback={feedback}
        setShowFeedback={setShowFeedback}
        setFeedback={setFeedback}
      />
    );
  else
    return (
      <>
        {!showFeedback && userRole==="CLIENT" && (
          <button
            onClick={() => setShowFeedback(true)}
            className=" cursor-pointer hover:opacity-75 transition-all bg-[#17181D] text-white rounded-[6.7px] p-2 px-3 text-sm w-fit"
          >
            Add Feedback
          </button>
        )}
        <div>
          {showFeedback && (
            <AddFeedBack
              setButtonColor={setButtonColor}
              setShowFeedback={setShowFeedback}
              setData={setData}
              buttonColor={buttonColor}
              versionId={versionId.toString()}

            />
          )}
        </div>
      </>
    );
}
