import { useQuery } from "@tanstack/react-query";
import { getPaginatedLostAnnounce } from "../../services/announceService";

interface UsePaginatedLostProps {
  currentPage: number;
  filter?: Record<string, any>;
  size?: number;
}

export const usePaginatedLost = ({
  currentPage,
  filter = {},
  size,
}: UsePaginatedLostProps) => {
  return useQuery({
    queryKey: ["lost-announces", currentPage, filter],
    queryFn: () => getPaginatedLostAnnounce(currentPage, filter, size),
  });
};
