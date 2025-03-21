/*
  Warnings:

  - You are about to drop the `BrandMaster` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ItemMaster` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemMaster" DROP CONSTRAINT "ItemMaster_brand_id_fkey";

-- DropTable
DROP TABLE "BrandMaster";

-- DropTable
DROP TABLE "ItemMaster";

-- CreateTable
CREATE TABLE "item_master" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "unit_price" DECIMAL(65,30) NOT NULL,
    "image" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "brand_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_master_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brand_master" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "brand_master_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "item_master" ADD CONSTRAINT "item_master_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brand_master"("id") ON DELETE SET NULL ON UPDATE CASCADE;
