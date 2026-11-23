CREATE TABLE "enquiries" (
 "id" UUID NOT NULL,
 "full_name" VARCHAR(150) NOT NULL,
 "business_email" VARCHAR(255) NOT NULL,
 "phone_number" VARCHAR(30),
 "organization" VARCHAR(200) NOT NULL,
 "industry" VARCHAR(100) NOT NULL,
 "service" VARCHAR(100) NOT NULL,
 "subject" VARCHAR(200) NOT NULL,
 "message" TEXT NOT NULL,
 "consent_given" BOOLEAN NOT NULL,
 "consent_timestamp" TIMESTAMPTZ(3) NOT NULL,
 "status" VARCHAR(30) NOT NULL DEFAULT 'new',
 "idempotency_key" VARCHAR(36) NOT NULL,
 "content_hash" VARCHAR(64) NOT NULL,
 "notification_status" VARCHAR(30) NOT NULL DEFAULT 'not_configured',
 "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_at" TIMESTAMPTZ(3) NOT NULL,
 CONSTRAINT "enquiries_pkey" PRIMARY KEY ("id"),
 CONSTRAINT "enquiries_consent_check" CHECK ("consent_given" = true)
);
CREATE UNIQUE INDEX "enquiries_idempotency_key_key" ON "enquiries"("idempotency_key");
CREATE INDEX "enquiries_created_at_idx" ON "enquiries"("created_at");
