import { RoomsAvailableCard } from "./RoomsAvailable/RoomsAvailableCard";

const MostUsedRooms: React.FC = () => {
  return (
    <div className="h-64 rounded-md bg-white p-3 font-bold">
      <p className="text-2xl pb-3">Salas e Laboratórios Mais Utilizadas</p>
      <div className="h-48 flex gap-3 overflow-auto">
        <RoomsAvailableCard />
        <RoomsAvailableCard />
        <RoomsAvailableCard />
      </div>
    </div>
  );
};

export default MostUsedRooms;
