import { IRooms } from "@/models/rooms";
import { Button } from "./ui/button";

interface roomsProps {
  classroom: IRooms;
}
const RoomsCard = ({ classroom }: roomsProps) => {
  return (
    <div className="flex flex-wrap md:flex-row sm:flex-col flex-col bg-[#272727] rounded-lg justify-center p-6 items-center justify-between">
      <span className="flex justify-center items-center bg-emerald-400 rounded-full p-3 w-[120px] font-semibold">
        Disponível
      </span>
      <div className="flex flex-col items-center gap-4">
        <span className="text-white text-2xl">{classroom.name}</span>
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
        <span className="text-lg text-red-400 font-bold">18:45 - 19:35</span>
        <span className="text-lg text-gray-400 font-bold">19:35 - 20:25</span>
        <span className="text-lg text-red-400 font-bold">20:35 - 21:25</span>
        <span className="text-lg text-gray-400 font-bold">21:25 - 22:15</span>
        <span className="text-lg text-gray-400 font-bold">22:15 - 23:05</span>
      </div>
      <Button variant={"secondary"} size={"lg"} className="text-lg">
        Reservar
      </Button>
    </div>
  );
};

export default RoomsCard;
