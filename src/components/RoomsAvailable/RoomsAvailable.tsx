import { RoomsAvailableCard } from "./RoomsAvailableCard";

const RoomsAvailable: React.FC = () => {
  return (
    <div className="h-64 rounded-md bg-white p-3 font-bold row-span-1">
      <p className="text-2xl pb-3">Salas e Laboratórios Disponíveis</p>
      <div className="h-48 flex gap-3 overflow-auto">
        <RoomsAvailableCard />
        <RoomsAvailableCard />
        <RoomsAvailableCard />
        <RoomsAvailableCard />
      </div>
    </div>
  );
};

export default RoomsAvailable;
