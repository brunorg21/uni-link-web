import RoomsAvailable from "../../components/RoomsAvailable/RoomsAvailable";
import MostUsedRooms from "../../components/MostUsedRooms";
import { Dayjs } from "dayjs";

interface TeacherHomeProps {
  date: Dayjs | null;
}
export function TeacherHome({ date }: TeacherHomeProps) {
  return (
    <>
      <RoomsAvailable date={date} />
      <MostUsedRooms date={date} />
    </>
  );
}
