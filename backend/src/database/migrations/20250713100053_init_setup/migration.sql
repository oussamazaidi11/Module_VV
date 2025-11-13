-- CreateEnum
CREATE TYPE "TimeZone" AS ENUM ('UTC_MINUS_12_00', 'UTC_MINUS_11_00', 'UTC_MINUS_10_00', 'UTC_MINUS_09_30', 'UTC_MINUS_09_00', 'UTC_MINUS_08_00', 'UTC_MINUS_07_00', 'UTC_MINUS_06_00', 'UTC_MINUS_05_00', 'UTC_MINUS_04_30', 'UTC_MINUS_04_00', 'UTC_MINUS_03_30', 'UTC_MINUS_03_00', 'UTC_MINUS_02_00', 'UTC_MINUS_01_00', 'UTC_PLUS_00_00', 'UTC_PLUS_01_00', 'UTC_PLUS_02_00', 'UTC_PLUS_03_00', 'UTC_PLUS_03_30', 'UTC_PLUS_04_00', 'UTC_PLUS_04_30', 'UTC_PLUS_05_00', 'UTC_PLUS_05_30', 'UTC_PLUS_05_45', 'UTC_PLUS_06_00', 'UTC_PLUS_06_30', 'UTC_PLUS_07_00', 'UTC_PLUS_08_00', 'UTC_PLUS_08_45', 'UTC_PLUS_09_00', 'UTC_PLUS_09_30', 'UTC_PLUS_10_00', 'UTC_PLUS_10_30', 'UTC_PLUS_11_00', 'UTC_PLUS_12_00', 'UTC_PLUS_12_45', 'UTC_PLUS_13_00', 'UTC_PLUS_14_00');

-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'IGNORED', 'EXPIRED');

-- CreateTable
CREATE TABLE "Company" (
    "companyID" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyWorkspaceName" TEXT NOT NULL,
    "companyAddress" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "companyRegistrationNumber" TEXT NOT NULL,
    "companyPhoneNumber" TEXT NOT NULL,
    "companyTeamSize" BIGINT NOT NULL,
    "companyTimeZone" "TimeZone" NOT NULL,
    "companyWebsite" TEXT NOT NULL,
    "companyPitch" TEXT NOT NULL,
    "companyLogoURL" TEXT NOT NULL,
    "isCertified" BOOLEAN NOT NULL,
    "certificationsIsPublic" BOOLEAN NOT NULL,
    "isIndexed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("companyID")
);

-- CreateTable
CREATE TABLE "Industry" (
    "industryID" TEXT NOT NULL,
    "industryName" TEXT NOT NULL,

    CONSTRAINT "Industry_pkey" PRIMARY KEY ("industryID")
);

-- CreateTable
CREATE TABLE "Certification" (
    "certificationID" TEXT NOT NULL,
    "certificationName" TEXT NOT NULL,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("certificationID")
);

-- CreateTable
CREATE TABLE "User" (
    "userID" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatarURL" TEXT NOT NULL,
    "companyID" TEXT,
    "roleID" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Tool" (
    "toolID" TEXT NOT NULL,
    "toolName" TEXT NOT NULL,
    "isAddedByCompany" BOOLEAN NOT NULL DEFAULT false,
    "addedByCompanyID" TEXT,
    "industryName" TEXT NOT NULL,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("toolID")
);

-- CreateTable
CREATE TABLE "Service" (
    "serviceID" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "isAddedByCompany" BOOLEAN NOT NULL DEFAULT false,
    "addedByCompanyID" TEXT,
    "defaultDescription" TEXT,
    "industryName" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("serviceID")
);

-- CreateTable
CREATE TABLE "ServiceCompany" (
    "companyID" TEXT NOT NULL,
    "serviceID" TEXT NOT NULL,
    "customDescription" TEXT NOT NULL,
    "hasPublicRate" BOOLEAN NOT NULL DEFAULT true,
    "publicDailyRate" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "ServiceCompany_pkey" PRIMARY KEY ("companyID","serviceID")
);

-- CreateTable
CREATE TABLE "SharedRate" (
    "serviceID" TEXT NOT NULL,
    "ownerCompanyID" TEXT NOT NULL,
    "targetCompanyID" TEXT NOT NULL,
    "dailyRateShared" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "SharedRate_pkey" PRIMARY KEY ("serviceID","ownerCompanyID","targetCompanyID")
);

-- CreateTable
CREATE TABLE "Contact" (
    "contactID" TEXT NOT NULL,
    "contactCompanyID" TEXT NOT NULL,
    "addedByOutgoingInvitation" BOOLEAN NOT NULL,
    "addedByIncomingInvitation" BOOLEAN NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL,
    "invitationID" TEXT NOT NULL,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "vendorPoolRequestID" TEXT,
    "companyID" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("contactID")
);

-- CreateTable
CREATE TABLE "VendorPoolRequest" (
    "vendorPoolRequestID" TEXT NOT NULL,
    "requestedByUserID" TEXT NOT NULL,
    "requestedAt" TIMESTAMP(3) NOT NULL,
    "approvedByUserID" TEXT NOT NULL,
    "approvedAt" TIMESTAMP(3) NOT NULL,
    "companyID" TEXT NOT NULL,

    CONSTRAINT "VendorPoolRequest_pkey" PRIMARY KEY ("vendorPoolRequestID")
);

-- CreateTable
CREATE TABLE "ConnectionInvitation" (
    "connectionInvitationID" TEXT NOT NULL,
    "targetCompanyID" TEXT NOT NULL,
    "status" "InvitationStatus" NOT NULL,
    "sendAt" TIMESTAMP(3) NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "companyID" TEXT NOT NULL,

    CONSTRAINT "ConnectionInvitation_pkey" PRIMARY KEY ("connectionInvitationID")
);

-- CreateTable
CREATE TABLE "Role" (
    "roleID" TEXT NOT NULL,
    "roleName" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("roleID")
);

-- CreateTable
CREATE TABLE "Permission" (
    "permissionID" TEXT NOT NULL,
    "permissionName" TEXT NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("permissionID")
);

-- CreateTable
CREATE TABLE "_CompanyToTool" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CompanyToTool_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CompanyToIndustry" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CompanyToIndustry_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CertificationToCompany" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CertificationToCompany_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_PermissionToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PermissionToRole_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyName_key" ON "Company"("companyName");

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyWorkspaceName_key" ON "Company"("companyWorkspaceName");

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyAddress_key" ON "Company"("companyAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyEmail_key" ON "Company"("companyEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyRegistrationNumber_key" ON "Company"("companyRegistrationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyPhoneNumber_key" ON "Company"("companyPhoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Industry_industryName_key" ON "Industry"("industryName");

-- CreateIndex
CREATE UNIQUE INDEX "Certification_certificationName_key" ON "Certification"("certificationName");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tool_toolName_key" ON "Tool"("toolName");

-- CreateIndex
CREATE UNIQUE INDEX "Service_serviceName_key" ON "Service"("serviceName");

-- CreateIndex
CREATE INDEX "_CompanyToTool_B_index" ON "_CompanyToTool"("B");

-- CreateIndex
CREATE INDEX "_CompanyToIndustry_B_index" ON "_CompanyToIndustry"("B");

-- CreateIndex
CREATE INDEX "_CertificationToCompany_B_index" ON "_CertificationToCompany"("B");

-- CreateIndex
CREATE INDEX "_PermissionToRole_B_index" ON "_PermissionToRole"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "Company"("companyID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleID_fkey" FOREIGN KEY ("roleID") REFERENCES "Role"("roleID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceCompany" ADD CONSTRAINT "ServiceCompany_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "Company"("companyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceCompany" ADD CONSTRAINT "ServiceCompany_serviceID_fkey" FOREIGN KEY ("serviceID") REFERENCES "Service"("serviceID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedRate" ADD CONSTRAINT "SharedRate_serviceID_fkey" FOREIGN KEY ("serviceID") REFERENCES "Service"("serviceID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedRate" ADD CONSTRAINT "SharedRate_ownerCompanyID_fkey" FOREIGN KEY ("ownerCompanyID") REFERENCES "Company"("companyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "Company"("companyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorPoolRequest" ADD CONSTRAINT "VendorPoolRequest_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "Company"("companyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConnectionInvitation" ADD CONSTRAINT "ConnectionInvitation_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "Company"("companyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToTool" ADD CONSTRAINT "_CompanyToTool_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("companyID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToTool" ADD CONSTRAINT "_CompanyToTool_B_fkey" FOREIGN KEY ("B") REFERENCES "Tool"("toolID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToIndustry" ADD CONSTRAINT "_CompanyToIndustry_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("companyID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToIndustry" ADD CONSTRAINT "_CompanyToIndustry_B_fkey" FOREIGN KEY ("B") REFERENCES "Industry"("industryID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CertificationToCompany" ADD CONSTRAINT "_CertificationToCompany_A_fkey" FOREIGN KEY ("A") REFERENCES "Certification"("certificationID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CertificationToCompany" ADD CONSTRAINT "_CertificationToCompany_B_fkey" FOREIGN KEY ("B") REFERENCES "Company"("companyID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD CONSTRAINT "_PermissionToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Permission"("permissionID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD CONSTRAINT "_PermissionToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("roleID") ON DELETE CASCADE ON UPDATE CASCADE;
