import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../core/queryClient";
import { createNewDiscussion } from "../../services/discussionService";
import { NewMessageRequest } from "../../types/request";

interface useStartDiscussionProps {
  announceId: string;
}

export const useStartDiscussion = ({ announceId }: useStartDiscussionProps) => {
  return useMutation({
    mutationFn: (payload: NewMessageRequest) =>
      createNewDiscussion(announceId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discussions"] });
      queryClient.invalidateQueries({ queryKey: ["discussions", announceId] });
    },
  });
};
