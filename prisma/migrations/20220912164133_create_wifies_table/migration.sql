-- CreateTable
CREATE TABLE "Wifies" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Wifies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Wifies" ADD CONSTRAINT "Wifies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
