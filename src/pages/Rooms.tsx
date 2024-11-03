import { Button } from "@/components/ui/button";
import RoomsCard from "../components/RoomsCard";
import { BookMarkedIcon, PlusCircle } from "lucide-react";
import { useUser } from "@/contexts/user-context";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { IRooms } from "@/models/rooms";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { RoomModal } from "@/components/room-modal";

import { DatePicker } from "@/components/ui/date-picker";
import { useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const Rooms: React.FC = () => {
  const [date, setDate] = useState<Date>();
  const { user } = useUser();

  const { data: classrooms } = useQuery<IRooms[]>({
    queryKey: ["classrooms", date],
    queryFn: async () => {
      const response = await api
        .get(
          `/classrooms?date=${
            date
              ? date.toISOString()
              : dayjs(new Date()).startOf("day").toISOString()
          }`
        )
        .then((response) => response.data);

      return response;
    },
  });

  return (
    <div className="h-full px-6 py-4 w-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-secondary text-3xl">Salas e Laboratórios</p>
          <p className="text-gray-400 text-xl">Alocação</p>
        </div>
        {user?.role === "ADMIN" && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant={"secondary"}
                className="flex items-center gap-2 p-4"
              >
                <PlusCircle size={20} /> Adicionar nova sala
              </Button>
            </DialogTrigger>
            <RoomModal />
          </Dialog>
        )}
      </div>
      <div className="mb-5">
        <span className="text-secondary text-lg mr-3">Filtros:</span>
        <DatePicker
          date={date ? date : dayjs(new Date()).toDate()}
          setDate={setDate}
        />
      </div>
      <div className="flex flex-col space-y-2 h-[90%] overflow-y-auto rounded-lg">
        {classrooms &&
          (classrooms.length > 0 ? (
            classrooms?.map((e: IRooms) => (
              <RoomsCard key={e.id} classroom={e} />
            ))
          ) : (
            <div className="flex gap-4 justify-center items-center text-secondary text-2xl h-[500px] w-full">
              <BookMarkedIcon size={70} />
              <div className="flex flex-col gap-4 items-center">
                <p>Gerencie as salas para sua instituição</p>
                <span className="text-zinc-400">Nenhuma sala encontrada.</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Rooms;
