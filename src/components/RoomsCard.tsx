import { IRooms } from "@/models/rooms";
import { Button } from "./ui/button";
import { Bell } from "lucide-react";
import { AlocationDrawer } from "./alocation/alocation-drawer";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { getAllClassSchedules } from "@/http/get-all-classSchedules";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface roomsProps {
  classroom: IRooms;
}
const RoomsCard = ({ classroom }: roomsProps) => {
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

  const allSchedulesNotAvailable = schedulesToUse?.length === 0;

  return (
    <div className="flex flex-wrap md:flex-row sm:flex-col flex-col bg-secondary rounded-lg p-6 items-center justify-between">
      <span
        className={`flex justify-center items-center ${
          allSchedulesNotAvailable ? "bg-red-500" : "bg-emerald-500"
        } rounded-full p-3 w-[120px] font-semibold`}
      >
        {allSchedulesNotAvailable ? "Indisponível" : "Disponível"}
      </span>
      <div className="flex flex-col items-center gap-4">
        <span className="text-xl">{classroom.name}</span>
        <div className="flex flex-col items-center">
          <p className="text-md text-gray-400 font-bold">
            Capacidade: {classroom.capacity} Alunos
          </p>
          <p className="text-md text-gray-400 font-bold">
            Computadores: {classroom.computers}
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        {classSchedules &&
          classSchedules.map((e) => {
            const isAlocated = classroom.classes.some(
              (c) => c.classScheduleId === e.id
            );

            const classesRelated = classroom.classes.find(
              (c) => c.classScheduleId === e.id
            );

            return (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className={`text-md  ${
                        isAlocated ? "text-red-400" : "text-zinc-800"
                      } font-bold ${
                        isAlocated
                          ? "hover:text-red-300"
                          : "hover:text-zinc-700"
                      }`}
                      variant="outline"
                    >
                      {e.startHour} - {e.endHour}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {classesRelated ? (
                      <>
                        <p>{classesRelated?.subject.user.name}</p>
                        <p>{classesRelated?.subject.name}</p>
                      </>
                    ) : (
                      "Horário disponível"
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size={"default"}
            className={`flex items-center gap-2 text-md `}
          >
            <Bell />
            Reservar
          </Button>
        </SheetTrigger>
        <AlocationDrawer classroom={classroom} />
      </Sheet>
    </div>
  );
};

export default RoomsCard;
