import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMessage } from "../../services/discussionService";
import { NewMessageRequest } from "../../types/request";

interface useContinueDiscussionProps {
  discussionId?: string | null;
}

export const useContinueDiscussion = ({
  discussionId,
}: useContinueDiscussionProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: NewMessageRequest) =>
      addMessage(discussionId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discussion", discussionId] });
    },
  });
};
