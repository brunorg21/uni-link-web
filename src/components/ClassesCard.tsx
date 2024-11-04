import dayjs, { Dayjs } from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { IClasses } from "@/models/classes";
import { api } from "@/lib/axios";
import ClassCard from "./ClassCard";

interface ClassesCardProps {
  date: Dayjs | null;
}
const ClassesCard: React.FC<ClassesCardProps> = ({ date }) => {
  const { data: classes } = useQuery<IClasses[]>({
    queryKey: ["classes", date],
    queryFn: async () => {
      const response = await api
        .get(
          `/classes?date=${
            date
              ? date.toISOString()
              : dayjs(new Date()).startOf("day").toISOString()
          }`
        )
        .then((response) => response.data);
      return response;
    },
  });

  console.log("classes", classes);

  return (
    <div className="h-[21rem] w-full flex flex-col rounded-md bg-white p-3 font-bold overflow-auto">
      <h1 className="text-2xl pb-3">Aulas</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-2 h-full">
        {classes?.map((e) => (
          <ClassCard key={e.id} classes={e} />
        ))}
      </div>
    </div>
  );
};

export default ClassesCard;
