import Menu from "@/entities/main/mypage/component/menu";
import { router } from "expo-router";
import { View } from "react-native";

export default function Customer() {
  return (
    <View className="flex-1 bg-default-background">
      <View className="flex-1 p-10 gap-8">
        <Menu
          label="Secreto 이용약관"
          route={() => router.push("/manage/customer/terms")}
        />
        <Menu
          label="개인정보 처리방침"
          route={() => router.push("/manage/customer/privacy-policy")}
        />
        <Menu
          label="계정 탈퇴"
          route={() => router.push("/manage/customer/account-deletion")}
        />
      </View>
    </View>
  );
}
