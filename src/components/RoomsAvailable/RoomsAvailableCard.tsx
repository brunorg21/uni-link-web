import { Pill } from "../Pill";

export function RoomsAvailableCard() {
  return (
    <div className="h-44 bg-[#272727] flex flex-col min-w-60 rounded-lg px-3 py-2 text-center gap-8 justify-center">
      <div className="flex justify-end">
        <Pill status="INDISPONÍVEL" />
      </div>
      <div className="flex flex-row gap-3">
        <div>
          <p className="text-white text-lg">Laboratório 01</p>
          <p className="text-sm text-gray-400">Capacidade: 25 alunos</p>
          <p className="text-sm text-gray-400">Computadores: 25</p>
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
  );
}
