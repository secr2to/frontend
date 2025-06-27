import { useMutation } from "@tanstack/react-query";
import { changeMemberResponse } from "../type/type";
import { accepMember } from "../api/manageMember";

export const useAcceptMember = () => {
  return useMutation<
    changeMemberResponse,
    Error,
    { roomId: string; roomUsers: number[] }
  >({
    mutationFn: ({ roomId, roomUsers }) => accepMember(roomId, roomUsers),
  });
};
