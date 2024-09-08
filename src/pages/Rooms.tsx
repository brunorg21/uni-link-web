import { Button } from "@/components/ui/button";
import RoomsCard from "../components/RoomsCard";
import { PlusCircle } from "lucide-react";
import { useUser } from "@/contexts/user-context";

const Rooms: React.FC = () => {
  const { user } = useUser();

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
        <RoomsCard />
        <RoomsCard />
        <RoomsCard />
        <RoomsCard />
        <RoomsCard />
        <RoomsCard />
        <RoomsCard />
      </div>
    </div>
  );
};

export default Rooms;
