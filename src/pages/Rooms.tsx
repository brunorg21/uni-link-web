import RoomsCard from "../components/RoomsCard";

const Rooms: React.FC = () => {
  return (
    <div className="h-full px-6 py-4 ">
      <div className="mb-5">
        <div>
          <p className="text-white text-xl">Salas e Laboratórios</p>
          <p className="text-gray-400 text-lg">Alocação</p>
        </div>
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
