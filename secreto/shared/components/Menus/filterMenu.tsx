import React, { Dispatch, SetStateAction } from "react";
import { View, Pressable } from "react-native";
import { MenuItem } from "./constant";
import { clsx } from "@/shared/utils";
import Typography from "../Typography/typography";
import { COLOR, TYPOGRAPHY_TYPE } from "../Typography/constant";

interface FilterMenuProps {
  items: MenuItem[];
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  className?: string;
}

export default function FilterMenu({
  items,
  state,
  setState,
  className,
}: FilterMenuProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <View className={clsx("flex w-full flex-row", className)}>
      {items.map((item, index) => {
        const isActive = item.state === state;
        const isFirst = index === 0;
        const isLast = index === items.length - 1;

        return (
          <Pressable
            key={index.toString()}
            className={clsx(
              "flex-1 h-10 flex items-center justify-center border border-primary",
              isActive ? "bg-active-background" : "bg-inactive-background",
              isFirst && "rounded-l-md",
              isLast && "rounded-r-md"
            )}
            onPress={() => setState(item.state)}
          >
            <Typography
              style={TYPOGRAPHY_TYPE.MAIN_TITLE}
              label={item.label}
              color={isActive ? COLOR.ACTIVE : COLOR.INACTIVE}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
