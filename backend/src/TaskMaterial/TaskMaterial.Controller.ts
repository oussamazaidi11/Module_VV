
import { Controller,Post, Get, Put, Param, Body, Delete} from '@nestjs/common';
import { TaskMaterialService } from './TaskMaterial.service';
import { StorageManagement } from 'src/StorageManagement/Storage.service';
  



import { Prisma, MimeType, FeedBackType } from '@prisma/client';
import { AzureStorageService } from 'src/AzureStorageModule/azureStorage.service';



@Controller('taskmaterial')
export class TaskMaterialController {
  
  constructor(private readonly taskMaterialService: TaskMaterialService, private readonly azureStorageService: AzureStorageService,private readonly StorageManagement :StorageManagement
  ) {}
 
  // data passage in the url of api
  //NB : the api is without api key so any ressouce can intteract with th backend 

  
  @Get()
  getAll() {
    return this.taskMaterialService.getAll();
  
  }
  @Get("/tm/:userid")
  async ChekUserRole(@Param('userid') id:string){
   const collab= await this.taskMaterialService.getUser(id)
   return collab?false:true;

  }
  
// updateTaskMaterial Without update the storage 
//*********************************************************************************************** */
  @Put(':userid/:id')
  async UpdateTaskMaterial(
    @Param('id') id: string,
    @Param('userid') userid:string,
    @Body() body: {
    
    
      taskMaterialName: string;
    
      updatedAt:Date;
      isTaskMaterialUpdated:boolean;

      userSenderID:string;
    
      
      taskID: string;
    
      resource:{
      resourceUrl:string;          
      resourceSize: string;          
      resourceMimeType: MimeType ;    
             
       uploadedByUserID:string;  
       uploadedAt:Date;
       taskMaterialID: string;           
      
      }[];
      package:{
      
      packageName:string;
      sentAt:Date;
      packageLink:string;
      metadataPassword:string;
      metadataText :string;
      metadataExporationDate: Date;
      taskMaterialID:string  

      }
    },
  )
  // here the update logic started
  //****** */
  {
  
const allowedMimeTypes: Record<string, MimeType> = {
  // Images
  "image/jpeg": MimeType.JPEG,
  "image/jpg": MimeType.JPG,
  "image/png": MimeType.PNG,
  "image/gif": MimeType.GIF,
  "image/bmp": MimeType.BMP,
  "image/webp": MimeType.WEBP,

  // Videos
  "video/mp4": MimeType.MP4,
  "video/quicktime": MimeType.MOV,
  "video/x-msvideo": MimeType.AVI,
  "video/x-matroska": MimeType.MKV,
  "video/webm": MimeType.WEBM,

  // Audio
  "audio/mpeg": MimeType.MP3,
  "audio/wav": MimeType.WAV,
  "audio/ogg": MimeType.OGG,
  "audio/mp4": MimeType.M4A,

  // Documents
  "application/pdf": MimeType.PDF,
  "application/msword": MimeType.DOC,
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": MimeType.DOCX,
  "application/vnd.ms-excel": MimeType.XLS,
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": MimeType.XLSX,

  // Archives
  "application/zip": MimeType.ZIP,
  "application/vnd.rar": MimeType.RAR,
  "application/x-7z-compressed": MimeType.SEVEN_Z,
  "application/x-tar": MimeType.TAR,
  "application/gzip": MimeType.GZ,
};

// Extension → MIME type mapping
const EXTENSION_TO_MIME: Record<string, string> = {
  // Images
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  bmp: "image/bmp",
  webp: "image/webp",

  // Videos
  mp4: "video/mp4",
  mov: "video/quicktime",
  avi: "video/x-msvideo",
  mkv: "video/x-matroska",
  webm: "video/webm",

  // Audio
  mp3: "audio/mpeg",
  wav: "audio/wav",
  ogg: "audio/ogg",
  m4a: "audio/mp4",

  // Documents
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

  // Archives
  zip: "application/zip",
  rar: "application/vnd.rar",
  "7z": "application/x-7z-compressed",
  tar: "application/x-tar",
  gz: "application/gzip",
};


interface MimeResult {
  mimeType: MimeType;
  extension: string;
}

function testMimeType(fileUrl: string): MimeResult | null {
  try {
    const urlPath = new URL(fileUrl).pathname;
    const ext = urlPath.split('.').pop()?.toLowerCase();
    
    if (!ext) return null;

    const guessedMime = EXTENSION_TO_MIME[ext];
    if (!guessedMime) return null;

    const mimeEnum = allowedMimeTypes[guessedMime];
    if (!mimeEnum) return null;

    return { mimeType: mimeEnum, extension: ext };
  } catch (error) {
    console.error('Error parsing URL:', error);
    return null;
  }
}


const WithRes=(id)=>{return this.taskMaterialService.getTaskMaterialWithR(id)} 


   

    const blocked = await this.taskMaterialService.getUser(userid);
      if(blocked?.userID===userid){
      return {
        message:"only the client can modify a taskmat"

      }

    }else{ 
     
      
      const updatedTask = await this.taskMaterialService.updateTask(id,{
         taskMaterialName: body.taskMaterialName,
        
         updatedAt:new Date(),
         isTaskMaterialUpdated:true,

         userSenderID:userid
     
      })

      if(body.resource ){
       
        const old =await WithRes(id)
        
   if (old) {
      if (old && Array.isArray(old)) {
    for (const oldRes of old) {
      await this.azureStorageService.deleteFile(oldRes.resourceUrl);

      await this.StorageManagement.FreeStorage(
        userid,
        Number(oldRes.resourceSize),
        // subtract old size
      );
       
    }
    
     
  }await this.taskMaterialService.deleteResourcesByTaskMaterialID(id);
   
        const resources = Array.isArray(body.resource)
      ? body.resource
      : body.resource
      ? [body.resource]
      : [];
          const createdResources = [];

    for (const res of resources) {
      const mimeInfo = testMimeType(res.resourceUrl);
      if (!mimeInfo) {
        console.warn(`⚠️ Skipping resource with invalid MIME: ${res.resourceUrl}`);
        continue;
      }
      const canStore = await this.StorageManagement.CheckStorage(
        userid,
        Number(res.resourceSize),
      );
      if (!canStore) {
        throw new Error('Not enough storage space available for this upload');
      }
      
      
      const updatedRes =await this.taskMaterialService.createResource({
      resourceUrl:res.resourceUrl ,        
      resourceSize: res.resourceSize   ,       
      resourceMimeType: mimeInfo.mimeType  ,
      checkSum:"md5",
       uploadedByUserID:userid,
       uploadedAt:new Date(),
       taskMaterialID: id,     })
         
         await this.StorageManagement.UpdateStorage(userid,Number(res.resourceSize) );
      
      }
     
  }
  
  
  }  if(!await WithRes(id) && body.package ){
    const regx=/^(https?:\/\/)?([\w\-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
    if(regx.test(body.package.packageLink)){
      const updatedPckg=await this.taskMaterialService.updatePackage(id,{
         
      packageName:body.package.packageName,
      sentAt:new Date(),
      
      packageLink:body.package.packageLink,
      metadataPassword:body.package.metadataPassword,
      metadataText :body.package.metadataText,

      metadataExporationDate: body.package.metadataExporationDate,
      taskMaterialID:id 

      })
      return{
           message: 'TaskMaterial updated successfully',
           data:{updatedTask,updatedPckg}

      }
    }

    
  }



}
  
  //*updated  
  }
  // creating task material withoout update storage 
  // the contole of inputs must be in the frontend 
  //**************************************************************************************************************** */





  @Post(':userid')
  async createTaskMaterial(
    @Param('userid') userid:string,
    @Body()
     
    body: {
     
      taskMaterialName: string;
      taskMaterialWithResource: boolean;
      taskMaterialWithPackage: boolean;
      sentAt: Date;
      userSenderID:string;
       updatedAt:Date;
        isTaskMaterialUpdated:boolean,
    
      
      taskID: string;
      feedback?: {
        feedbackType: string;
        feedbackNote?: string;
        userReciverFirstName: string;
        userReciverLastName: string;
        userReciverID: string;
      };
      resource?:{
       resourceUrl:string;          
       resourceSize: string;          
       resourceMimeType: MimeType ;    
                
       uploadedByUserID:string;  
       uploadedAt:Date;
       taskMaterialID: string;           
      
      }[];
      package:{
      taskMaterialPackageID:string   ; 
      packageName:string;
      sentAt:Date;
      packageLink:string;
      metadataPassword:string;
      metadataText :string;
      metadataExporationDate: Date;
      taskMaterialID:string  

      }
      
       
    },
  ) {
   //Here start the mime type test and complete 
   // just set condition in new task ressource if mime type valid or not 

const allowedMimeTypes: Record<string, MimeType> = {
  // Images
  "image/jpeg": MimeType.JPEG,
  "image/jpg": MimeType.JPG,
  "image/png": MimeType.PNG,
  "image/gif": MimeType.GIF,
  "image/bmp": MimeType.BMP,
  "image/webp": MimeType.WEBP,

  // Videos
  "video/mp4": MimeType.MP4,
  "video/quicktime": MimeType.MOV,
  "video/x-msvideo": MimeType.AVI,
  "video/x-matroska": MimeType.MKV,
  "video/webm": MimeType.WEBM,

  // Audio
  "audio/mpeg": MimeType.MP3,
  "audio/wav": MimeType.WAV,
  "audio/ogg": MimeType.OGG,
  "audio/mp4": MimeType.M4A,

  // Documents
  "application/pdf": MimeType.PDF,
  "application/msword": MimeType.DOC,
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": MimeType.DOCX,
  "application/vnd.ms-excel": MimeType.XLS,
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": MimeType.XLSX,

  // Archives
  "application/zip": MimeType.ZIP,
  "application/vnd.rar": MimeType.RAR,
  "application/x-7z-compressed": MimeType.SEVEN_Z,
  "application/x-tar": MimeType.TAR,
  "application/gzip": MimeType.GZ,
};

// Extension → MIME type mapping
const EXTENSION_TO_MIME: Record<string, string> = {
  // Images
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  bmp: "image/bmp",
  webp: "image/webp",

  // Videos
  mp4: "video/mp4",
  mov: "video/quicktime",
  avi: "video/x-msvideo",
  mkv: "video/x-matroska",
  webm: "video/webm",

  // Audio
  mp3: "audio/mpeg",
  wav: "audio/wav",
  ogg: "audio/ogg",
  m4a: "audio/mp4",

  // Documents
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

  // Archives
  zip: "application/zip",
  rar: "application/vnd.rar",
  "7z": "application/x-7z-compressed",
  tar: "application/x-tar",
  gz: "application/gzip",
};


interface MimeResult {
  mimeType: MimeType;
  extension: string;
}

function testMimeType(fileUrl: string): MimeResult | null {
  try {
    const urlPath = new URL(fileUrl).pathname;
    const ext = urlPath.split('.').pop()?.toLowerCase();
    
    if (!ext) return null;

    const guessedMime = EXTENSION_TO_MIME[ext];
    if (!guessedMime) return null;

    const mimeEnum = allowedMimeTypes[guessedMime];
    if (!mimeEnum) return null;

    return { mimeType: mimeEnum, extension: ext };
  } catch (error) {
    console.error('Error parsing URL:', error);
    return null;
  }
}

 const blocked = await this.taskMaterialService.getUser(userid);
      if(blocked?.userID===userid){
      return {
        message:"only the client can create a taskmat"

      }}else{

    const newTaskMaterial = await this.taskMaterialService.createTask({
      taskMaterialName: body.taskMaterialName,
      taskMaterialWithResource: body.taskMaterialWithResource,
      taskMaterialWithPackage: body.taskMaterialWithPackage,
      sentAt: new Date(),
      updatedAt:new Date(),
      isTaskMaterialUpdated:false,
      
      
      taskID: body.taskID,
     

      
      
      
      
      userSenderID:userid

    });
    let reso=""
   
  
; 

    if( newTaskMaterial.taskMaterialWithResource && body.resource){
  
   
     
     
     
        const resources = Array.isArray(body.resource)
      ? body.resource
      : body.resource
      ? [body.resource]
      : [];
          const createdResources = [];

    for (const res of resources) {
      const mimeInfo = testMimeType(res.resourceUrl);

      if (!mimeInfo) {
        console.warn(`Skipping resource with invalid MIME: ${res.resourceUrl}`);
        continue;
      }
      const canStore = await this.StorageManagement.CheckStorage(
        userid,
        Number(res.resourceSize),
      );
      if (!canStore) {
        throw new Error('Not enough storage space available for this upload');
      }
  
       const newTaskResources =await this.taskMaterialService.createResource({
      
       resourceUrl:res.resourceUrl,         
       resourceSize: res.resourceSize,          
       resourceMimeType: mimeInfo?.mimeType,    
       checkSum:"md5",          
       uploadedByUserID:userid,
       uploadedAt:new Date(),
       taskMaterialID: newTaskMaterial.taskMaterialID 

    }) 
    await this.StorageManagement.UpdateStorage(
        userid,
        Number(res.resourceSize),
      );
    
   
     }
     
  
     
    }



      let pack="" 
      if (body.package && newTaskMaterial.taskMaterialWithPackage &&!body.resource ) {
         const regxforlink=/^(https?:\/\/)?([\w\-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/
      if(regxforlink.test(body.package.packageLink)){
   
      
      const newPackage=await this.taskMaterialService.createPackage({
      taskMaterialPackageID:body.package.taskMaterialPackageID,
      packageName:body.package.packageName,

      sentAt : body.package.sentAt,
      metadataExporationDate :body.package.metadataExporationDate,
      packageLink:body.package.packageLink,
      metadataPassword:body.package.metadataPassword,
      metadataText :body.package.metadataText,
     
      taskMaterialID:newTaskMaterial.taskMaterialID
      })
      pack="created with package"

      return newPackage

      }else{
      this.taskMaterialService.deleteTaskMaterial(newTaskMaterial.taskMaterialID)
      throw new Error("please inter a valid link")
    }
    }
    return newTaskMaterial 
  ? {
      message: "created with success",
      status: `${pack} ${reso} `,
      taskMaterial: newTaskMaterial,
      url: `taskmaterial/${newTaskMaterial.userSenderID}/${newTaskMaterial.taskMaterialID}`,
    }
  : { message: "error" };
   

  








       
    }
}
// Here the Delete with update the storage  a dm1
//************************************************************************************************ */
@Delete(':userid/:id')
async RemoveTaskMaterial(@Param('id') id:string, @Param('userid') userid:string ){
  const blocked = await this.taskMaterialService.getUser(userid);
     const resources = await this.taskMaterialService.getTaskMaterialWithR(id);
    if(blocked?.userID===userid){
      return {
        message:"only the client can delete a taskmat"

      }}
      
      
      
       if (resources && resources.length > 0) {
    for (const res of resources) {
      await this.azureStorageService.deleteFile(res.resourceUrl);
      await this.StorageManagement.FreeStorage(userid, Number(res.resourceSize));
    }
  }
   await this.taskMaterialService.deleteTaskMaterial(id);
      return{
        message:`delete with success i azure and db ${id} `
      }
      
  
}


//************************************************************************************************ */
// here the feedback controller
@Get("feedback/:id")
async GetAllFeedbacks(@Param('id') id:string) {
  const feedbacks = await this.taskMaterialService.GetFeedBacks(id);
  
  return {
    feedbacks
  };
}


@Post('feedback/:userid/:id')
async SetFeedback(@Param('userid') userid:string,@Param('id') id:string,@Body() 
Body:{
  feedback: {
        feedbackType: FeedBackType;
        feedbackNote?: string;
       
      };

}){
   const isCollaborator = await this.taskMaterialService.getUser(userid);
   if (isCollaborator){
     const createdFeedback = await this.taskMaterialService.SetFeed(userid, id, {
    feedbackType: Body.feedback.feedbackType,
    feedbackNote: Body.feedback.feedbackNote,
  }); 
   return {
    message: "Feedback created successfully",
    feedback: createdFeedback,
  };
}else {
  return {
    message: "Feedback not sent: user is not a collaborator",
  };}

   
 
  



 
  


}
@Put('feedback/:userid/:id')
async ModifierFeedBack(@Param('userid') userid:string,@Param('id') id:string,@Body() 
Body:{
  feedback: {
        feedbackType: FeedBackType;
        feedbackNote?: string;
       
      };}){
  const isCollaborator=await this.taskMaterialService.getUser(userid);
  if(isCollaborator){
    return this.taskMaterialService.UpdateFeed(userid,id,{
      feedbackType:Body.feedback.feedbackType,
      feedbackNote:Body.feedback.feedbackNote
    })
  
  

  }else{
    return {
      message:"feedback not UPDATED "
    }

  }

        



}
@Delete('feedback/:userid/:id')
async DeleteFeedBack(@Param('userid') userid:string,@Param('id') id:string){
    const isCollaborator=await this.taskMaterialService.getUser(userid);
    if(isCollaborator){
    return this.taskMaterialService.deleteFeedBack(userid,id)
                }else{
                  return {message:"not deleted "}
                }
}


































}
