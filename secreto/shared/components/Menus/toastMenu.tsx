import { Pressable, View } from "react-native";
import Typography from "../Typography/typography";
import { COLOR, TYPOGRAPHY_TYPE } from "../Typography/constant";

interface ToastMenu {
  label: string;
  onPress: () => void;
}

interface ToastMenuProps {
  menu: ToastMenu[];
}

export default function ToastMenu({ menu }: ToastMenuProps) {
  return (
    <View
      className="absolute top-0 right-0 bg-base-background
             shadow-md rounded-md p-2"
    >
      {menu.map((item, index) => (
        <Pressable onPress={item.onPress} key={index} className="px-4 py-2">
          <Typography
            label={item.label}
            style={TYPOGRAPHY_TYPE.SUB_BOLD}
            color={COLOR.BASE}
          />
        </Pressable>
      ))}
    </View>
  );
}
