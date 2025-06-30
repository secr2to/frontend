import { Typography } from "@/shared/components";
import { View } from "react-native";
import { clsx } from "@/shared/utils";
import { message } from "../type/type";
import { format } from "date-fns";

interface ChatMessageCardProps {
  isSender?: boolean;
  messageData: message;
  name?: string;
  type?: "ALL" | "MANITO" | "MANITI";
  time?: Date;
}

export default function ChatMessageCard({
  isSender = true,
  name = "",
  type,
  time,
  messageData,
}: ChatMessageCardProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const isToday =
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate();

    if (isToday) {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const period = hours < 12 ? "오전" : "오후";
      const formattedHours = hours % 12 || 12;
      return `${period} ${formattedHours}:${minutes
        .toString()
        .padStart(2, "0")}`;
    } else {
      return format(date, "yy/MM/dd HH:mm");
    }
  };

  return (
    <View
      className={clsx(
        "flex flex-row w-full items-end gap-2 p-2",
        isSender && "justify-end"
      )}
    >
      {isSender && (
        <View className="flex items-end">
          <Typography label={formatDate(new Date(messageData.writeDate))} />
        </View>
      )}
      <View
        className={clsx(
          "flex flex-col gap-2 max-w-[60%]",
          isSender ? "max-w-[70%]" : "max-w-[60%]"
        )}
      >
        {!isSender && (
          <Typography label={type === "MANITO" ? "당신의 마니또" : name} />
        )}
        <View className="flex flex-row items-end gap-2">
          <View
            className={clsx(
              "flex px-4 py-2 rounded-lg relative",
              isSender
                ? type === "ALL"
                  ? "bg-primary"
                  : type === "MANITO"
                  ? "bg-secondary"
                  : "bg-primary2"
                : "bg-white self-end"
            )}
          >
            <Typography label={messageData.content} />
            <View
              className={clsx(
                "absolute w-0 h-0 border-t-[10px] border-t-transparent",
                isSender
                  ? "border-l-[12px] right-[-10px] top-2"
                  : "border-r-[12px] border-r-white left-[-10px] top-2",
                isSender && type === "ALL"
                  ? "border-l-primary"
                  : type === "MANITO"
                  ? "border-l-secondary"
                  : "border-l-primary2"
              )}
            />
          </View>
          {!isSender && (
            <View className="flex items-end flex-grow-[1]">
              <Typography label={formatDate(new Date(messageData.writeDate))} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
