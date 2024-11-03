import { IRooms } from "@/models/rooms";
import { useQuery } from "@tanstack/react-query";
import { RoomsAvailableCard } from "./RoomsAvailable/RoomsAvailableCard";
import { api } from "@/lib/axios";
import dayjs from "dayjs";

const MostUsedRooms: React.FC = () => {
  const { data: classrooms } = useQuery<IRooms[]>({
    queryKey: ["mostUseful"],
    queryFn: async () => {
      const response = await api
        .get(
          `/mostUseful?date=${dayjs(new Date()).startOf("day").toISOString()}`
        )
        .then((response) => response.data);

      return response;
    },
  });

  console.log("classrooms", classrooms);

  return (
    <div className="h-64 rounded-md bg-white p-3 font-bold">
      <p className="text-2xl pb-3">Salas e Laboratórios Mais Utilizadas</p>
      <div className="h-48 flex gap-3 overflow-auto">
        {classrooms?.map((classroom) => (
          <RoomsAvailableCard classroom={classroom} />
        ))}
      </div>
    </div>
  );
};

export default MostUsedRooms;
