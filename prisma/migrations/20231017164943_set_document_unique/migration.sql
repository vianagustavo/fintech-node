/*
  Warnings:

  - A unique constraint covering the columns `[document]` on the table `people` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "people_document_key" ON "people"("document");
