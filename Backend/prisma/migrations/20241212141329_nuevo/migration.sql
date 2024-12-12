/*
  Warnings:

  - Added the required column `nombre_completo` to the `Usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `nombre_completo` VARCHAR(191) NOT NULL;
