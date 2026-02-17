import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
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
  const { authState } = useAuth();
  const userToken = authState?.accessToken || "";
  return useMutation({
    mutationFn: () => reportMessage(discussionId, messageId, userToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discussion"] });
    },
  });
};
