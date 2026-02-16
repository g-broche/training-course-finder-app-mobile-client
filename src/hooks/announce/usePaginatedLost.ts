import { useQuery } from "@tanstack/react-query";
import { getPaginatedLostAnnounce } from "../../services/announceService";

export const usePaginatedLost = (
  currentPage: number,
  filter: Record<string, any>,
) => {
  return useQuery({
    queryKey: ["lost-announces", currentPage, filter],
    queryFn: () => getPaginatedLostAnnounce(currentPage, filter),
  });
};
