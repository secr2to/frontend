import { useQuery } from "@tanstack/react-query";
import { chattingMessagesResponse, message } from "../type/type";
import { getChattings } from "../api/getChattingList";

export const useGetChattings = (
  roomId: string,
  type: "ALL" | "MANITO" | "MANITI"
) => {
  return useQuery<
    chattingMessagesResponse,
    Error,
    message[],
    [_1: string, _2: string, _3: "ALL" | "MANITO" | "MANITI"]
  >({
    queryKey: ["chattingMessages", roomId, type],
    queryFn: () => getChattings(roomId, type),
    select: (data) => {
      return data.data;
    },
  });
};
