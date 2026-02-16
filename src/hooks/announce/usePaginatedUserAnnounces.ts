import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getPaginatedUserAnnounces } from "../../services/announceService";

interface UsePaginatedUserAnnouncesProps {
  currentPage: number;
  size?: number;
}

export const usePaginatedUserAnnounces = ({
  currentPage,
  size,
}: UsePaginatedUserAnnouncesProps) => {
  const { authState } = useAuth();
  const userToken = authState?.token || "";

  return useQuery({
    queryKey: ["user-announces", currentPage],
    queryFn: () => getPaginatedUserAnnounces(currentPage, userToken, size),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
    enabled: !!userToken,
  });
};
