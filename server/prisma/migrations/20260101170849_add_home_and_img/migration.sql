-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar_img_key" TEXT,
ADD COLUMN     "home_id" TEXT,
ADD COLUMN     "name" TEXT;

-- CreateTable
CREATE TABLE "Home" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "home_img_key" TEXT NOT NULL,

    CONSTRAINT "Home_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_home_id_fkey" FOREIGN KEY ("home_id") REFERENCES "Home"("id") ON DELETE SET NULL ON UPDATE CASCADE;
