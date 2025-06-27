import { Tabs, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import { menuItem } from "./constant";
import { useThemeColors } from "@/shared/themes/useTheme";
import { BackButton, CustomTitle } from "../header";

interface TabLayoutProps {
  navData: menuItem[];
  headerShown?: boolean;
}

export default function Layout({
  navData,
  headerShown = true,
}: TabLayoutProps) {
  const { roomId } = useLocalSearchParams() as { roomId: string };

  const theme = useThemeColors();
  return (
    <Tabs
      backBehavior="none"
      screenOptions={{
        headerShown: headerShown,
        headerStyle: {
          backgroundColor: theme.baseBackground,
        },
        tabBarStyle: {
          backgroundColor: theme.baseBackground,
          borderTopWidth: 1,
          paddingVertical: 5,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "bold",
        },
        tabBarInactiveTintColor: theme.unselected,
        tabBarActiveTintColor: theme.selected,
      }}
    >
      {navData.map((item) => (
        <Tabs.Screen
          key={item.label}
          name={item.path}
          initialParams={{ roomId }}
          options={{
            headerTitle: () => <CustomTitle />,
            headerLeft: () => <BackButton />,
            tabBarLabel: item.label,
            tabBarIcon: ({ focused }) => (
              <View className="size-[25px]">
                <Image
                  source={focused ? item.activeSource : item.source}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="contain"
                />
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
