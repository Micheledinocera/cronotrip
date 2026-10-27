-- Temporary rule: only signed-in users read and write.
-- To be replaced when ownership and visibility are decided (docs/wiki/viaggi/condivisione.md).

CREATE POLICY "Authenticated users can read categories" ON "public"."categories"
  FOR SELECT
  TO "authenticated"
  USING (true);

CREATE POLICY "Authenticated users can read itineraries" ON "public"."itineraries_json"
  FOR SELECT
  TO "authenticated"
  USING (true);

CREATE POLICY "Authenticated users can insert itineraries" ON "public"."itineraries_json"
  FOR INSERT
  TO "authenticated"
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update itineraries" ON "public"."itineraries_json"
  FOR UPDATE
  TO "authenticated"
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete itineraries" ON "public"."itineraries_json"
  FOR DELETE
  TO "authenticated"
  USING (true);
