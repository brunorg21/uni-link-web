import { IRooms } from "@/models/rooms";
import { RoomsAvailableCard } from "./RoomsAvailableCard";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import dayjs from "dayjs";

const RoomsAvailable: React.FC = () => {
  const [date, setDate] = useState<Date>();

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
    <div className="h-64 rounded-md bg-white p-3 font-bold row-span-1">
      <p className="text-2xl pb-3">Salas e Laboratórios Disponíveis</p>
      <div className="h-48 flex gap-3 overflow-auto">
        {classrooms?.map((classroom) => (
          <RoomsAvailableCard classroom={classroom} />
        ))}
      </div>
    </div>
  );
};

export default RoomsAvailable;
