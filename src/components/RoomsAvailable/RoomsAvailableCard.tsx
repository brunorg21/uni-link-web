import { IRooms } from "@/models/rooms";
import { Pill } from "../Pill";
import { useQuery } from "@tanstack/react-query";
import { getAllClassSchedules } from "@/http/get-all-classSchedules";

interface RoomsAvailableCardProps {
  classroom: IRooms;
}
export function RoomsAvailableCard({ classroom }: RoomsAvailableCardProps) {
  const { data: classSchedules } = useQuery({
    queryKey: ["classSchedules"],
    queryFn: async () => await getAllClassSchedules(),
  });

  const schedulesToUse = classSchedules?.filter((e) => {
    const isAlocated = classroom.classes.some(
      (a) => a.classScheduleId === e.id
    );

    if (isAlocated) {
      return false;
    }

    return true;
  });

  return (
    <div className="h-44 bg-[#272727] flex flex-col min-w-60 rounded-lg px-3 py-2 text-center gap-8 justify-center">
      <div className="flex justify-end">
        <Pill
          status={schedulesToUse?.length !== 0 ? "DISPONÍVEL" : "INDISPONÍVEL"}
        />
      </div>
      <div className="flex flex-row gap-3">
        <div>
          <p className="text-white text-lg">{classroom?.name}</p>
          <p className="text-sm text-gray-400">
            Capacidade: {classroom?.capacity} alunos
          </p>
          <p className="text-sm text-gray-400">
            Computadores: {classroom?.computers}
          </p>
        </div>
        <div>
          <p
            className={`text-xs  ${
              schedulesToUse?.find((e) => e.startHour === "18:45")
                ? "text-gray-400"
                : "text-red-400"
            }`}
          >
            18:45 - 19:35
          </p>
          <p
            className={`text-xs  ${
              schedulesToUse?.find((e) => e.startHour === "19:35")
                ? "text-gray-400"
                : "text-red-400"
            }`}
          >
            19:35 - 20:25
          </p>
          <p
            className={`text-xs  ${
              schedulesToUse?.find((e) => e.startHour === "20:35")
                ? "text-gray-400"
                : "text-red-400"
            }`}
          >
            20:35 - 21:25
          </p>
          <p
            className={`text-xs  ${
              schedulesToUse?.find((e) => e.startHour === "21:25")
                ? "text-gray-400"
                : "text-red-400"
            }`}
          >
            21:25 - 22:15
          </p>
          <p
            className={`text-xs  ${
              schedulesToUse?.find((e) => e.startHour === "22:15")
                ? "text-gray-400"
                : "text-red-400"
            }`}
          >
            22:15 - 23:05
          </p>
        </div>
      </div>
    </div>
  );
}
