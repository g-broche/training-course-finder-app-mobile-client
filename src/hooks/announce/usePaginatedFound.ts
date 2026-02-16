import { useQuery } from "@tanstack/react-query";
import { getPaginatedFoundAnnounce } from "../../services/announceService";

interface UsePaginatedFoundProps {
  currentPage: number;
  filter?: Record<string, any>;
  size?: number;
}

export const usePaginatedFound = ({
  currentPage,
  filter = {},
  size,
}: UsePaginatedFoundProps) => {
  return useQuery({
    queryKey: ["found-announces", currentPage, filter],
    queryFn: () => getPaginatedFoundAnnounce(currentPage, filter, size),
  });
};
