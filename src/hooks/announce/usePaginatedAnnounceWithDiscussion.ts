import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getPaginatedAnnounceWithDiscussions } from "../../services/announceService";

interface UsePaginatedAnnounceWithDiscussionProps {
  currentPage: number;
  size?: number;
}

export const usePaginatedAnnounceWithDiscussion = ({
  currentPage,
  size,
}: UsePaginatedAnnounceWithDiscussionProps) => {
  const { authState } = useAuth();
  const userId = authState?.user?.uuid;
  const isEnabled = !!authState?.accessToken && !!userId;

  return useQuery({
    queryKey: ["announces", "with-discussions", userId, currentPage, size],
    queryFn: () => getPaginatedAnnounceWithDiscussions(currentPage, size),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
    enabled: isEnabled,
  });
};
