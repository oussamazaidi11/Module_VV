import api from "./axios";
export const CheckUserRole=async(userID:string)=>{
    const res=await api.get(`/version/${userID}`)
    return res.data



}