import { useLocalSearchParams } from "expo-router";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface ReplyContextProps {
  roomId: string;
  feedId: number;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  parentReplyId: number | undefined;
  setParentReplyId: Dispatch<SetStateAction<number | undefined>>;
  mentionUserId: number | undefined;
  setMentionUserId: Dispatch<SetStateAction<number | undefined>>;
  mentionUserName: string;
  setMentionUserName: Dispatch<SetStateAction<string>>;
  mode: "modify" | "delete" | "menu" | undefined;
  setMode: Dispatch<SetStateAction<"modify" | "delete" | "menu" | undefined>>;
  targetId: number | undefined;
  setTargetId: Dispatch<SetStateAction<number | undefined>>;
  activateMenuId: number | undefined;
  setActivateMenuId: Dispatch<SetStateAction<number | undefined>>;
  clearState: () => void;
  isRoot: boolean;
  setIsRoot: Dispatch<SetStateAction<boolean>>;
}

export const ReplyContext = createContext<ReplyContextProps | null>(null);

export default function ReplyContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { roomId, feedId } = useLocalSearchParams() as {
    roomId: string;
    feedId: string;
  };
  const [comment, setComment] = useState("");
  const [parentReplyId, setParentReplyId] = useState<number | undefined>(
    undefined
  );
  const [mentionUserId, setMentionUserId] = useState<number | undefined>(
    undefined
  );
  const [mentionUserName, setMentionUserName] = useState<string>("");
  const [mode, setMode] = useState<"modify" | "delete" | "menu" | undefined>(
    undefined
  );
  const [targetId, setTargetId] = useState<number | undefined>(undefined);
  const [activateMenuId, setActivateMenuId] = useState<number | undefined>(
    undefined
  );
  const [isRoot, setIsRoot] = useState<boolean>(true);

  useEffect(() => {
    console.log(
      "with",
      comment,
      parentReplyId,
      mentionUserId,
      mentionUserName,
      mode,
      targetId,
      activateMenuId,
      isRoot
    );
  }, [
    comment,
    parentReplyId,
    mentionUserId,
    mentionUserName,
    mode,
    targetId,
    activateMenuId,
    isRoot,
  ]);

  const clearState = () => {
    setComment("");
    setParentReplyId(undefined);
    setMentionUserId(undefined);
    setMentionUserName("");
    setMode(undefined);
    setTargetId(undefined);
    setActivateMenuId(undefined);
    setIsRoot(true);
  };

  return (
    <ReplyContext.Provider
      value={{
        isRoot,
        setIsRoot,
        roomId,
        feedId: Number(feedId),
        comment,
        setComment,
        parentReplyId,
        setParentReplyId,
        mentionUserId,
        setMentionUserId,
        mentionUserName,
        setMentionUserName,
        mode,
        setMode,
        targetId,
        setTargetId,
        activateMenuId,
        setActivateMenuId,
        clearState,
      }}
    >
      {children}
    </ReplyContext.Provider>
  );
}
