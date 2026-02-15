import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getAllAnnounceDiscussions } from "../../services/discussionService";

export const useAnnounceDiscussions = (announceId: string) => {
  const { authState } = useAuth();
  const userToken = authState?.token || null;
  const isEnabled = !!announceId && !!userToken;
  return useQuery({
    queryKey: ["discussions", announceId],
    queryFn: () => getAllAnnounceDiscussions(announceId, userToken),
    enabled: isEnabled,
  });
};
