/*
  Warnings:

  - The values [SMALL,AVERAGE,BIG] on the enum `Size` will be removed. If these variants are still used in the database, this will fail.
  - The values [DOG,CAT] on the enum `Specie` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Size_new" AS ENUM ('small', 'big', 'average');
ALTER TABLE "pets" ALTER COLUMN "size" TYPE "Size_new" USING ("size"::text::"Size_new");
ALTER TYPE "Size" RENAME TO "Size_old";
ALTER TYPE "Size_new" RENAME TO "Size";
DROP TYPE "public"."Size_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Specie_new" AS ENUM ('dog', 'cat');
ALTER TABLE "pets" ALTER COLUMN "specie" TYPE "Specie_new" USING ("specie"::text::"Specie_new");
ALTER TYPE "Specie" RENAME TO "Specie_old";
ALTER TYPE "Specie_new" RENAME TO "Specie";
DROP TYPE "public"."Specie_old";
COMMIT;
