-- CreateTable
CREATE TABLE "zuser" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "passwd" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "zuser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "zuser_username_key" ON "zuser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "zuser_email_key" ON "zuser"("email");
