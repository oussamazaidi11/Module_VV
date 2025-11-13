import api from "./axios";
export const getAllVersion=async()=>{
    const res=await api.get("/version")
    return res.data



}
export const createVersion=async(userid:string,body:any)=>{
    const res=await api.post(`/version/${userid}`,body)
    return res.data



}
export const updateVersion=async(userid:string,id:string,body:any)=>{
    const res=await api.put(`/version/${userid}/${id}`,body)
    return res.data



}
export const deleteVersion=async(id: string, versionId: string)=>{
    const res=await api.delete(`/version/${id}/${versionId}`)
    return res.data //backend confirm the delete 
}
//// Feeeedddbaaaaacks 
export const GeetFeedBack=async(id:string)=>{
    const res=await api.get(`version/feedback/${id}`)
  return res.data


}
export const setFeedback = async (userid: string, id: string, feedback: any) => {
  const res = await api.post(`/version/feedback/${userid}/${id}`, { feedback });
  return res.data;
};
export const updateFeedBack=async(userid: string, id: string, feedback: any)=>{
      const res = await api.put(`/version/feedback/${userid}/${id}`, { feedback });
  return res.data;


}
export const DEleteFeedBack=async(userid: string , id: string)=>{
       const res = await api.delete(`/version/feedback/${userid}/${id}`);
       return res.data;




}