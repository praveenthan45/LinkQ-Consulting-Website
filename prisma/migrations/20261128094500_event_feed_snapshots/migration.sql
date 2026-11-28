CREATE TABLE "event_feed_snapshots" (
    "source" TEXT NOT NULL,
    "events" JSONB NOT NULL,
    "fetched_at" TIMESTAMPTZ(3) NOT NULL,
    CONSTRAINT "event_feed_snapshots_pkey" PRIMARY KEY ("source")
);
