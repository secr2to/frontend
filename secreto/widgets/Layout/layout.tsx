import { Tabs } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import { menuItem } from "./constant";

interface TabLayoutProps {
  navData: menuItem[];
}

export default function Layout({ navData }: TabLayoutProps) {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "var(--baseBackground)",
          borderTopWidth: 1,
          borderTopColor: "var(--grayLight)",
          paddingVertical: 5,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarLabelStyle: {
          fontSize: 8,
          fontWeight: "bold",
        },
        tabBarInactiveTintColor: "var(--unselected)",
        tabBarActiveTintColor: "var(--selected)",
      }}
    >
      {navData.map((item) => (
        <Tabs.Screen
          key={item.label}
          name={item.path}
          options={{
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
