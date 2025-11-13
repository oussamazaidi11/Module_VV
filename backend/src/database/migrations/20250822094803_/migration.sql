/*
  Warnings:

  - You are about to drop the `_CertificationToCompany` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CertificationToCompany" DROP CONSTRAINT "_CertificationToCompany_A_fkey";

-- DropForeignKey
ALTER TABLE "_CertificationToCompany" DROP CONSTRAINT "_CertificationToCompany_B_fkey";

-- AlterTable
ALTER TABLE "ServiceCompany" ADD COLUMN     "isKeyService" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "_CertificationToCompany";

-- CreateTable
CREATE TABLE "CertificationCompany" (
    "companyID" TEXT NOT NULL,
    "certificationID" TEXT NOT NULL,
    "isKeyCertification" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CertificationCompany_pkey" PRIMARY KEY ("companyID","certificationID")
);

-- AddForeignKey
ALTER TABLE "CertificationCompany" ADD CONSTRAINT "CertificationCompany_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "Company"("companyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificationCompany" ADD CONSTRAINT "CertificationCompany_certificationID_fkey" FOREIGN KEY ("certificationID") REFERENCES "Certification"("certificationID") ON DELETE RESTRICT ON UPDATE CASCADE;
