/*
  Warnings:

  - You are about to drop the column `accountBranch` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `accountNumber` on the `accounts` table. All the data in the column will be lost.
  - Added the required column `account` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "accountBranch",
DROP COLUMN "accountNumber",
ADD COLUMN     "account" TEXT NOT NULL,
ADD COLUMN     "branch" TEXT NOT NULL;
