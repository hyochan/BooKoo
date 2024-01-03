-- AlterTable
ALTER TABLE "users" ADD COLUMN     "confirmed_at" TIMESTAMP(3),
ADD COLUMN     "email_confirmed_at" TIMESTAMP(3),
ADD COLUMN     "email_verified" BOOLEAN DEFAULT false,
ADD COLUMN     "full_name" TEXT,
ADD COLUMN     "last_sign_in_at" TIMESTAMP(3),
ADD COLUMN     "phone_verified" BOOLEAN DEFAULT false,
ADD COLUMN     "provider" "AuthType" NOT NULL DEFAULT 'email',
ADD COLUMN     "provider_id" TEXT,
ADD COLUMN     "sub" TEXT;
