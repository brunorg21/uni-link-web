import { IRooms } from "@/models/rooms";
import { useQuery } from "@tanstack/react-query";
import { RoomsAvailableCard } from "./RoomsAvailable/RoomsAvailableCard";
import { api } from "@/lib/axios";
import dayjs, { Dayjs } from "dayjs";
import { useUser } from "@/contexts/user-context";

interface MostUsedRoomsProps {
  date: Dayjs | null;
}
const MostUsedRooms: React.FC<MostUsedRoomsProps> = ({ date }) => {
  const { user } = useUser();

  const { data: classrooms } = useQuery<IRooms[]>({
    queryKey: ["mostUseful", date],
    queryFn: async () => {
      const response = await api
        .get(
          `/mostUseful?userId=${user?.id}&date=${
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
