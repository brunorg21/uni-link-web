import LabsAlocated from "@/components/RoomsAlocated/LabsAlocated";
import RoomsAlocated from "@/components/RoomsAlocated/RoomsAlocated";
import { Dayjs } from "dayjs";

interface AdminHomeProps {
  date: Dayjs | null;
}
export function AdminHome({ date }: AdminHomeProps) {
  return (
    <div className="">
      <RoomsAlocated date={date} />;
      <LabsAlocated date={date} />
    </div>
  );
}
