import { useAppSelector } from "./hook";

export const useIsLoading = () => {
  return useAppSelector((state) => {
    const isQueryLoading = Object.values(state.api.queries).some(
      (query) => query?.status === "pending"
    );
    const isMutationLoading = Object.values(state.api.mutations).some(
      (mutation) => mutation?.status === "pending"
    );

    return isQueryLoading || isMutationLoading;
  });
};
