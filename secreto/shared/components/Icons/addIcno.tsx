import React from "react";
import Svg, { Rect, Line } from "react-native-svg";

export default function AddIcon() {
  return (
    <Svg width="50" height="50" viewBox="0 0 50 50" fill="none">
      <Rect
        x="4.16699"
        y="4.16675"
        width="41.6667"
        height="41.6667"
        rx="5"
        stroke="white"
        stroke-width="1.8"
      />
      <Line
        x1="24.233"
        y1="13.4"
        x2="24.233"
        y2="36.6"
        stroke="white"
        stroke-width="1.8"
        stroke-linecap="round"
      />
      <Line
        x1="13.4"
        y1="25.5583"
        x2="36.6"
        y2="25.5583"
        stroke="white"
        stroke-width="1.8"
        stroke-linecap="round"
      />
    </Svg>
  );
}
