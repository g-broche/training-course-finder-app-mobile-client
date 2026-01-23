import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getDiscussion } from "../../services/discussionService";

export const useDiscussion = (announceId: string) => {
  const { authState } = useAuth();
  const userToken = authState?.token || "";

  return useQuery({
    queryKey: ["discussion", announceId],
    queryFn: () => getDiscussion(announceId, userToken),
  });
};
