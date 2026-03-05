import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getAllAnnounceDiscussions } from "../../services/discussionService";

interface UseAnnounceDiscussionsProps {
  announceId: string;
}

export const useAnnounceDiscussions = ({
  announceId,
}: UseAnnounceDiscussionsProps) => {
  const { authState } = useAuth();
  const hasAccessToken = !!authState?.accessToken;
  const isEnabled = !!announceId && hasAccessToken;
  return useQuery({
    queryKey: ["discussions", announceId],
    queryFn: () => getAllAnnounceDiscussions(announceId),
    enabled: isEnabled,
  });
};
