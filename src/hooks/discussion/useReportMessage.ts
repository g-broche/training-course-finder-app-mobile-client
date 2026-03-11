import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../core/queryClient";
import { reportMessage } from "../../services/discussionService";

interface useReportMessageProps {
  discussionId: string;
  messageId: string;
}

export const useReportMessage = ({
  discussionId,
  messageId,
}: useReportMessageProps) => {
  return useMutation({
    mutationFn: () => reportMessage(discussionId, messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discussion"] });
    },
  });
};
