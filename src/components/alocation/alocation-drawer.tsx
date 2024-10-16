import { SheetContent, SheetDescription, SheetHeader } from "../ui/sheet";

import { IRooms } from "@/models/rooms";
import { AlocationTeacherForm } from "./alocation-teacher-form";

interface AlocationDrawerProps {
  classroom: IRooms;
}

export function AlocationDrawer({ classroom }: AlocationDrawerProps) {
  return (
    <SheetContent className="space-y-2">
      <SheetHeader className="text-xl">{classroom.name} </SheetHeader>
      <SheetDescription>Faça uma nova reserva para a sala</SheetDescription>

      <AlocationTeacherForm classroom={classroom} />
    </SheetContent>
  );
}
