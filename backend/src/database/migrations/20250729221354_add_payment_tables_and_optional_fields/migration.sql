/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userID` on the `User` table. All the data in the column will be lost.
  - Added the required column `companyAccountType` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayPriority` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storageLimit` to the `Company` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `isDefaultUser` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('FREE', 'PREMIUM');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'PAYMENT_REMINDER_SENT', 'ACTIVE_AFTER_REMINDER', 'SUSPENDED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "UserSubscriptionStatus" AS ENUM ('ACTIVE', 'PAYMENT_REMINDER_SENT', 'ACTIVE_AFTER_REMINDER', 'EXPIRED');

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "companyAccountType" "AccountType" NOT NULL,
ADD COLUMN     "currentSubscriptionStatus" "SubscriptionStatus",
ADD COLUMN     "displayPriority" INTEGER NOT NULL,
ADD COLUMN     "hasReceivedReminderPeriod" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "storageLimit" DECIMAL(65,30) NOT NULL,
ALTER COLUMN "companyPhoneNumber" DROP NOT NULL,
ALTER COLUMN "companyTimeZone" DROP NOT NULL,
ALTER COLUMN "companyWebsite" DROP NOT NULL,
ALTER COLUMN "companyPitch" DROP NOT NULL,
ALTER COLUMN "companyLogoURL" DROP NOT NULL,
ALTER COLUMN "isCertified" DROP NOT NULL,
ALTER COLUMN "certificationsIsPublic" DROP NOT NULL,
ALTER COLUMN "certificationsIsPublic" SET DEFAULT true,
ALTER COLUMN "isIndexed" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ServiceCompany" ALTER COLUMN "customDescription" DROP NOT NULL,
ALTER COLUMN "publicDailyRate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SharedDailyRate" ALTER COLUMN "dailyRateShared" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tool" ALTER COLUMN "isAddedByCompany" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "userID",
ADD COLUMN     "accountDisabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currentSubscriptionStatus" "UserSubscriptionStatus",
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "isCompanySuspended" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDefaultUser" BOOLEAN NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "position" DROP NOT NULL,
ALTER COLUMN "avatarURL" DROP NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "VendorPoolRequest" ADD COLUMN     "isAccepted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "approvedByUserID" DROP NOT NULL,
ALTER COLUMN "approvedAt" DROP NOT NULL;

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,
    "activeOrganizationId" TEXT,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rateLimit" (
    "id" TEXT NOT NULL,
    "key" TEXT,
    "count" INTEGER,
    "lastRequest" BIGINT,

    CONSTRAINT "rateLimit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "settingID" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "decimalValue" DECIMAL(65,30),
    "intValue" INTEGER,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("settingID")
);

-- CreateTable
CREATE TABLE "ChatUser" (
    "chatUserID" TEXT NOT NULL,
    "userFirstName" TEXT NOT NULL,
    "userLastName" TEXT NOT NULL,
    "userPosition" TEXT NOT NULL,
    "userCompanyName" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "companyID" TEXT NOT NULL,

    CONSTRAINT "ChatUser_pkey" PRIMARY KEY ("chatUserID")
);

-- CreateTable
CREATE TABLE "UserSubscription" (
    "userSubscriptionID" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    "isPaidAfterReminder" BOOLEAN,
    "subscriptionIndex" BIGINT NOT NULL,
    "isCurrentSubscription" BOOLEAN NOT NULL,
    "nextSubscriptionReminder1" TIMESTAMP(3) NOT NULL,
    "nextSubscriptionReminder2" TIMESTAMP(3) NOT NULL,
    "nextSubscriptionReminder3" TIMESTAMP(3) NOT NULL,
    "nextSubscriptionReminder4" TIMESTAMP(3) NOT NULL,
    "nextSubscriptionReminder5" TIMESTAMP(3) NOT NULL,
    "nextSubscriptionReminder6" TIMESTAMP(3) NOT NULL,
    "id" TEXT,

    CONSTRAINT "UserSubscription_pkey" PRIMARY KEY ("userSubscriptionID")
);

-- CreateTable
CREATE TABLE "UserPayment" (
    "userPaymentID" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "userSubscriptionID" TEXT NOT NULL,

    CONSTRAINT "UserPayment_pkey" PRIMARY KEY ("userPaymentID")
);

-- CreateTable
CREATE TABLE "CompanySubscription" (
    "companySubscriptionID" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    "isPaidAfterReminder" BOOLEAN NOT NULL DEFAULT false,
    "subscriptionIndex" BIGINT NOT NULL,
    "isCurrentSubscription" BOOLEAN NOT NULL DEFAULT false,
    "nextSubscriptionReminder1" TIMESTAMP(3) NOT NULL,
    "nextSubscriptionReminder2" TIMESTAMP(3) NOT NULL,
    "nextSubscriptionReminder3" TIMESTAMP(3) NOT NULL,
    "nextSubscriptionReminder4" TIMESTAMP(3) NOT NULL,
    "nextSubscriptionReminder5" TIMESTAMP(3) NOT NULL,
    "nextSubscriptionReminder6" TIMESTAMP(3) NOT NULL,
    "companyID" TEXT NOT NULL,

    CONSTRAINT "CompanySubscription_pkey" PRIMARY KEY ("companySubscriptionID")
);

-- CreateTable
CREATE TABLE "CompanyPayment" (
    "paymentID" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "companySubscriptionID" TEXT NOT NULL,

    CONSTRAINT "CompanyPayment_pkey" PRIMARY KEY ("paymentID")
);

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Setting_key_key" ON "Setting"("key");

-- CreateIndex
CREATE UNIQUE INDEX "UserPayment_userSubscriptionID_key" ON "UserPayment"("userSubscriptionID");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyPayment_companySubscriptionID_key" ON "CompanyPayment"("companySubscriptionID");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatUser" ADD CONSTRAINT "ChatUser_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "Company"("companyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPayment" ADD CONSTRAINT "UserPayment_userSubscriptionID_fkey" FOREIGN KEY ("userSubscriptionID") REFERENCES "UserSubscription"("userSubscriptionID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanySubscription" ADD CONSTRAINT "CompanySubscription_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "Company"("companyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyPayment" ADD CONSTRAINT "CompanyPayment_companySubscriptionID_fkey" FOREIGN KEY ("companySubscriptionID") REFERENCES "CompanySubscription"("companySubscriptionID") ON DELETE RESTRICT ON UPDATE CASCADE;
