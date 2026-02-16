import { useQuery } from "@tanstack/react-query";
import { getPaginatedFoundAnnounce } from "../../services/announceService";

interface UsePaginatedFoundLatestProps {
  currentPage: number;
  filter?: Record<string, any>;
  size?: number;
}

export const usePaginatedFoundLatest = ({
  currentPage,
  filter = {},
  size,
}: UsePaginatedFoundLatestProps) => {
  return useQuery({
    queryKey: ["announces", "latest-found-announces", currentPage, filter],
    queryFn: () => getPaginatedFoundAnnounce(currentPage, filter, size),
  });
};
