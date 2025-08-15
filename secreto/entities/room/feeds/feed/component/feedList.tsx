import { FlashList } from "@shopify/flash-list";
import Feed from "./feed";
import { useGetFeeds } from "../query/useGetFeed";
import { CardPopup, Spacing, Typography } from "@/shared/components";
import EmptyFeed from "./feedEmpty";
import { useState } from "react";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";

interface FeedListProps {
  roomId: string;
}

export default function FeedList({ roomId }: FeedListProps) {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetFeeds(roomId);
  const [openMenu, setOpenMenu] = useState<number | undefined>(undefined);
  const [mode, setMode] = useState<"modify" | "delete" | undefined>(undefined);
  const [targetId, setTargetId] = useState<number | undefined>(undefined);
  console.log("mode", mode, "targetId", targetId);

  return (
    <>
      <FlashList
        key={roomId}
        data={data}
        extraData={openMenu}
        renderItem={({ item }) => (
          <Feed
            feed={item}
            roomId={roomId}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            setTargetId={setTargetId}
            setMode={setMode}
          />
        )}
        keyExtractor={(item) => item.feedId.toString()}
        ItemSeparatorComponent={() => <Spacing size={8} />}
        ListEmptyComponent={<EmptyFeed />}
        estimatedItemSize={800}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
      />
      {mode === "delete" && (
        <CardPopup
          onClose={() => {
            setMode(undefined);
            setOpenMenu(undefined);
          }}
          onSuccess={() => {
            alert("게시글이 삭제되었습니다.");
            setMode(undefined);
            setOpenMenu(undefined);
          }}
          confirmLabel="확인"
          cancelLabel="취소"
          onCancel={() => {
            setMode(undefined);
            setOpenMenu(undefined);
          }}
        >
          <Typography
            label="작성한 게시글을 정말 삭제하시겠습니까?"
            style={TYPOGRAPHY_TYPE.SUB_BOLD}
            color={COLOR.BASE}
          />
        </CardPopup>
      )}
    </>
  );
}
