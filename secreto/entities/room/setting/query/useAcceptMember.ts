import { useMutation } from "@tanstack/react-query";
import { changeMemberResponse } from "../type/type";
import { accepMember } from "../api/manageMember";

export const useAcceptMember = () => {
  return useMutation<
    changeMemberResponse,
    Error,
    { roomId: string; roomUserId: number }
  >({
    mutationFn: ({ roomId, roomUserId }) => accepMember(roomId, roomUserId),
  });
};
