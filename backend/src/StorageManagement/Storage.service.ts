import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
@Injectable()
export class StorageManagement{
    constructor(private readonly prisma:DatabaseService){}
 async  getUserCompany(userid:string){
        const user=await this.prisma.user.findUnique({
        where:{id:userid}

    })
    if (!user?.companyID) {
    return null;
  }
    return this.prisma.companyStorage.findUnique({
        where:{companyID:user?.companyID?.toString()}
    })

    }

    async CheckStorage(userid:string,size:number)
    {
    
    const company=await this.getUserCompany(userid)
     if (!company) {
    throw new Error("Company not found for this user");
        }

      return Number(company.remainingSpace) >= size;


    }
    async UpdateStorage(userid: string, size: number) {
     const company = await this.getUserCompany(userid);

      if (!company) {
           throw new Error("Company not found for this user");
                   }

      if (Number(company.remainingSpace) < size) {
             throw new Error("Not enough storage space available");
                    }
 
        return this.prisma.companyStorage.update({
                 where: { companyStorageID: company.companyStorageID },
                data: {
                remainingSpace: new Decimal(company.remainingSpace).minus(new Decimal(size)),
                totalResourcesSize :new Decimal(company.totalResourcesSize).plus(new Decimal(size)),
                totalUsedSpace:new Decimal(company.totalUsedSpace).plus(new Decimal(size))

                },
  });
}
async UpdateStorageWithUp(userid:string,oldsize:number,size:number){
    const company = await this.getUserCompany(userid);

      if (!company) {
           throw new Error("Company not found for this user");
                   }

      if (Number(company.remainingSpace) < size) {
             throw new Error("Not enough storage space available");
                    }
              return this.prisma.companyStorage.update({
                 where: { companyStorageID: company.companyStorageID },
                data: {
                remainingSpace: new Decimal(company.remainingSpace).minus(new Decimal(size)).plus(new Decimal(oldsize)),
                totalResourcesSize :new Decimal(company.totalResourcesSize).minus(new Decimal(oldsize)).plus(new Decimal(size)),
                totalUsedSpace:new Decimal(company.totalUsedSpace).plus(new Decimal(size)).minus(new Decimal(oldsize))

                },
  });

}
            async FreeStorage(userid:string,size:number){
                 const company = await this.getUserCompany(userid);
                  if (!company) {
              throw new Error("Company not found for this user");
                   }
                 return this.prisma.companyStorage.updateMany({
                 where: { companyStorageID: company.companyStorageID },
                data: {
                remainingSpace: new Decimal(company.remainingSpace).plus(new Decimal(size)),
                totalResourcesSize :new Decimal(company.totalResourcesSize).minus(new Decimal(size)),
                totalUsedSpace:new Decimal(company.totalUsedSpace).minus(new Decimal(size))

                },})

            


            }
            


        }

    













