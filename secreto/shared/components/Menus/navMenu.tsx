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

export default function NavMenu({
  items,
  state,
  setState,
  className,
}: NavMenuProps) {
  return (
    <View
      className={clsx(
        "flex items-center justify-center border-t border-b border-grayLight",
        className
      )}
    >
      <View className="flex flex-row w-full">
        {items.map((item) => (
          <Pressable
            key={item.label}
            onPress={() => setState(item.state)}
            className={clsx(
              "flex-1 w-full py-2 bg-base-background",
              item.state === state && "border-b-[2px] border-primary"
            )}
          >
            <Typography
              style={TYPOGRAPHY_TYPE.MAIN_TITLE}
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
