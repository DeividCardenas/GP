/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `Diagnostico` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Diagnostico_codigo_key` ON `Diagnostico`(`codigo`);
