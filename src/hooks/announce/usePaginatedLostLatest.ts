import { useQuery } from "@tanstack/react-query";
import { getPaginatedLostAnnounce } from "../../services/announceService";

interface UsePaginatedLostLatestProps {
  currentPage: number;
  filter?: Record<string, any>;
  size?: number;
}

export const usePaginatedLostLatest = ({
  currentPage,
  filter = {},
  size,
}: UsePaginatedLostLatestProps) => {
  return useQuery({
    queryKey: ["announces", "latest-lost-announces", currentPage, filter],
    queryFn: () => getPaginatedLostAnnounce(currentPage, filter, size),
  });
};
