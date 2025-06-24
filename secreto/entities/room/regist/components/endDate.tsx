import { Typography } from "@/shared/components";
import { TYPOGRAPHY_TYPE } from "@/shared/components/Typography/constant";
import { Dispatch, SetStateAction } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

interface RegistRoomNameProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}
export default function RegistEndDate({ date, setDate }: RegistRoomNameProps) {
  return (
    <>
      <Typography
        label="마니또 종료일은 언제로 할까요?"
        style={TYPOGRAPHY_TYPE.MAIN_TITLE}
      />
      <DateTimePicker
        value={date}
        mode="date"
        locale="ko-KR"
        display="inline"
        minimumDate={new Date(new Date().setDate(new Date().getDate() + 3))}
        maximumDate={new Date(new Date().setDate(new Date().getDate() + 31))}
        onChange={(event, selectedDate) => {
          if (selectedDate) {
            selectedDate.setHours(9, 0, 0, 0);
            setDate(selectedDate);
          }
        }}
      />
    </>
  );
}
