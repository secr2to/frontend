import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeMemberResponse } from "../type/type";
import { denyMember } from "../api/manageMember";

export const useDenyMember = () => {
  const queryClient = useQueryClient();
  return useMutation<
    changeMemberResponse,
    Error,
    { roomId: string; roomUsers: number[] }
  >({
    mutationFn: ({ roomId, roomUsers }) => denyMember(roomId, roomUsers),
    onSuccess: (data, variables) => {
      queryClient.refetchQueries({
        queryKey: ["getRoomMembersInfo", variables.roomId],
      });
    },
  });
};
