import { useMutation } from "@tanstack/react-query";
import { changeMemberResponse } from "../type/type";
import { denyMember } from "../api/manageMember";

export const useDenyMember = () => {
  return useMutation<
    changeMemberResponse,
    Error,
    { roomId: string; roomUserId: number }
  >({
    mutationFn: ({ roomId, roomUserId }) => denyMember(roomId, roomUserId),
  });
};
