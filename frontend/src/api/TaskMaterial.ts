
import api from "./axios";

// TM
export const getAllTaskMaterials = async () => {
  const res = await api.get("/taskmaterial");
  return res.data;
};

export const getUserRole = async (userid: string) => {
  const res = await api.get(`/taskmaterial/tm/${userid}`);
  return res.data;
};
///the fake user is with id 123
export const createTaskMaterial = async (userid: string, body: any) => {
  const res = await api.post(`/taskmaterial/${userid}`, body);
  return res.data;
};

export const updateTaskMaterial = async (userid: string, id: string, body: any) => {
  const res = await api.put(`/taskmaterial/${userid}/${id}`, body);
  return res.data;
};

export const deleteTaskMaterial = async (userid: string, id: string) => {
  const res = await api.delete(`/taskmaterial/${userid}/${id}`);
  return res.data;
};
export const GetFeedBack=async(id:string)=>{
  const res=await api.get(`taskmaterial/feedback/${id}`)
  return res.data
};



export const setFeedback = async (userid: string, id: string, feedback: any) => {
  const res = await api.post(`/taskmaterial/feedback/${userid}/${id}`, { feedback });
  return res.data;
};

export const updateFeedback = async (userid: string, id: string, feedback: any) => {
  const res = await api.put(`/taskmaterial/feedback/${userid}/${id}`, { feedback });
  return res.data;
};

export const deleteFeedback = async (userid: string, id: string) => {
  const res = await api.delete(`/taskmaterial/feedback/${userid}/${id}`);
  return res.data;
};
