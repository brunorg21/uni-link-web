import { Button } from "@/components/ui/button";
import RoomsCard from "../components/RoomsCard";
import { PlusCircle } from "lucide-react";
import { useUser } from "@/contexts/user-context";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { IRooms } from "@/models/rooms";

const Rooms: React.FC = () => {
  const { user } = useUser();
  const { data: classrooms } = useQuery<IRooms[]>({
    queryKey: ["classrooms"],
    queryFn: () => {
      return api.get("/classrooms").then((response) => response.data);
    },
  });

  return (
    <div className="h-full px-6 py-4 w-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-secondary text-4xl">Salas e Laboratórios</p>
          <p className="text-gray-400 text-xl">Alocação</p>
        </div>
        {user?.role === "ADMIN" && (
          <Button
            variant={"secondary"}
            className="flex items-center gap-2 text-xl p-6"
            size={"lg"}
          >
            <PlusCircle /> Adicionar nova sala
          </Button>
        )}
      </div>
      <div className="flex flex-col space-y-2 bg-white h-[90%] p-6 overflow-y-auto rounded-lg">
        {classrooms?.map((e: IRooms) => (
          <RoomsCard key={e.id} classroom={e} />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
