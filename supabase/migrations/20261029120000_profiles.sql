-- Profiles (docs/wiki/design/schermate.md): the name of an itinerary's owner, shown on the
-- dashboard cards and on the cover. One row per user, created with the user.
-- Every signed-in user reads every profile, each user changes only their own. anon reads nothing.

CREATE TABLE "public"."profiles" (
  "id"           uuid                     PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  "display_name" text                     NOT NULL,
  "created_at"   timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"   timestamp with time zone NOT NULL DEFAULT now()
);

COMMENT ON TABLE "public"."profiles" IS 'Public data of a user: the name shown to the others';

CREATE TRIGGER "profiles_set_updated_at"
  BEFORE UPDATE ON "public"."profiles"
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- The name comes from the user metadata (display_name, then name), else from the email.
CREATE FUNCTION "public"."default_display_name"(meta jsonb, email text) RETURNS text
  LANGUAGE sql
  IMMUTABLE
  SET search_path = ''
AS $$
  SELECT coalesce(
    nullif(trim(meta ->> 'display_name'), ''),
    nullif(trim(meta ->> 'name'), ''),
    split_part(coalesce(email, ''), '@', 1)
  );
$$;

CREATE FUNCTION "public"."create_profile"() RETURNS trigger
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, public.default_display_name(NEW.raw_user_meta_data, NEW.email));
  RETURN NEW;
END;
$$;

CREATE TRIGGER "on_auth_user_created_create_profile"
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.create_profile();

-- The users that already exist.
INSERT INTO public.profiles (id, display_name)
SELECT u.id, public.default_display_name(u.raw_user_meta_data, u.email)
FROM auth.users u;

-- Lets the API embed the owner's profile in an itinerary: itineraries?select=*,owner:profiles(display_name)
ALTER TABLE "public"."itineraries"
  ADD CONSTRAINT "itineraries_owner_id_profiles_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."profiles" ("id") ON DELETE CASCADE;

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE "public"."profiles" FROM "anon", "authenticated";
GRANT SELECT ON TABLE "public"."profiles" TO "authenticated";
GRANT UPDATE ("display_name") ON TABLE "public"."profiles" TO "authenticated";

CREATE POLICY "Signed-in users read all profiles" ON "public"."profiles"
  FOR SELECT
  TO "authenticated"
  USING (true);

CREATE POLICY "Users update their own profile" ON "public"."profiles"
  FOR UPDATE
  TO "authenticated"
  USING (id = (SELECT auth.uid()))
  WITH CHECK (id = (SELECT auth.uid()));

REVOKE EXECUTE ON FUNCTION public.create_profile() FROM PUBLIC, anon, authenticated;
