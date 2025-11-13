import type { ReactNode } from "react";

// RIGHT SECTION ON THE PUBLIC PROFILE PAGE
export interface Detail {
  rating: number;
  adress: string;
  time_loc: string;
  phone: string;
  mail: string;
  website_link: string;
  team_size: string;
}

export interface Service {
  id: number;
  type: string;
  services: {
    id: number;
    name: string;
    desc?: string;
    status: "Available" | "Limited" | "Unavailable";
    availbal_dates: string[];
    Limited_dates: string[];
    Unavailable_dates: string[];
  }[];
}

export interface Tool {
  id: number;
  type: string;
  toolses: {
    id: number;
    name: string;
  }[];
}

// TASKS TYPES

export interface TaskInfo {
  id: number;
  name: string;
  status: "Assigned to" | "Not Assigned" | "Published";
  AssignedTo?: string;
}

export interface TaskMatInfo {
  id: number;
  tmid:string;
  name: string;
  desc: string;
  data: {
    resourceUrl: string | undefined;
    type: "file" | "img";
    name: string;
    url: string;
    img?: string;
  }[];
}
export type VersionInfo = TaskMatInfo;

export interface FeedBack {
  status: any;
  userReciverFirstName: string;
  userReciverLastName:string
  feedbackNote:string
  user_img?: string;
  createdAt: string;
  updatedAt:string;
  feedbackType: "REMARK" | "PROCESSED_SUCCESSFULLY" | "MISSING_DATA";
  text: string;
  userReciverID:string

}

export interface UploadedFile {
  id: string;
  file: File;
  size: string;
}

export interface ShowElement {
  isOpen: boolean;
  open: () => void;
  close: () => void;
 
}
export interface NavBarItems {
  label: string;
  component?: ReactNode;
}
