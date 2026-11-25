ALTER TABLE "enquiries"
  ADD COLUMN "reference_number" VARCHAR(24),
  ADD COLUMN "industry_other" VARCHAR(150),
  ADD COLUMN "collaboration_objective" VARCHAR(120),
  ADD COLUMN "collaboration_objective_other" VARCHAR(150),
  ADD COLUMN "target_country_region" VARCHAR(200),
  ADD COLUMN "partner_type" VARCHAR(100),
  ADD COLUMN "partner_type_other" VARCHAR(150);

CREATE UNIQUE INDEX "enquiries_reference_number_key" ON "enquiries"("reference_number");
