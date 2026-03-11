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
  const userId = authState?.user?.uuid;
  const isEnabled = !!authState?.accessToken && !!userId;

  return useQuery({
    queryKey: ["announces", "user-announces", userId, currentPage, size],
    queryFn: () => getPaginatedUserAnnounces(currentPage, size),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
    enabled: isEnabled,
  });
};
