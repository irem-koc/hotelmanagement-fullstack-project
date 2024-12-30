import { useAppSelector } from "./hook";

export const useIsLoading = () => {
  return useAppSelector((state) => {
    const isQueryLoading = Object.values(state.emptySplitApi.queries).some(
      (query) => query?.status === "pending"
    );
    const isMutationLoading = Object.values(state.emptySplitApi.mutations).some(
      (mutation) => mutation?.status === "pending"
    );

    return isQueryLoading || isMutationLoading;
  });
};
