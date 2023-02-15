-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `phone_number` INTEGER NOT NULL,
    `type` VARCHAR(3) NOT NULL,
    `document` INTEGER NOT NULL,

    UNIQUE INDEX `Client_document_key`(`document`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Andress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `state` VARCHAR(3) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `road` VARCHAR(191) NOT NULL,
    `number` INTEGER NOT NULL,
    `reference_point` VARCHAR(191) NULL,
    `clientId` INTEGER NOT NULL,

    UNIQUE INDEX `Andress_clientId_key`(`clientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Animal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `age` VARCHAR(6) NOT NULL,
    `clientId` INTEGER NULL,

    UNIQUE INDEX `Animal_clientId_key`(`clientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Problem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `explication` VARCHAR(191) NOT NULL,
    `symptoms` VARCHAR(191) NOT NULL,
    `as_time_problem` VARCHAR(6) NOT NULL,
    `animalId` INTEGER NULL,

    UNIQUE INDEX `Problem_animalId_key`(`animalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Andress` ADD CONSTRAINT `Andress_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Animal` ADD CONSTRAINT `Animal_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Problem` ADD CONSTRAINT `Problem_animalId_fkey` FOREIGN KEY (`animalId`) REFERENCES `Animal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
