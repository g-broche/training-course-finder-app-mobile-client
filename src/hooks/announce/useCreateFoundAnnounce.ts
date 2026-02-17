import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { queryClient } from "../../core/queryClient";
import { createNewFoundAnnounce } from "../../services/announceService";
import { FoundItemRequest } from "../../types/request";

interface CreateFoundAnnounceProps {
  data: FoundItemRequest;
  image: {
    uri: string;
    type: string;
    name: string;
  };
}

export const useCreateFoundAnnounce = () => {
  const { authState } = useAuth();
  const accessToken = authState?.accessToken || "";

  return useMutation({
    mutationFn: ({ data, image }: CreateFoundAnnounceProps) =>
      createNewFoundAnnounce(data, image, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["announces"],
      });
    },
  });
};
