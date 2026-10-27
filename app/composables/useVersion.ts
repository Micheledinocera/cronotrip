export interface Version {
  version: String;
  commit: String;
  built_at: String;
}

export const useVersion = async () => {
  const timestamp = Date.now();
  return await useFetch<Version>(`/version.json?t=${timestamp}`);
};
