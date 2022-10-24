-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "division" TEXT NOT NULL DEFAULT 'Operational'
);

-- CreateTable
CREATE TABLE "Referrals" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER NOT NULL,
    "createdFrom" TEXT NOT NULL,
    "updatedFrom" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Authentications" (
    "token" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Referrals_id_key" ON "Referrals"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Referrals_code_key" ON "Referrals"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Authentications_token_key" ON "Authentications"("token");

-- AddForeignKey
ALTER TABLE "Referrals" ADD CONSTRAINT "Referrals_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
