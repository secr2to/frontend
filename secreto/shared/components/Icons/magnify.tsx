import React from "react";
import Svg, { Path, Circle } from "react-native-svg";

export default function MagnifyIcon() {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Circle
        cx="8.33301"
        cy="8.33325"
        r="6.6"
        stroke="#808080"
        stroke-width="1.8"
      />
      <Path
        d="M18.333 18.3333L13.333 13.3333"
        stroke="#808080"
        stroke-width="1.8"
        stroke-linecap="round"
      />
    </Svg>
  );
}
