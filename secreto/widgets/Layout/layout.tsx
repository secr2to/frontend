import { Tabs } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import { menuItem } from "./constant";
import { useThemeColors } from "@/shared/themes/useTheme";
import { BackButton, CustomTitle } from "../header";

interface TabLayoutProps {
  navData: menuItem[];
}

export default function Layout({ navData }: TabLayoutProps) {
  const theme = useThemeColors();
  return (
    <Tabs
      backBehavior="none"
      screenOptions={{
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
