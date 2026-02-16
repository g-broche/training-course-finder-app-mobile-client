import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getDiscussion } from "../../services/discussionService";

interface UseDiscussionProps {
  announceId: string;
}

export const useDiscussion = ({ announceId }: UseDiscussionProps) => {
  const { authState } = useAuth();
  const userToken = authState?.token || "";

  return useQuery({
    queryKey: ["discussion", announceId],
    queryFn: () => getDiscussion(announceId, userToken),
  });
};
