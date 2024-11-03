import { SheetContent, SheetDescription, SheetHeader } from "../ui/sheet";

import { IRooms } from "@/models/rooms";
import { AlocationTeacherForm } from "./alocation-teacher-form";
import { useUser } from "@/contexts/user-context";
import { AlocationAdminForm } from "./alocation-admin-form";

interface AlocationDrawerProps {
  classroom: IRooms;
}

export function AlocationDrawer({ classroom }: AlocationDrawerProps) {
  const { user } = useUser();

  return (
    <SheetContent className="space-y-2">
      <SheetHeader className="text-xl">{classroom.name} </SheetHeader>
      <SheetDescription>Faça uma nova reserva para a sala</SheetDescription>

      {user && user.role === "TEACHER" && (
        <AlocationTeacherForm classroom={classroom} />
      )}

      {user && user.role === "ADMIN" && (
        <AlocationAdminForm classroom={classroom} />
      )}
    </SheetContent>
  );
}
