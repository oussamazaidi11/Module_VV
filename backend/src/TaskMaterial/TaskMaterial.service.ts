import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';
import { StorageManagement } from 'src/StorageManagement/Storage.service';
import { Prisma, MimeType, FeedBackType } from '@prisma/client';


@Injectable()
export class TaskMaterialService {
  constructor(private readonly prisma: DatabaseService,private readonly Storagemanagement:StorageManagement ) {}
  async SetFeed(userid:string, id:string,
    feedback: {
        feedbackType: FeedBackType ;
        feedbackNote?: string;
       
      }
  ){
    const taskMaterial=await this.prisma.taskMaterial.findUnique({where:{taskMaterialID:id}})
    const user=await this.prisma.collaboratorUser.findFirst({where:{userID:userid}})
    if(taskMaterial && user){
      return this.prisma.taskMaterialFeedback.upsert({
  where: { taskMaterialID: taskMaterial.taskMaterialID },
  update: {
    feedbackType: feedback.feedbackType,
    feedbackNote: feedback.feedbackNote || null,
   
  },
  create: {
    taskMaterialID: taskMaterial.taskMaterialID,
    feedbackType: feedback.feedbackType,
    feedbackNote: feedback.feedbackNote || null,
    isUpdated: false,
    userReciverFirstName: user.collaboratorUserFirstName,
    userReciverLastName: user.collaboratorUserLastName,
    userReciverID: userid,
    createdAt: new Date(),
  },
});

    }

  }
 
 async UpdateFeed(userid: string, id: string, feedback: {
  feedbackType: FeedBackType;
  feedbackNote?: string;

}) {
  const feed=await this.prisma.taskMaterialFeedback.findUnique({where:{taskMaterialID:id }})
  if(!feed ){
    throw new Error("only the creator of feed back can update")
  }
  else{
    if(feed){
      return this.prisma.taskMaterialFeedback.update({where:{taskMaterialFeedbackID:feed.taskMaterialFeedbackID},data:{
          isUpdated:true,
         
          feedbackType:feedback.feedbackType,
          feedbackNote: feedback.feedbackNote || null, 
        

          updatedAt:new Date()
        
      }})
    }
  }
  





}
async deleteFeedBack(userid:string,id:string){
   const feed=await this.prisma.taskMaterialFeedback.findUnique({where:{taskMaterialID:id }})
   if(feed){
    return this.prisma.taskMaterialFeedback.delete({
      where:{taskMaterialFeedbackID:feed.taskMaterialFeedbackID}
    })
  }
 



}
  async GetFeedBacks(id:string) {
    const data = await this.prisma.taskMaterialFeedback.findMany(
      {
        where:{taskMaterialID:id}
      }
    );
    return data;
  }


async getAll() {
  //here the task material nee the new attribute "usersendername "
  return this.prisma.taskMaterial.findMany({
    where: {
      OR: [
        { package: { isNot: null } },
        { resources: { some: {} } }, // at least one resource
      ],
    },
    include: {
      package: true,
      resources: true,
      feedback: true,
      task: true,
    },
     orderBy: {
    updatedAt: 'desc', 
  },
  });
}
  async  getUser(id:string){
    return this.prisma.collaboratorUser.findFirst({where:{userID:id}})
  }
  async getTaskMaterialWithR(id){
    return this.prisma.taskMaterialResource.findMany({
      where:{taskMaterialID:id}
    })
  }
  async deleteTaskMaterial(id:string){
    const taskMaterial=await this.prisma.taskMaterial.findUnique({
      where:{taskMaterialID:id}
    })
    if(!taskMaterial){
      throw new Error("this task dosent exist")
    }
    if(taskMaterial && taskMaterial?.taskMaterialWithResource){
      return this.prisma.$transaction([
        this.prisma.taskMaterial.delete({where:{taskMaterialID:id}}),
        this.prisma.taskMaterialResource.deleteMany({
          where:{taskMaterialID:id}

        })
        



      ])
    }
    else{
      if(taskMaterial && taskMaterial?.taskMaterialWithPackage){
         return this.prisma.$transaction([
        this.prisma.taskMaterial.delete({where:{taskMaterialID:id}}),
        this.prisma.taskMaterialPackage.deleteMany({
          where:{taskMaterialID:id}

        })



      ])

      }
    }


  }

  //if is with package 
  async createPackage(data:{
      taskMaterialPackageID:string   ; 
      packageName:string;
      sentAt:Date;
      packageLink:string;
      metadataPassword:string;
      metadataText :string;
      metadataExporationDate: Date;
      taskMaterialID:string   
  }){
    return this.prisma.taskMaterialPackage.create({
      data,
    })



  }
  async updatePackage(id:string,data:{
    
      packageName:string;
      sentAt:Date;
      packageLink:string;
      metadataPassword:string;
      metadataText :string;
      metadataExporationDate: Date;
      taskMaterialID:string  

  }){
    return this.prisma.taskMaterialPackage.update({
      where:{taskMaterialID:id},
      data,
    })

  }




  async createResource( data:
    {
  resourceUrl:string;          
  resourceSize: string;          
  resourceMimeType: MimeType;    
  checkSum:"md5";          
  uploadedByUserID:string;  
  uploadedAt:Date;           

  taskMaterialID:string      

    }){
      return this.prisma.taskMaterialResource.create({
        data,
      });
   
  }
  async deleteResourcesByTaskMaterialID(taskMaterialID: string) {
  return this.prisma.taskMaterialResource.deleteMany({
    where: { taskMaterialID:taskMaterialID },
  });
}

 // update resource by its unique ID
async updateResource(id: string, data:
    {
  resourceUrl:string;          
  resourceSize: string;          
  resourceMimeType: MimeType;    
  checkSum:string;          
  uploadedByUserID:string;  
  uploadedAt:Date;           

  taskMaterialID:string      }) {
  return this.prisma.taskMaterialResource.updateMany({
  where: { taskMaterialID: id },
  data,
});

}

  

  async createTask(data: {
  
  taskMaterialName: string;
  taskMaterialWithResource: boolean;
   updatedAt: Date,
   isTaskMaterialUpdated:boolean,

  taskMaterialWithPackage: boolean;
  sentAt: Date;
  userSenderID: string;
  taskID:string,

  
 
}) {
    return this.prisma.taskMaterial.create({
    data,
    });
  }

  // Update a TaskMaterial by id
  async updateTask(id: string, data: {
  
  taskMaterialName?: string;
   updatedAt:Date,
   isTaskMaterialUpdated:boolean,
  
  
  userSenderID: string;
 
  
 
}) {
    return this.prisma.taskMaterial.updateMany({
      where: { taskMaterialID: id },
      data,
    });
  }

}
