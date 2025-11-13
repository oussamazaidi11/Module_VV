import { Controller, Post, Get, Put, Param, Body, Delete } from '@nestjs/common';
import { VersionService } from './Version.service';
import { Prisma, MimeType, FeedBackType } from '@prisma/client';
import { StorageManagement } from 'src/StorageManagement/Storage.service';
import { AzureStorageService } from 'src/AzureStorageModule/azureStorage.service';
import { error } from 'console';

@Controller('version')
export class VersionController {

  constructor(private readonly versionService: VersionService,private readonly StorageManagement :StorageManagement,private readonly azureStorageService: AzureStorageService) {}

  // ======== GET all versions ========
  @Get()
  getAll() {
    return this.versionService.getAll();
  }

  @Get(':userid')
  async checkUserRole(@Param('userid') id: string) {
    const collab = await this.versionService.getUser(id);
    if(collab)
      {
        return {role:"COLLABOR"}

      }
      return{role:"CLIENT"}
  }

  // ======== UPDATE VERSION ========
  @Put(':userid/:id')
  async updateVersion(
    @Param('id') id: string,
    @Param('userid') userid: string,
    @Body()
    body: {
      versionName: string;
      sendAt: Date;
      userSenderID: string;
      updatedAt:Date,
      isVersionUpdated:boolean,
      taskID: string;
      resource?: {
        resourceUrl: string;
        resourceSize: Prisma.Decimal;
        resourceMimeType: MimeType;
        uploadedByUserID: string;
        uploadedAt: Date;
        versionID: string;
      };
      package?: {
        packageName: string;
        sentAt: Date;
        packageLink: string;
        metadataPassword?: string;
        metadataText?: string;
        metadataExporationDate?: Date;
        versionID: string;
      };
    },
  ) {
    const allowed = await this.versionService.getUser(userid);
    const WithRes=(id)=>{return this.versionService.GetVersionWithR(id)}
    if(allowed){

    const updatedVersion = await this.versionService.updateVersion(id, {
      versionName: body.versionName,
    
      userSenderID: userid,
      updatedAt:new Date(),
      isVersionUpdated:true,
    });
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
    // Update Resource if exists
    if (body.resource) {

         const old =await WithRes (id)
        
        if(old){
          if(old&& Array.isArray(old)){
           for (const oldRes of old) {
      await this.azureStorageService.deleteFile(oldRes.resourceUrl);
      await this.StorageManagement.FreeStorage(userid, Number(oldRes.resourceSize));
    }}await this.versionService.deleteResourcesByVersionID(id);

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
      const updatedRes = await this.versionService.createResource(
        
        {
          resourceUrl: res.resourceUrl,
          resourceSize: res.resourceSize,
          resourceMimeType:mimeInfo.mimeType,
          checkSum: 'md5',
          uploadedByUserID: userid,
          uploadedAt: new Date(),
          versionID: id,
        },
      );
       await this.StorageManagement.UpdateStorage(userid,Number(res.resourceSize) );}
     


      
  }
    // Update Package if exists
    if (body.package) {
      const regx = /^(https?:\/\/)?([\w\-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
      if (regx.test(body.package.packageLink)) {
        const updatedPack = await this.versionService.updatePackage(id, {
          packageName: body.package.packageName,
          sentAt: new Date(),
          packageLink: body.package.packageLink,
          metadataPassword: body.package.metadataPassword,
          metadataText: body.package.metadataText,
          metadataExporationDate: body.package.metadataExporationDate,
          versionID: id,
        });
        return { message: 'Version updated', data: { updatedVersion, updatedPack } };
      }
    }

    return { message: 'Version updated', data: updatedVersion };
  }
}}

  // ======== CREATE VERSION ========
  @Post(':userid')
  async createVersion(
    @Param('userid') userid: string,
    @Body()
    body: {
      versionName: string;
      versionWithResources: boolean;
      versionWithPackage: boolean;
      sendAt: Date;
      updatedAt:Date;
      isVersionUpdated:boolean
      userSenderID: string;
      taskID: string;
      resource: {
        resourceUrl: string;
        resourceSize: Prisma.Decimal;
        resourceMimeType: MimeType;
        uploadedByUserID: string;
        uploadedAt: Date;
        versionID: string;
      }[];
      package?: {
        versionPackageID: string;
        packageName: string;
        sentAt: Date;
        packageLink: string;
        metadataPassword?: string;
        metadataText?: string;
        metadataExporationDate?: Date;
        versionID: string;
      };
    },
  ) {
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
}  const allowed = await this.versionService.getUser(userid);
    if(allowed){
    const newVersion = await this.versionService.createVersion({
      versionName: body.versionName,
      versionWithResources: body.versionWithResources,
      versionWithPackage: body.versionWithPackage,
       updatedAt:new Date(),
      sendAt: new Date(),
     
      isVersionUpdated:false,
      userSenderID: userid,
      taskID: body.taskID,
    });

    // Create Resource
    if (body.resource  && newVersion.versionWithResources) {
        const resources = Array.isArray(body.resource) ? body.resource : [body.resource];

    for (const res of resources) {
      const mimeInfo = testMimeType(res.resourceUrl);
      if (!mimeInfo) {
        console.warn(`Skipping resource with invalid MIME: ${res.resourceUrl}`);
        continue;
      }

      const canStore = await this.StorageManagement.CheckStorage(userid, Number(res.resourceSize));
      if (!canStore) throw new Error("Not enough storage space available for this upload");

      await this.versionService.createResource({
        resourceUrl: res.resourceUrl,
        resourceSize: res.resourceSize,
        resourceMimeType: mimeInfo.mimeType,
        checkSum: 'md5',
        uploadedByUserID: userid,
        uploadedAt: new Date(),
        versionID: newVersion.versionID,
      });

    await this.StorageManagement.UpdateStorage(userid,Number(res.resourceSize) );
    }}

    // Create Package
    if (body.package && newVersion.versionWithPackage) {
      const regxforlink = /^(https?:\/\/)?([\w\-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
      if (regxforlink.test(body.package.packageLink)) {
        await this.versionService.createPackage({
          versionPackageID: body.package.versionPackageID,
          packageName: body.package.packageName,
          sentAt: body.package.sentAt,
          metadataExporationDate: body.package.metadataExporationDate,
          packageLink: body.package.packageLink,
          metadataPassword: body.package.metadataPassword,
          metadataText: body.package.metadataText,
          versionID: newVersion.versionID,
        });
        
      }else{
        await this.versionService.deleteVersion(newVersion.versionID)
         throw new Error("Enter a valid link");
      }
      
       


      
     
    }
    

    return {
      message: 'Version created successfully',
      version: newVersion,
      url: `version/${newVersion.userSenderID}/${newVersion.versionID}`,
    };}else{
        return{message:"only the collaborator can create the version"}
    }
  }

 
  @Delete(':userid/:id')
  async removeVersion(
    @Param('id') id: string,
    @Param('userid') userid: string,
  ) {
     const allowed = await this.versionService.getUser(userid);
     const resources = await this.versionService.GetVersionWithR(id);
    if(allowed){
        
        if (resources && resources.length > 0) {
    for (const res of resources) {
      await this.azureStorageService.deleteFile(res.resourceUrl);
      await this.StorageManagement.FreeStorage(userid, Number(res.resourceSize));
    }
     
  }
             await this.versionService.deleteVersion(id);
    }
    return{
      message:'deleted with success'
    }
   
  }

  // ======== feeeddddbacks  ========
  @Get("feedback/:id")
async GetAllFeedbacks(@Param('id') id:string) {
  const feedbacks = await this.versionService.GetFeedBacks(id);
  
  return {
    feedbacks
  };
}

  @Post('feedback/:userid/:id')
  async setFeedback(
    @Param('userid') userid: string,
    @Param('id') id: string,
    @Body()
    body: {
      feedback: {
        feedbackType: FeedBackType;
        feedbackNote?: string;
      };
    },
  ) {
     const allowed = await this.versionService.getUser(userid);
     if(!allowed){
     const createdFeedback = await this.versionService.setFeedback(userid, id, {
      feedbackType: body.feedback.feedbackType,
      feedbackNote: body.feedback.feedbackNote,
    });
    return { message: 'Feedback created', feedback: createdFeedback };




     }
   
  }

  @Put('feedback/:userid/:id')
  async updateFeedback(
    @Param('userid') userid: string,
    @Param('id') id: string,
    @Body()
    body: {
      feedback: {
        feedbackType: FeedBackType;
        feedbackNote?: string;
      };
    },
  ) {
     const allowed = await this.versionService.getUser(userid);
     if(!allowed){
    return this.versionService.updateFeedback(userid, id, {
      feedbackType: body.feedback.feedbackType,
      feedbackNote: body.feedback.feedbackNote,
    });}
  }

  @Delete('feedback/:userid/:id')
  async deleteFeedback(
    @Param('userid') userid: string,
    @Param('id') id: string,
  ) {
      
     const allowed = await this.versionService.getUser(userid);
     if(!allowed){
      
    return this.versionService.deleteFeedback(userid, id);}
  }
}
