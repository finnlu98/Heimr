-- AlterTable
ALTER TABLE "Home" ADD COLUMN     "location" JSONB,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "home_img_key" DROP NOT NULL;
