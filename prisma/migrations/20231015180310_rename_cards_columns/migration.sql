/*
  Warnings:

  - You are about to drop the column `cardNumber` on the `cards` table. All the data in the column will be lost.
  - You are about to drop the column `cardType` on the `cards` table. All the data in the column will be lost.
  - Added the required column `number` to the `cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cards" DROP COLUMN "cardNumber",
DROP COLUMN "cardType",
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "type" "CardType" NOT NULL;
