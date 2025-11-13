/*
  Warnings:

  - You are about to drop the column `currentSubscriptionStatus` on the `Company` table. All the data in the column will be lost.
  - The `companyTimeZone` column on the `Company` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `currentSubscriptionStatus` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `CompanyPayment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CompanySubscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPayment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSubscription` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `avatarURL` to the `ChatUser` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."StorageStatus" AS ENUM ('EMPTY', 'LOW', 'MEDIUM', 'NEAR_FULL', 'FULL');

-- CreateEnum
CREATE TYPE "public"."EntityType" AS ENUM ('PROJECT', 'TASK');

-- CreateEnum
CREATE TYPE "public"."CollaborationInvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'NOT_AVAILABLE', 'EXPIRED');

-- CreateEnum
CREATE TYPE "public"."MimeType" AS ENUM ('JPG', 'JPEG', 'PNG', 'GIF', 'BMP', 'WEBP', 'MP4', 'MOV', 'AVI', 'MKV', 'WEBM', 'MP3', 'WAV', 'OGG', 'M4A', 'PDF', 'DOC', 'DOCX', 'XLS', 'XLSX', 'ZIP', 'RAR', 'SEVEN_Z', 'TAR', 'GZ');

-- CreateEnum
CREATE TYPE "public"."CustomAttributeType" AS ENUM ('TEXT', 'DATE', 'INTEGER', 'DECIMAL', 'URL', 'LONGTEXT', 'AUDIO', 'IMAGE', 'VIDEO', 'DOCUMENT', 'ARCHIVE');

-- CreateEnum
CREATE TYPE "public"."TaskStatus" AS ENUM ('READY_TO_START', 'IN_PROGRESS', 'ON_HOLD', 'OMITTED', 'AWAITING_MATERIAL', 'DELIVERED', 'KICKBACK', 'APPROVED', 'COMPLETED', 'TBC');

-- CreateEnum
CREATE TYPE "public"."TaskPriority" AS ENUM ('NONE', 'LOW', 'MEDIUM', 'HIGH', 'URGENT', 'CRITICAL');

-- CreateEnum
CREATE TYPE "public"."TaskState" AS ENUM ('TO_ASSIGN', 'ASSIGNED', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "public"."FeedBackType" AS ENUM ('PROCESSED_SUCCESSFULLY', 'MISSING_DATA', 'REMARK');

-- CreateEnum
CREATE TYPE "public"."NoteAuthorType" AS ENUM ('CLIENT', 'COLLABORATOR');

-- DropForeignKey
ALTER TABLE "public"."CompanyPayment" DROP CONSTRAINT "CompanyPayment_companySubscriptionID_fkey";

-- DropForeignKey
ALTER TABLE "public"."CompanySubscription" DROP CONSTRAINT "CompanySubscription_companyID_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserPayment" DROP CONSTRAINT "UserPayment_userSubscriptionID_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserSubscription" DROP CONSTRAINT "UserSubscription_id_fkey";

-- AlterTable
ALTER TABLE "public"."ChatUser" ADD COLUMN     "avatarURL" TEXT NOT NULL,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."Company" DROP COLUMN "currentSubscriptionStatus",
DROP COLUMN "companyTimeZone",
ADD COLUMN     "companyTimeZone" TEXT;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "currentSubscriptionStatus",
ADD COLUMN     "hasReceivedReminderPeriod" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "public"."CompanyPayment";

-- DropTable
DROP TABLE "public"."CompanySubscription";

-- DropTable
DROP TABLE "public"."UserPayment";

-- DropTable
DROP TABLE "public"."UserSubscription";

-- DropEnum
DROP TYPE "public"."SubscriptionStatus";

-- DropEnum
DROP TYPE "public"."TimeZone";

-- DropEnum
DROP TYPE "public"."UserSubscriptionStatus";

-- CreateTable
CREATE TABLE "public"."CompanyStorage" (
    "companyStorageID" TEXT NOT NULL,
    "totalResourcesSize" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "totalPortfoliosSize" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "totalUsedSpace" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "remainingSpace" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "storageStatus" "public"."StorageStatus" NOT NULL DEFAULT 'EMPTY',
    "companyID" TEXT NOT NULL,

    CONSTRAINT "CompanyStorage_pkey" PRIMARY KEY ("companyStorageID")
);

-- CreateTable
CREATE TABLE "public"."CustomAttribute" (
    "customAttributeID" TEXT NOT NULL,
    "customAttributeLabel" TEXT NOT NULL,
    "customAttributeType" "public"."CustomAttributeType" NOT NULL,
    "entityType" "public"."EntityType" NOT NULL,
    "companyID" TEXT NOT NULL,

    CONSTRAINT "CustomAttribute_pkey" PRIMARY KEY ("customAttributeID")
);

-- CreateTable
CREATE TABLE "public"."Project" (
    "projectID" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "projectDescription" TEXT,
    "projectStartDate" TIMESTAMP(3) NOT NULL,
    "projectDeadline" TIMESTAMP(3) NOT NULL,
    "projectCreatorID" TEXT NOT NULL,
    "userCreatorFirstName" TEXT NOT NULL,
    "userCreatorLastName" TEXT NOT NULL,
    "userCreatorPosition" TEXT,
    "projectCreatedAt" TIMESTAMP(3) NOT NULL,
    "companyID" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("projectID")
);

-- CreateTable
CREATE TABLE "public"."CollaborationInvitation" (
    "projectID" TEXT NOT NULL,
    "collaboratingCompanyID" TEXT NOT NULL,
    "status" "public"."CollaborationInvitationStatus" NOT NULL DEFAULT 'PENDING',
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sentByUserID" TEXT NOT NULL,
    "acceptedAt" TIMESTAMP(3),

    CONSTRAINT "CollaborationInvitation_pkey" PRIMARY KEY ("projectID","collaboratingCompanyID")
);

-- CreateTable
CREATE TABLE "public"."CollaboratingCompany" (
    "collaboratingCompanyID" TEXT NOT NULL,
    "collaboratingCompanyName" TEXT NOT NULL,
    "collaboratingCompanyEmail" TEXT NOT NULL,
    "collaboratingCompanyResigstrationNumber" TEXT NOT NULL,
    "collaboratingCompanyLogoUrl" TEXT,
    "companyID" TEXT,

    CONSTRAINT "CollaboratingCompany_pkey" PRIMARY KEY ("collaboratingCompanyID")
);

-- CreateTable
CREATE TABLE "public"."CollaboratingCompanyProject" (
    "collaboratingCompanyID" TEXT NOT NULL,
    "projectID" TEXT NOT NULL,
    "addedToProjectAt" TIMESTAMP(3) NOT NULL,
    "addedToProjectbyUserID" TEXT NOT NULL,

    CONSTRAINT "CollaboratingCompanyProject_pkey" PRIMARY KEY ("projectID","collaboratingCompanyID")
);

-- CreateTable
CREATE TABLE "public"."ProjectCustomAttribute" (
    "projectCustomAttributeID" TEXT NOT NULL,
    "customAttributeLabel" TEXT NOT NULL,
    "customAttributeType" "public"."CustomAttributeType" NOT NULL,
    "textValue" TEXT,
    "dateValue" TIMESTAMP(3),
    "integerValue" BIGINT,
    "decimalValue" DECIMAL(65,30),
    "urlValue" TEXT,
    "longTextValue" TEXT,
    "customAttributeID" TEXT NOT NULL,
    "projectID" TEXT NOT NULL,

    CONSTRAINT "ProjectCustomAttribute_pkey" PRIMARY KEY ("projectCustomAttributeID")
);

-- CreateTable
CREATE TABLE "public"."ProjectCustomAttributeResource" (
    "projectCustomAttributeResourceID" TEXT NOT NULL,
    "audioUrl" TEXT,
    "imageUrl" TEXT,
    "videoUrl" TEXT,
    "documentUrl" TEXT,
    "archiveUrl" TEXT,
    "mimeType" "public"."MimeType" NOT NULL,
    "checkSum" TEXT NOT NULL,
    "fileSize" DECIMAL(65,30),
    "uploadedByUserID" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL,
    "projectCustomAttributeID" TEXT NOT NULL,

    CONSTRAINT "ProjectCustomAttributeResource_pkey" PRIMARY KEY ("projectCustomAttributeResourceID")
);

-- CreateTable
CREATE TABLE "public"."ClientUser" (
    "clientUserID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "clientUserFirstName" TEXT NOT NULL,
    "clientUserLastName" TEXT NOT NULL,
    "clientUserPosition" TEXT,
    "clientUserAvatarUrl" TEXT,
    "isProjectCreator" BOOLEAN NOT NULL DEFAULT false,
    "addedToProjectAt" TIMESTAMP(3) NOT NULL,
    "projectID" TEXT NOT NULL,

    CONSTRAINT "ClientUser_pkey" PRIMARY KEY ("clientUserID")
);

-- CreateTable
CREATE TABLE "public"."CollaboratorUser" (
    "collaboratorUserID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "collaboratorUserFirstName" TEXT NOT NULL,
    "collaboratorUserLastName" TEXT NOT NULL,
    "collaboratorUserPosition" TEXT,
    "collaboratorUserAvatarUrl" TEXT,
    "addedToProjectAt" TIMESTAMP(3) NOT NULL,
    "collaboratingCompanyID" TEXT,
    "projectID" TEXT NOT NULL,

    CONSTRAINT "CollaboratorUser_pkey" PRIMARY KEY ("collaboratorUserID")
);

-- CreateTable
CREATE TABLE "public"."Folder" (
    "folderID" TEXT NOT NULL,
    "folderName" TEXT NOT NULL,
    "isRoot" BOOLEAN NOT NULL DEFAULT false,
    "level" INTEGER NOT NULL,
    "indexInLevel" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "projectID" TEXT NOT NULL,
    "parentID" TEXT,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("folderID")
);

-- CreateTable
CREATE TABLE "public"."Task" (
    "taskID" TEXT NOT NULL,
    "taskName" TEXT NOT NULL,
    "taskPath" TEXT NOT NULL,
    "insdustryName" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "taskDescription" TEXT,
    "internalBid" INTEGER,
    "deadline" TIMESTAMP(3),
    "collaboratorBid" INTEGER,
    "collaboratorEstimatedCompletion" TIMESTAMP(3),
    "taskCost" DECIMAL(65,30),
    "taskStatus" "public"."TaskStatus" NOT NULL DEFAULT 'READY_TO_START',
    "taskPriority" "public"."TaskPriority" NOT NULL DEFAULT 'NONE',
    "taskState" "public"."TaskState" NOT NULL DEFAULT 'TO_ASSIGN',
    "collaboratingCompanyID" TEXT NOT NULL,
    "folderID" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("taskID")
);

-- CreateTable
CREATE TABLE "public"."TaskCustomAttribute" (
    "taskCustomAttributeID" TEXT NOT NULL,
    "customAttributeLabel" TEXT NOT NULL,
    "customAttributeType" "public"."CustomAttributeType" NOT NULL,
    "textValue" TEXT,
    "dateValue" TIMESTAMP(3),
    "integerValue" BIGINT,
    "decimalValue" DECIMAL(65,30),
    "urlValue" TEXT,
    "longTextValue" TEXT,
    "customAttributeID" TEXT NOT NULL,
    "taskID" TEXT NOT NULL,

    CONSTRAINT "TaskCustomAttribute_pkey" PRIMARY KEY ("taskCustomAttributeID")
);

-- CreateTable
CREATE TABLE "public"."TaskCustomAttributeResource" (
    "taskCustomAttributeResourceID" TEXT NOT NULL,
    "audioUrl" TEXT,
    "imageUrl" TEXT,
    "videoUrl" TEXT,
    "documentUrl" TEXT,
    "archiveUrl" TEXT,
    "mimeType" "public"."MimeType" NOT NULL,
    "checkSum" TEXT NOT NULL,
    "fileSize" DECIMAL(65,30),
    "uploadedByUserID" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL,
    "taskCustomAttributeID" TEXT NOT NULL,

    CONSTRAINT "TaskCustomAttributeResource_pkey" PRIMARY KEY ("taskCustomAttributeResourceID")
);

-- CreateTable
CREATE TABLE "public"."TaskCollaboratorPermission" (
    "taskCollaboratorPermissionID" TEXT NOT NULL,
    "canUpdateBid" BOOLEAN NOT NULL DEFAULT false,
    "canUpdateEstimatedCompletion" BOOLEAN NOT NULL DEFAULT false,
    "canUpdateCost" BOOLEAN NOT NULL DEFAULT false,
    "taskID" TEXT NOT NULL,

    CONSTRAINT "TaskCollaboratorPermission_pkey" PRIMARY KEY ("taskCollaboratorPermissionID")
);

-- CreateTable
CREATE TABLE "public"."TaskNote" (
    "taskNoteID" TEXT NOT NULL,
    "authorType" "public"."NoteAuthorType" NOT NULL,
    "userFirstName" TEXT NOT NULL,
    "userLastName" TEXT NOT NULL,
    "userAvatarUrl" TEXT,
    "taskNoteContent" TEXT,
    "attachementUrl" TEXT,
    "attachementSize" DECIMAL(65,30),
    "attachementMimeType" "public"."MimeType",
    "attachementChecksum" TEXT,
    "attachementUploadedAt" TIMESTAMP(3),
    "taskNoteCreatedat" TIMESTAMP(3) NOT NULL,
    "isTaskNoteUpdated" BOOLEAN NOT NULL DEFAULT false,
    "taskNoteUpdateat" TIMESTAMP(3),
    "userAuthorID" TEXT NOT NULL,
    "taskID" TEXT NOT NULL,

    CONSTRAINT "TaskNote_pkey" PRIMARY KEY ("taskNoteID")
);

-- CreateTable
CREATE TABLE "public"."taskMaterial" (
    "taskMaterialID" TEXT NOT NULL,
    "taskMaterialName" TEXT NOT NULL,
    "taskMaterialWithResource" BOOLEAN NOT NULL,
    "taskMaterialWithPackage" BOOLEAN NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL,
    "userSenderID" TEXT NOT NULL,
    "taskID" TEXT NOT NULL,

    CONSTRAINT "taskMaterial_pkey" PRIMARY KEY ("taskMaterialID")
);

-- CreateTable
CREATE TABLE "public"."taskMaterialResource" (
    "taskMaterialResourceID" TEXT NOT NULL,
    "resourceUrl" TEXT NOT NULL,
    "resourceSize" DECIMAL(65,30) NOT NULL,
    "resourceMimeType" "public"."MimeType" NOT NULL,
    "checkSum" TEXT NOT NULL,
    "uploadedByUserID" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL,
    "taskMaterialID" TEXT NOT NULL,

    CONSTRAINT "taskMaterialResource_pkey" PRIMARY KEY ("taskMaterialResourceID")
);

-- CreateTable
CREATE TABLE "public"."taskMaterialPackage" (
    "taskMaterialPackageID" TEXT NOT NULL,
    "packageName" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL,
    "packageLink" TEXT NOT NULL,
    "metadataPassword" TEXT,
    "metadataText" TEXT,
    "metadataExporationDate" TIMESTAMP(3),
    "taskMaterialID" TEXT NOT NULL,

    CONSTRAINT "taskMaterialPackage_pkey" PRIMARY KEY ("taskMaterialPackageID")
);

-- CreateTable
CREATE TABLE "public"."TaskMaterialFeedback" (
    "taskMaterialFeedbackID" TEXT NOT NULL,
    "feedbackType" "public"."FeedBackType" NOT NULL,
    "feedbackNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "isUpdated" BOOLEAN,
    "updatedAt" TIMESTAMP(3),
    "userReciverFirstName" TEXT NOT NULL,
    "userReciverLastName" TEXT NOT NULL,
    "userReciverAvatarUrl" TEXT,
    "userReciverID" TEXT NOT NULL,
    "taskMaterialID" TEXT NOT NULL,

    CONSTRAINT "TaskMaterialFeedback_pkey" PRIMARY KEY ("taskMaterialFeedbackID")
);

-- CreateTable
CREATE TABLE "public"."Verison" (
    "versionID" TEXT NOT NULL,
    "versionName" TEXT NOT NULL,
    "versionWithResources" BOOLEAN NOT NULL,
    "versionWithPackage" BOOLEAN NOT NULL,
    "sendAt" TIMESTAMP(3) NOT NULL,
    "userSenderID" TEXT NOT NULL,
    "taskID" TEXT NOT NULL,

    CONSTRAINT "Verison_pkey" PRIMARY KEY ("versionID")
);

-- CreateTable
CREATE TABLE "public"."VersionFeedback" (
    "versionFeedbackID" TEXT NOT NULL,
    "feedbackType" "public"."FeedBackType" NOT NULL,
    "feedbackNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "isUpdated" BOOLEAN,
    "updatedAt" TIMESTAMP(3),
    "userReciverFirstName" TEXT NOT NULL,
    "userReciverLastName" TEXT NOT NULL,
    "userReciverAvatarUrl" TEXT,
    "userReciverID" TEXT NOT NULL,
    "versionID" TEXT NOT NULL,

    CONSTRAINT "VersionFeedback_pkey" PRIMARY KEY ("versionFeedbackID")
);

-- CreateTable
CREATE TABLE "public"."VersionPackage" (
    "versionPackageID" TEXT NOT NULL,
    "packageName" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL,
    "packageLink" TEXT NOT NULL,
    "metadataPassword" TEXT,
    "metadataText" TEXT,
    "metadataExporationDate" TIMESTAMP(3),
    "versionID" TEXT NOT NULL,

    CONSTRAINT "VersionPackage_pkey" PRIMARY KEY ("versionPackageID")
);

-- CreateTable
CREATE TABLE "public"."VersionResource" (
    "versionResourceID" TEXT NOT NULL,
    "resourceUrl" TEXT NOT NULL,
    "resourceSize" DECIMAL(65,30) NOT NULL,
    "resourceMimeType" "public"."MimeType" NOT NULL,
    "checkSum" TEXT NOT NULL,
    "uploadedByUserID" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL,
    "versionID" TEXT NOT NULL,

    CONSTRAINT "VersionResource_pkey" PRIMARY KEY ("versionResourceID")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyStorage_companyID_key" ON "public"."CompanyStorage"("companyID");

-- CreateIndex
CREATE UNIQUE INDEX "CollaboratingCompany_companyID_key" ON "public"."CollaboratingCompany"("companyID");

-- CreateIndex
CREATE INDEX "ProjectCustomAttribute_projectID_idx" ON "public"."ProjectCustomAttribute"("projectID");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectCustomAttributeResource_projectCustomAttributeID_key" ON "public"."ProjectCustomAttributeResource"("projectCustomAttributeID");

-- CreateIndex
CREATE UNIQUE INDEX "ClientUser_userID_key" ON "public"."ClientUser"("userID");

-- CreateIndex
CREATE INDEX "ClientUser_projectID_idx" ON "public"."ClientUser"("projectID");

-- CreateIndex
CREATE INDEX "CollaboratorUser_projectID_idx" ON "public"."CollaboratorUser"("projectID");

-- CreateIndex
CREATE UNIQUE INDEX "Folder_folderName_key" ON "public"."Folder"("folderName");

-- CreateIndex
CREATE UNIQUE INDEX "Folder_projectID_key" ON "public"."Folder"("projectID");

-- CreateIndex
CREATE INDEX "Folder_parentID_idx" ON "public"."Folder"("parentID");

-- CreateIndex
CREATE UNIQUE INDEX "Task_taskName_key" ON "public"."Task"("taskName");

-- CreateIndex
CREATE INDEX "Task_folderID_idx" ON "public"."Task"("folderID");

-- CreateIndex
CREATE UNIQUE INDEX "TaskCustomAttributeResource_taskCustomAttributeID_key" ON "public"."TaskCustomAttributeResource"("taskCustomAttributeID");

-- CreateIndex
CREATE UNIQUE INDEX "TaskCollaboratorPermission_taskID_key" ON "public"."TaskCollaboratorPermission"("taskID");

-- CreateIndex
CREATE INDEX "TaskNote_taskID_idx" ON "public"."TaskNote"("taskID");

-- CreateIndex
CREATE UNIQUE INDEX "taskMaterial_taskMaterialName_key" ON "public"."taskMaterial"("taskMaterialName");

-- CreateIndex
CREATE INDEX "taskMaterial_taskID_idx" ON "public"."taskMaterial"("taskID");

-- CreateIndex
CREATE INDEX "taskMaterialResource_taskMaterialID_idx" ON "public"."taskMaterialResource"("taskMaterialID");

-- CreateIndex
CREATE UNIQUE INDEX "taskMaterialPackage_taskMaterialID_key" ON "public"."taskMaterialPackage"("taskMaterialID");

-- CreateIndex
CREATE INDEX "taskMaterialPackage_taskMaterialID_idx" ON "public"."taskMaterialPackage"("taskMaterialID");

-- CreateIndex
CREATE UNIQUE INDEX "TaskMaterialFeedback_taskMaterialID_key" ON "public"."TaskMaterialFeedback"("taskMaterialID");

-- CreateIndex
CREATE UNIQUE INDEX "Verison_versionName_key" ON "public"."Verison"("versionName");

-- CreateIndex
CREATE INDEX "Verison_taskID_idx" ON "public"."Verison"("taskID");

-- CreateIndex
CREATE UNIQUE INDEX "VersionFeedback_versionID_key" ON "public"."VersionFeedback"("versionID");

-- CreateIndex
CREATE UNIQUE INDEX "VersionPackage_versionID_key" ON "public"."VersionPackage"("versionID");

-- AddForeignKey
ALTER TABLE "public"."CompanyStorage" ADD CONSTRAINT "CompanyStorage_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "public"."Company"("companyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CustomAttribute" ADD CONSTRAINT "CustomAttribute_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "public"."Company"("companyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "public"."Company"("companyID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CollaborationInvitation" ADD CONSTRAINT "CollaborationInvitation_projectID_fkey" FOREIGN KEY ("projectID") REFERENCES "public"."Project"("projectID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CollaborationInvitation" ADD CONSTRAINT "CollaborationInvitation_collaboratingCompanyID_fkey" FOREIGN KEY ("collaboratingCompanyID") REFERENCES "public"."CollaboratingCompany"("collaboratingCompanyID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CollaboratingCompanyProject" ADD CONSTRAINT "CollaboratingCompanyProject_projectID_fkey" FOREIGN KEY ("projectID") REFERENCES "public"."Project"("projectID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CollaboratingCompanyProject" ADD CONSTRAINT "CollaboratingCompanyProject_collaboratingCompanyID_fkey" FOREIGN KEY ("collaboratingCompanyID") REFERENCES "public"."CollaboratingCompany"("collaboratingCompanyID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProjectCustomAttribute" ADD CONSTRAINT "ProjectCustomAttribute_projectID_fkey" FOREIGN KEY ("projectID") REFERENCES "public"."Project"("projectID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProjectCustomAttributeResource" ADD CONSTRAINT "ProjectCustomAttributeResource_projectCustomAttributeID_fkey" FOREIGN KEY ("projectCustomAttributeID") REFERENCES "public"."ProjectCustomAttribute"("projectCustomAttributeID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ClientUser" ADD CONSTRAINT "ClientUser_projectID_fkey" FOREIGN KEY ("projectID") REFERENCES "public"."Project"("projectID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CollaboratorUser" ADD CONSTRAINT "CollaboratorUser_projectID_fkey" FOREIGN KEY ("projectID") REFERENCES "public"."Project"("projectID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Folder" ADD CONSTRAINT "Folder_projectID_fkey" FOREIGN KEY ("projectID") REFERENCES "public"."Project"("projectID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Folder" ADD CONSTRAINT "Folder_parentID_fkey" FOREIGN KEY ("parentID") REFERENCES "public"."Folder"("folderID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_folderID_fkey" FOREIGN KEY ("folderID") REFERENCES "public"."Folder"("folderID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TaskCustomAttribute" ADD CONSTRAINT "TaskCustomAttribute_taskID_fkey" FOREIGN KEY ("taskID") REFERENCES "public"."Task"("taskID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TaskCustomAttributeResource" ADD CONSTRAINT "TaskCustomAttributeResource_taskCustomAttributeID_fkey" FOREIGN KEY ("taskCustomAttributeID") REFERENCES "public"."TaskCustomAttribute"("taskCustomAttributeID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TaskCollaboratorPermission" ADD CONSTRAINT "TaskCollaboratorPermission_taskID_fkey" FOREIGN KEY ("taskID") REFERENCES "public"."Task"("taskID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TaskNote" ADD CONSTRAINT "TaskNote_taskID_fkey" FOREIGN KEY ("taskID") REFERENCES "public"."Task"("taskID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."taskMaterial" ADD CONSTRAINT "taskMaterial_taskID_fkey" FOREIGN KEY ("taskID") REFERENCES "public"."Task"("taskID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."taskMaterialResource" ADD CONSTRAINT "taskMaterialResource_taskMaterialID_fkey" FOREIGN KEY ("taskMaterialID") REFERENCES "public"."taskMaterial"("taskMaterialID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."taskMaterialPackage" ADD CONSTRAINT "taskMaterialPackage_taskMaterialID_fkey" FOREIGN KEY ("taskMaterialID") REFERENCES "public"."taskMaterial"("taskMaterialID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TaskMaterialFeedback" ADD CONSTRAINT "TaskMaterialFeedback_taskMaterialID_fkey" FOREIGN KEY ("taskMaterialID") REFERENCES "public"."taskMaterial"("taskMaterialID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Verison" ADD CONSTRAINT "Verison_taskID_fkey" FOREIGN KEY ("taskID") REFERENCES "public"."Task"("taskID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VersionFeedback" ADD CONSTRAINT "VersionFeedback_versionID_fkey" FOREIGN KEY ("versionID") REFERENCES "public"."Verison"("versionID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VersionPackage" ADD CONSTRAINT "VersionPackage_versionID_fkey" FOREIGN KEY ("versionID") REFERENCES "public"."Verison"("versionID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VersionResource" ADD CONSTRAINT "VersionResource_versionID_fkey" FOREIGN KEY ("versionID") REFERENCES "public"."Verison"("versionID") ON DELETE CASCADE ON UPDATE CASCADE;
