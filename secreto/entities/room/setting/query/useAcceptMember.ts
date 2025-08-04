import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeMemberResponse } from "../type/type";
import { accepMember } from "../api/manageMember";

export const useAcceptMember = () => {
  const queryClient = useQueryClient();
  return useMutation<
    changeMemberResponse,
    Error,
    { roomId: string; roomUsers: number[] }
  >({
    mutationFn: ({ roomId, roomUsers }) => accepMember(roomId, roomUsers),
    onSuccess: (data, variables) => {
      queryClient.refetchQueries({
        queryKey: ["getRoomMembersInfo", variables.roomId],
      });
    },
  });
};
