-- Photos uploaded from the app (docs/wiki/viaggi/foto.md): path <owner_id>/<itinerary_id>/<file>
-- in the public bucket Photos. Each user writes only in their own folder, and only for their
-- own itineraries; they can list and delete their own photos, to clean up the unused ones.
-- The bucket stays public: reading a photo needs no policy.

-- Was: every signed-in user uploads anywhere in Photos
DROP POLICY IF EXISTS "Give users authenticated access to folder 13itpk1_0" ON "storage"."objects";

CREATE POLICY "Owners upload photos of their itineraries" ON "storage"."objects"
  FOR INSERT
  TO "authenticated"
  WITH CHECK (
    bucket_id = 'Photos'
    AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
    AND EXISTS (
      SELECT 1 FROM public.itineraries i
      -- objects.name: a bare name would be the itinerary's name
      WHERE i.id::text = (storage.foldername(objects.name))[2]
        AND i.owner_id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Users list their own photos" ON "storage"."objects"
  FOR SELECT
  TO "authenticated"
  USING (bucket_id = 'Photos' AND (storage.foldername(name))[1] = (SELECT auth.uid())::text);

CREATE POLICY "Users delete their own photos" ON "storage"."objects"
  FOR DELETE
  TO "authenticated"
  USING (bucket_id = 'Photos' AND (storage.foldername(name))[1] = (SELECT auth.uid())::text);
