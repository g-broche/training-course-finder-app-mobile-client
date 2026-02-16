import { useQuery } from "@tanstack/react-query";
import { getPaginatedFoundAnnounce } from "../../services/announceService";

export const usePaginatedFound = (
  currentPage: number,
  filter: Record<string, any>,
) => {
  return useQuery({
    queryKey: ["found-announces", currentPage, filter],
    queryFn: () => getPaginatedFoundAnnounce(currentPage, filter),
  });
};
