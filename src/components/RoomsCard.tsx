const RoomsCard: React.FC = () => {
  return (
    <div className="flex flex-row bg-[#272727] h-28 rounded-lg justify-center p-6 items-center gap-10">
      <div className="rounded-full bg-[#66FF59] p-3 w-28 h-8 flex justify-center items-center font-bold">
        Disponível
      </div>
      <div className="flex flex-col items-center gap-4">
        <span className="text-white text-lg">Laboratório 1</span>
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-400">Capacidade: 25 Alunos</p>
          <p className="text-sm text-gray-400">Computadores: 20</p>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <span className="text-sm text-gray-400">18:45 - 19:35</span>
        <span className="text-sm text-gray-400">19:35 - 20:25</span>
        <span className="text-sm text-gray-400">20:35 - 21:25</span>
        <span className="text-sm text-gray-400">21:25 - 22:15</span>
        <span className="text-sm text-gray-400">22:15 - 23:05</span>
      </div>
      <div className="rounded-full bg-[#FFFF00] p-3 w-28 h-8 flex justify-center items-center font-bold">
        Reservar
      </div>
    </div>
  );
};

export default RoomsCard;
