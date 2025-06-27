import { useMutation } from "@tanstack/react-query";
import { changeMemberResponse } from "../type/type";
import { denyMember } from "../api/manageMember";

export const useDenyMember = () => {
  return useMutation<
    changeMemberResponse,
    Error,
    { roomId: string; roomUsers: number[] }
  >({
    mutationFn: ({ roomId, roomUsers }) => denyMember(roomId, roomUsers),
  });
};
