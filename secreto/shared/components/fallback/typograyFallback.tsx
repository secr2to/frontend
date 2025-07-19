import { clsx } from "@/shared/utils";
import { View } from "react-native";

interface TypographyFallbackProps {
  length?: "short" | "medium" | "long";
  size?: "small" | "medium" | "large";
  className?: string;
}

export default function TypographyFallback({
  length = "short",
  size = "small",
  className,
}: TypographyFallbackProps) {
  const lengthClasses = {
    short: "w-16",
    medium: "w-24",
    long: "w-32",
  };

  const sizeClasses = {
    small: "h-4",
    medium: "h-6",
    large: "h-8",
  };

  return (
    <View
      className={clsx(
        lengthClasses[length],
        sizeClasses[size],
        className,
        "bg-inactive-background animate-pulse"
      )}
    ></View>
  );
}
