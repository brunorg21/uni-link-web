import { IRooms } from "@/models/rooms";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import dayjs, { Dayjs } from "dayjs";
import { RoomsAvailableCard } from "../RoomsAvailable/RoomsAvailableCard";

interface LabsAlocatedProps {
  date: Dayjs | null;
}

const LabsAlocated: React.FC<LabsAlocatedProps> = ({ date }) => {
  const { data: classrooms } = useQuery<IRooms[]>({
    queryKey: ["classrooms", date],
    queryFn: async () => {
      const response = await api
        .get(
          `/alocated?date=${
            date
              ? date.toISOString()
              : dayjs(new Date()).startOf("day").toISOString()
          }`
        )
        .then((response) => response.data);

      return response;
    },
  });

  return (
    <div className="h-64 rounded-md bg-white p-3 font-bold row-span-1">
      <p className="text-2xl pb-3">Laboratórios Alocados</p>
      <div className="h-48 flex gap-3 overflow-auto">
        {classrooms
          ?.filter((classroom) => classroom.type === "LAB")
          ?.filter((classroom) => classroom.alocations.length < 5)
          .map((classroom) => (
            <RoomsAvailableCard key={classroom.id} classroom={classroom} />
          ))}
      </div>
    </div>
  );
};

export default LabsAlocated;
