import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getPaginatedUserAnnounces } from "../../services/announceService";

export const usePaginatedUserAnnounces = (currentPage: number) => {
  const { authState } = useAuth();
  const userToken = authState?.token || "";

  return useQuery({
    queryKey: ["user-announces", currentPage],
    queryFn: () => getPaginatedUserAnnounces(currentPage, userToken),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
    enabled: !!userToken,
  });
};
