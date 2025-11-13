import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma, MimeType, FeedBackType } from '@prisma/client';

@Injectable()
export class VersionService {
  constructor(private readonly prisma: DatabaseService) {}

  // ======== Feedback ========
  async GetFeedBacks(id:string) {
    const data = await this.prisma.versionFeedback.findMany(
      {
        where:{versionID:id}
      }
    );
    return data;
  }


  async setFeedback(userid: string, versionID: string, feedback: {
    feedbackType: FeedBackType;
    feedbackNote?: string;
  }) {
    const version = await this.prisma.verison.findUnique({ where: { versionID } });
    const usercollab = await this.prisma.collaboratorUser.findFirst({ where: { userID: userid } });
    const user=await this.prisma.user.findUnique({where:{id:userid}})


    if (version && !usercollab) {
      return this.prisma.versionFeedback.upsert({
        where: { versionID: version.versionID },
        update: {
          feedbackType: feedback.feedbackType,
          feedbackNote: feedback.feedbackNote || null,
          updatedAt: new Date(),
        },
        create: {
          versionID: version.versionID,
          feedbackType: feedback.feedbackType,
          feedbackNote: feedback.feedbackNote || null,
          isUpdated: false,
          userReciverFirstName: user?.firstName||"",
          userReciverLastName: user?.lastName||"",
          userReciverAvatarUrl: user?.avatarURL?? null,
          userReciverID:userid,
          createdAt: new Date(),
        },
      });
    }
  }

  async updateFeedback(userid: string, versionID: string, feedback: {
    feedbackType: FeedBackType;
    feedbackNote?: string;
  }) {
    const feed = await this.prisma.versionFeedback.findUnique({ where: { versionID } });

 

    if (feed) {
      return this.prisma.versionFeedback.update({
        where: { versionFeedbackID: feed.versionFeedbackID },
        data: {
          isUpdated: true,
          feedbackType: feedback.feedbackType,
          feedbackNote: feedback.feedbackNote || null,
          updatedAt: new Date(),
        },
      });
    }
  }

  async deleteFeedback(userid: string, versionID: string) {
    const feed = await this.prisma.versionFeedback.findUnique({ where: { versionID } });

      if(feed){
      return this.prisma.versionFeedback.delete({
        where: { versionFeedbackID: feed.versionFeedbackID },
      });
    }
  }

  // ======== Version CRUD ========

  async createVersion(data: {
    versionName: string;
    versionWithResources: boolean;
    versionWithPackage: boolean;

    updatedAt:Date;
    isVersionUpdated:boolean;
    sendAt: Date;
    userSenderID: string;
    taskID: string;
  }) {
 


   return this.prisma.verison.create({ data });


   
  }
  async GetVersionWithR(id:string){
     return this.prisma.versionResource.findMany({
      where:{versionID:id}
  })}

  async updateVersion(id: string, data: {
    versionName?: string;
 
    userSenderID: string;
    updatedAt:Date,
    isVersionUpdated:boolean,
  }) {
    return this.prisma.verison.updateMany({
      where: { versionID: id },
      data,
    });
  }
  async deleteResourcesByVersionID(versionID: string) {
  return this.prisma.versionResource.deleteMany({
    where: { versionID: versionID },
  });
}


  async deleteVersion(id: string) {
    const version = await this.prisma.verison.findUnique({ where: { versionID: id } });
    if (!version) {
      throw new Error('Version does not exist');
    }

    if (version.versionWithResources) {
      return this.prisma.$transaction([
        this.prisma.verison.deleteMany({ where: { versionID: id } }),
        this.prisma.versionResource.deleteMany({ where: { versionID: id } }),
      ]);
    } else if (version.versionWithPackage) {
      return this.prisma.$transaction([
        this.prisma.verison.deleteMany({ where: { versionID: id } }),
        this.prisma.versionPackage.deleteMany({ where: { versionID: id } }),
      ]);
    }
  }

  async getAll() {
    return this.prisma.verison.findMany({
      where: {
        OR: [
          { versionPackages: { isNot: null } },
          { versionResources: { some: {} } },
        ],
      },
      include: {
        versionPackages: true,
        versionResources: true,
        feedback: true,
        task: true,
      },
      orderBy:{
        updatedAt:'desc'
      }
    });
  }

  // ======== Packages ========

  async createPackage(data: {
    versionPackageID: string;
    packageName: string;
    sentAt: Date;
    packageLink: string;
    metadataPassword?: string;
    metadataText?: string;
    metadataExporationDate?: Date;
    versionID: string;
  }) {
    return this.prisma.versionPackage.create({ data });
  }

  async updatePackage(versionID: string, data: {
    packageName: string;
    sentAt: Date;
    packageLink: string;
    metadataPassword?: string;
    metadataText?: string;
    metadataExporationDate?: Date;
    versionID: string;
  }) {
    return this.prisma.versionPackage.update({
      where: { versionID },
      data,
    });
  }
   async  getUser(id:string){
    return this.prisma.collaboratorUser.findFirst({where:{userID:id}})
  }

  // ======== Resources ========

  async createResource(data: {
    resourceUrl: string;
    resourceSize: Prisma.Decimal;
    resourceMimeType: MimeType;
    checkSum: string;
    uploadedByUserID: string;
    uploadedAt: Date;
    versionID: string;
  }) {
    return this.prisma.versionResource.create({ data });
  }

  async updateResource(id: string, data: {
    resourceUrl: string;
    resourceSize: Prisma.Decimal;
    resourceMimeType: MimeType;
    checkSum: string;
    uploadedByUserID: string;
    uploadedAt: Date;
    versionID: string;
  }) {
    return this.prisma.versionResource.updateMany({
      where: { versionID:id },
      data,
    });
  }
}
