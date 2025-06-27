import { Profile, Typography } from "@/shared/components";
import { View } from "react-native";
import { clsx } from "@/shared/utils";
interface ChatMessageCardProps {
  imageUri?: string;
  isSender?: boolean;
  message: string;
  name?: string;
  type?: "ALL" | "MANITO" | "MANITI";
  time?: Date;
}

export default function ChatMessageCard({
  imageUri = "1",
  isSender = true,
  name = "익명",
  type,
  time,
  message = "",
}: ChatMessageCardProps) {
  return (
    <View
      className={clsx(
        "flex flex-row w-full items-end gap-2 pr-2",
        isSender && "justify-end"
      )}
    >
      {!isSender && imageUri && (
        <View>
          <Profile imageUri={imageUri} size="medium" />
        </View>
      )}
      {isSender && (
        <View className="flex items-end">
          <Typography label={time?.toISOString() || "2025-08-20"} />
        </View>
      )}
      <View
        className={clsx(
          "flex flex-col gap-2 max-w-[60%]",
          isSender ? "max-w-[75%]" : "max-w-[60%]"
        )}
      >
        {!isSender && <Typography label={name} />}
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
            <Typography label={message} />
            <View
              className={clsx(
                "absolute w-0 h-0 border-t-[10px] border-t-transparent",
                isSender
                  ? "border-l-[12px] right-[-10px] top-5"
                  : "border-r-[12px] border-r-white left-[-10px] top-5",
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
              <Typography label={time?.toISOString() || "2025/08/20"} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
