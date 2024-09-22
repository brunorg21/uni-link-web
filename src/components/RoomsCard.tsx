import { IRooms } from "@/models/rooms";
import { Button } from "./ui/button";
import { Bell } from "lucide-react";
import { AlocationDrawer } from "./alocation-drawer";
import { Sheet, SheetTrigger } from "./ui/sheet";

interface roomsProps {
  classroom: IRooms;
}
const RoomsCard = ({ classroom }: roomsProps) => {
  return (
    <div className="flex flex-wrap md:flex-row sm:flex-col flex-col bg-secondary rounded-lg p-6 items-center justify-between">
      <span className="flex justify-center items-center bg-emerald-400 rounded-full p-3 w-[120px] font-semibold">
        Disponível
      </span>
      <div className="flex flex-col items-center gap-4">
        <span className="text-xl">{classroom.name}</span>
        <div className="flex flex-col items-center">
          <p className="text-md text-gray-400 font-bold">
            Capacidade: {classroom.capacity} Alunos
          </p>
          <p className="text-md text-gray-400 font-bold">
            Computadores: {classroom.computers}
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <span className="text-md text-red-500 font-bold">18:45 - 19:35</span>
        <span className="text-md text-zinc-800 font-bold">19:35 - 20:25</span>
        <span className="text-md text-red-500 font-bold">20:35 - 21:25</span>
        <span className="text-md text-zinc-800 font-bold">21:25 - 22:15</span>
        <span className="text-md text-zinc-800 font-bold">22:15 - 23:05</span>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button size={"default"} className="flex items-center gap-2 text-md">
            <Bell />
            Reservar
          </Button>
        </SheetTrigger>
        <AlocationDrawer roomName={classroom.name} />
      </Sheet>
    </div>
  );
};

export default RoomsCard;
