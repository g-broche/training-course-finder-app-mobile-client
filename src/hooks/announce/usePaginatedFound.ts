import { useQuery } from "@tanstack/react-query";
import { getPaginatedFoundAnnounce } from "../../services/announceService";
import { AnnounceType } from "../../types/type";

export const getQueryKeysPaginatedAnnounces = (type: AnnounceType) => {
  switch (type) {
    case "found":
      return "found-announces";
    case "lost":
      return "lost-announces";
  }
};

export const usePaginatedFound = (
  currentPage: number,
  filter: Record<string, any>,
) => {
  return useQuery({
    queryKey: ["found-announces", currentPage, filter],
    queryFn: () => getPaginatedFoundAnnounce(currentPage, filter),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
  });
};
