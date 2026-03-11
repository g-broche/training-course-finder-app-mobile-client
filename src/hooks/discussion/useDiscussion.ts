import { useQuery } from "@tanstack/react-query";
import { getDiscussion } from "../../services/discussionService";

interface UseDiscussionProps {
  discussionId: string;
}

export const useDiscussion = ({ discussionId }: UseDiscussionProps) => {
  return useQuery({
    queryKey: ["discussion", discussionId],
    queryFn: () => getDiscussion(discussionId),
  });
};
