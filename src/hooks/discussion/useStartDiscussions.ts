import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { queryClient } from "../../core/queryClient";
import { createNewDiscussion } from "../../services/discussionService";
import { NewMessageRequest } from "../../types/request";

interface useStartDiscussionProps {
  announceId: string;
}

export const useStartDiscussion = ({ announceId }: useStartDiscussionProps) => {
  const { authState } = useAuth();
  const userToken = authState?.token || "";

  return useMutation({
    mutationFn: (payload: NewMessageRequest) =>
      createNewDiscussion(announceId, payload, userToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discussions"] });
    },
  });
};
