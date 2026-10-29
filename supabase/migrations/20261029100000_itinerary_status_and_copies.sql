-- Itinerary flows (docs/wiki/viaggi/flussi.md, docs/wiki/architettura/modello-dati.md):
-- a manual status, with the statuses in their own table so that a new one is just a new row,
-- and copied_from, the itinerary a copy comes from (emptied when the original is deleted).

CREATE TABLE "public"."itinerary_statuses" (
  "key"      text     PRIMARY KEY,
  "position" smallint NOT NULL
);

COMMENT ON TABLE "public"."itinerary_statuses" IS 'Statuses of an itinerary, changed by hand; position orders them in the app';

INSERT INTO "public"."itinerary_statuses" ("key", "position") VALUES
  ('planning', 1),
  ('in_progress', 2),
  ('done', 3);

ALTER TABLE "public"."itinerary_statuses" ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE "public"."itinerary_statuses" FROM "anon", "authenticated";
GRANT SELECT ON TABLE "public"."itinerary_statuses" TO "authenticated";

CREATE POLICY "Signed-in users read the itinerary statuses" ON "public"."itinerary_statuses"
  FOR SELECT
  TO "authenticated"
  USING (true);

-- Existing itineraries start from planning, like a new one or a fresh copy.
ALTER TABLE "public"."itineraries"
  ADD COLUMN "status" text NOT NULL DEFAULT 'planning' REFERENCES "public"."itinerary_statuses" ("key") ON UPDATE CASCADE,
  ADD COLUMN "copied_from" bigint REFERENCES "public"."itineraries" ("id") ON DELETE SET NULL;

CREATE INDEX "itineraries_copied_from_idx" ON "public"."itineraries" (copied_from);
