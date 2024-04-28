import AvailablePill from "./AvailablePill";

const RoomsAvailable: React.FC = () => {
  return (
    <div className="h-64 rounded-md bg-white p-3 font-bold">
      <p className="text-lg pb-3">Salas e Laboratórios Disponíveis</p>
      <div className="h-48 flex gap-3 overflow-auto">
        <div className="h-44 bg-[#272727] flex flex-col min-w-60 rounded-lg px-3 py-2 text-center gap-8 justify-center">
          <div className="flex justify-end">
            <AvailablePill />
          </div>
          <div className="flex flex-row gap-3">
            <div>
              <p className="text-white text-lg">Laboratório 01</p>
              <p className="text-[0.65rem] text-gray-400">
                Capacidade: 25 alunos
              </p>
              <p className="text-[0.65rem] text-gray-400">Computadores: 25</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">18:45 - 19:35</p>
              <p className="text-xs text-gray-400">19:35 - 20:25</p>
              <p className="text-xs text-gray-400">20:35 - 21:25</p>
              <p className="text-xs text-gray-400">21:25 - 22:15</p>
              <p className="text-xs text-gray-400">22:15 - 23:05</p>
            </div>
          </div>
        </div>

        <div className="h-44 bg-[#272727] flex flex-col min-w-60 rounded-lg px-3 py-2 text-center gap-8 justify-center">
          <div className="flex justify-end">
            <AvailablePill />
          </div>
          <div className="flex flex-row gap-3">
            <div>
              <p className="text-white text-lg">Laboratório 01</p>
              <p className="text-[0.65rem] text-gray-400">
                Capacidade: 25 alunos
              </p>
              <p className="text-[0.65rem] text-gray-400">Computadores: 25</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">18:45 - 19:35</p>
              <p className="text-xs text-gray-400">19:35 - 20:25</p>
              <p className="text-xs text-gray-400">20:35 - 21:25</p>
              <p className="text-xs text-gray-400">21:25 - 22:15</p>
              <p className="text-xs text-gray-400">22:15 - 23:05</p>
            </div>
          </div>
        </div>
        <div className="h-44 bg-[#272727] flex flex-col min-w-60 rounded-lg px-3 py-2 text-center gap-8 justify-center">
          <div className="flex justify-end">
            <AvailablePill />
          </div>
          <div className="flex flex-row gap-3">
            <div>
              <p className="text-white text-lg">Laboratório 01</p>
              <p className="text-[0.65rem] text-gray-400">
                Capacidade: 25 alunos
              </p>
              <p className="text-[0.65rem] text-gray-400">Computadores: 25</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">18:45 - 19:35</p>
              <p className="text-xs text-gray-400">19:35 - 20:25</p>
              <p className="text-xs text-gray-400">20:35 - 21:25</p>
              <p className="text-xs text-gray-400">21:25 - 22:15</p>
              <p className="text-xs text-gray-400">22:15 - 23:05</p>
            </div>
          </div>
        </div>
        <div className="h-44 bg-[#272727] flex flex-col min-w-60 rounded-lg px-3 py-2 text-center gap-8 justify-center">
          <div className="flex justify-end">
            <AvailablePill />
          </div>
          <div className="flex flex-row gap-3">
            <div>
              <p className="text-white text-lg">Laboratório 01</p>
              <p className="text-[0.65rem] text-gray-400">
                Capacidade: 25 alunos
              </p>
              <p className="text-[0.65rem] text-gray-400">Computadores: 25</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">18:45 - 19:35</p>
              <p className="text-xs text-gray-400">19:35 - 20:25</p>
              <p className="text-xs text-gray-400">20:35 - 21:25</p>
              <p className="text-xs text-gray-400">21:25 - 22:15</p>
              <p className="text-xs text-gray-400">22:15 - 23:05</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsAvailable;
