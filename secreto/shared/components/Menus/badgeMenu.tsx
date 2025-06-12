import React, { Dispatch, SetStateAction, useState } from "react";
import { View, Pressable } from "react-native";

import { MenuItem } from "./constant";
import { clsx } from "@/shared/utils";
import Typography from "../Typography/typography";
import { COLOR, TYPOGRAPHY_TYPE } from "../Typography/constant";

interface NavMenuProps {
  items: MenuItem[];
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  className?: string;
}

export default function BadgeMenu({
  items,
  state,
  setState,
  className,
}: NavMenuProps) {
  return (
    <View className={clsx("flex px-2", className)}>
      <View className="flex flex-row h-[40px] items-center justify-end gap-4">
        {items.map((item) => (
          <Pressable
            key={item.label}
            onPress={() => setState(item.state)}
            className={clsx(
              "px-4 py-1 rounded-full border border-inactive-background",
              item.state === state && "border-primary"
            )}
          >
            <Typography
              style={TYPOGRAPHY_TYPE.BODY_BOLD}
              label={item.label}
              color={item.state === state ? COLOR.SELECTED : COLOR.GRAYDARK}
              className={clsx(
                item.state === state ? "text-selected" : "text-unselected",
                "text-center"
              )}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}
