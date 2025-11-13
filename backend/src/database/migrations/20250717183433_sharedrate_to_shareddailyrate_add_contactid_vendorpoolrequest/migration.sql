/*
  Warnings:

  - You are about to drop the `SharedRate` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `contactID` to the `VendorPoolRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SharedRate" DROP CONSTRAINT "SharedRate_ownerCompanyID_fkey";

-- DropForeignKey
ALTER TABLE "SharedRate" DROP CONSTRAINT "SharedRate_serviceID_fkey";

-- AlterTable
ALTER TABLE "VendorPoolRequest" ADD COLUMN     "contactID" TEXT NOT NULL;

-- DropTable
DROP TABLE "SharedRate";

-- CreateTable
CREATE TABLE "SharedDailyRate" (
    "serviceID" TEXT NOT NULL,
    "ownerCompanyID" TEXT NOT NULL,
    "targetCompanyID" TEXT NOT NULL,
    "dailyRateShared" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "SharedDailyRate_pkey" PRIMARY KEY ("serviceID","ownerCompanyID","targetCompanyID")
);

-- AddForeignKey
ALTER TABLE "SharedDailyRate" ADD CONSTRAINT "SharedDailyRate_serviceID_fkey" FOREIGN KEY ("serviceID") REFERENCES "Service"("serviceID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedDailyRate" ADD CONSTRAINT "SharedDailyRate_ownerCompanyID_fkey" FOREIGN KEY ("ownerCompanyID") REFERENCES "Company"("companyID") ON DELETE RESTRICT ON UPDATE CASCADE;
