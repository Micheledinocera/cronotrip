export interface Version {
  version: String;
  commit: String;
  built_at: String;
}

export const useVersion = async () => {
  return await useFetch<Version>('/version.json');
};
