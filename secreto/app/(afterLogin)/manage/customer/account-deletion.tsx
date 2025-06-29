import { useDeleteUser } from "@/entities/main/mypage/query/useDeleteUser";
import { Button, CardPopup, Typography } from "@/shared/components";
import {
  COLOR,
  TYPOGRAPHY_TYPE,
} from "@/shared/components/Typography/constant";
import useUserStore from "@/shared/stores/useUserStore";
import { useState } from "react";
import { Image, View } from "react-native";

export default function AccountDelete() {
  const [openPopup, setOpenPopup] = useState(false);
  const user = useUserStore((state) => state.user);
  const { mutate: deleteUser } = useDeleteUser();
  return (
    <View className="flex-1 bg-default-background">
      <View className="flex-1 p-8 gap-4">
        <Typography
          label={`
Secreto를 탈퇴하기 전
아래 유의사항을 확인해주세요
            `}
          style={TYPOGRAPHY_TYPE.MAIN_TITLE}
        />
        <View className="flex w-full p-3 bg-inactive-background rounded-lg gap-2">
          <Typography
            label="탈퇴 시 계정과 관련된 모든 권한이 사라지며 복구할 수 없습니다."
            color={COLOR.BASE}
          />
          <Typography
            label="직접 장성한 콘텐츠(피드, 댓글 등)는 자동으로 삭제되지 않으며, 만일 삭제를 원하시면 탈퇴 이전에 삭제가 필요합니다."
            color={COLOR.BASE}
          />
          <Typography
            label="탈퇴 시 계정과 관련된 모든 권한이 사라지며 복구할 수 없습니다."
            color={COLOR.BASE}
          />
          <Typography
            label="탈퇴 후 동일한 메일로 재가입이 가능하나, 탈퇴한 계정과 연동되지 않습니다."
            color={COLOR.BASE}
          />
          <Typography
            label="탈퇴 후 연동된 소셜 계정 정보도 사라지며 소셜 로그인으로 기존 계정 이용이 불가능합니다."
            color={COLOR.BASE}
          />
        </View>
        <View className="absolute flex w-full self-center bottom-10">
          <Button
            label="위 내용 모두 확인 및 동의합니다."
            size="large"
            onPress={() => setOpenPopup(true)}
          />
        </View>
      </View>
      {openPopup && (
        <CardPopup
          onSuccess={() => user && deleteUser(user.userId)}
          confirmLabel="탈퇴하기"
          onClose={() => setOpenPopup(false)}
          cancelLabel="고민해보기"
          onCancel={() => setOpenPopup(false)}
        >
          <Typography
            label="정말로 탈퇴하시겠습니까?"
            style={TYPOGRAPHY_TYPE.MAIN_TITLE}
            color={COLOR.BASE}
          />
          <Image source={require("@/shared/images/crying.png")} />
          <Typography
            label="탈퇴 시 계정과 관련된 모든 권한이 사라지며 복구할 수 없습니다."
            color={COLOR.BASE}
          />
          <Typography
            label="탈퇴 후 동일한 메일로 재가입이 가능하나, 탈퇴한 계정과 연동되지 않습니다."
            color={COLOR.BASE}
          />
        </CardPopup>
      )}
    </View>
  );
}
