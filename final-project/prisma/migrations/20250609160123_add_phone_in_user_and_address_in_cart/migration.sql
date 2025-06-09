-- CreateEnum
CREATE TYPE "Size" AS ENUM ('XS', 'S', 'M', 'L', 'XL', 'F');

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "size" "Size" NOT NULL DEFAULT 'F';
