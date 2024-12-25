-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('Credentials', 'Google', 'Github', 'Microsoft', 'X', 'Spotify');

-- CreateEnum
CREATE TYPE "WS_Type" AS ENUM ('Personal', 'Company', 'Enterprise');

-- CreateTable
CREATE TABLE "Applications" (
    "ID" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ApplicationName" TEXT,
    "Providers" "Provider"[],
    "Secret_Key" UUID NOT NULL DEFAULT gen_random_uuid(),
    "API_Token" TEXT NOT NULL,
    "Created_At" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMETZ(6) DEFAULT CURRENT_TIMESTAMP,
    "WS_ID" UUID,

    CONSTRAINT "Applications_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "login" TEXT,
    "email" TEXT,
    "display_name" TEXT,
    "encrypted_password" TEXT,
    "recovery_code" TEXT,
    "role" TEXT DEFAULT '12k-904',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "instance_id" UUID,
    "birthday_date" TIMESTAMPTZ(6),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workspaces" (
    "ID" UUID NOT NULL DEFAULT gen_random_uuid(),
    "Name" TEXT,
    "Domain_Name" TEXT,
    "Description" TEXT,
    "Access_Token" TEXT,
    "WS_Type" "WS_Type",
    "UID" UUID,

    CONSTRAINT "Workspaces_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "sessionToken" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_login_key" ON "Users"("login");

-- CreateIndex
CREATE INDEX "fki_uid_FK" ON "Workspaces"("UID");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- AddForeignKey
ALTER TABLE "Applications" ADD CONSTRAINT "ws_fk" FOREIGN KEY ("WS_ID") REFERENCES "Workspaces"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "app_id" FOREIGN KEY ("instance_id") REFERENCES "Applications"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Workspaces" ADD CONSTRAINT "uid_FK" FOREIGN KEY ("UID") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
