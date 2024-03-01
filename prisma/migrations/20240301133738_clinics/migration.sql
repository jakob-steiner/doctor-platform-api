/*
  Warnings:

  - You are about to drop the `Practices` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clinicID` to the `Doctors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Doctors` ADD COLUMN `clinicID` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Practices`;

-- CreateTable
CREATE TABLE `Clinics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(191) NOT NULL,
    `zip` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Doctors` ADD CONSTRAINT `Doctors_clinicID_fkey` FOREIGN KEY (`clinicID`) REFERENCES `Clinics`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
