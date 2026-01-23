import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { addMessage } from "../../services/discussionService";
import { NewMessageRequest } from "../../types/request";

interface useContinueDiscussionProps {
  discussionId?: string | null;
}

export const useContinueDiscussion = ({
  discussionId,
}: useContinueDiscussionProps) => {
  const { authState } = useAuth();
  const userToken = authState?.token || "";
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: NewMessageRequest) =>
      addMessage(discussionId, payload, userToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discussion"] });
    },
  });
};
