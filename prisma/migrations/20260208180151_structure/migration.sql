/*
  Warnings:

  - A unique constraint covering the columns `[tenant_id,email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isAdmin` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "tickets_status" AS ENUM ('ACTIVE', 'SOLVED', 'CANCELED');

-- CreateEnum
CREATE TYPE "type_user" AS ENUM ('USER', 'ANALYST');

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL,
ADD COLUMN     "tenant_id" TEXT NOT NULL,
ADD COLUMN     "type" "type_user" NOT NULL;

-- CreateTable
CREATE TABLE "Tenant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Group" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type_user_group" "type_user" NOT NULL,

    CONSTRAINT "User_Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group_Allowed_Categories" (
    "user_group_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "include_childs" BOOLEAN NOT NULL,

    CONSTRAINT "Group_Allowed_Categories_pkey" PRIMARY KEY ("user_group_id","category_id")
);

-- CreateTable
CREATE TABLE "Analyst_Responsible_Categories" (
    "analyst_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "includeChilds" BOOLEAN NOT NULL,

    CONSTRAINT "Analyst_Responsible_Categories_pkey" PRIMARY KEY ("analyst_id","category_id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "parent_category_id" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "category_id" TEXT NOT NULL,
    "end_user_id" TEXT NOT NULL,
    "responsible_analyst_id" TEXT NOT NULL,
    "created_by_id" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToUser_Group" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserToUser_Group_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_cnpj_key" ON "Tenant"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_tenant_id_code_key" ON "Ticket"("tenant_id", "code");

-- CreateIndex
CREATE INDEX "_UserToUser_Group_B_index" ON "_UserToUser_Group"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_tenant_id_email_key" ON "User"("tenant_id", "email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Group" ADD CONSTRAINT "User_Group_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group_Allowed_Categories" ADD CONSTRAINT "Group_Allowed_Categories_user_group_id_fkey" FOREIGN KEY ("user_group_id") REFERENCES "User_Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group_Allowed_Categories" ADD CONSTRAINT "Group_Allowed_Categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analyst_Responsible_Categories" ADD CONSTRAINT "Analyst_Responsible_Categories_analyst_id_fkey" FOREIGN KEY ("analyst_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analyst_Responsible_Categories" ADD CONSTRAINT "Analyst_Responsible_Categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parent_category_id_fkey" FOREIGN KEY ("parent_category_id") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_end_user_id_fkey" FOREIGN KEY ("end_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_responsible_analyst_id_fkey" FOREIGN KEY ("responsible_analyst_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToUser_Group" ADD CONSTRAINT "_UserToUser_Group_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToUser_Group" ADD CONSTRAINT "_UserToUser_Group_B_fkey" FOREIGN KEY ("B") REFERENCES "User_Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
