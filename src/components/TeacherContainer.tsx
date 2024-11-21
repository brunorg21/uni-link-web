import dayjs, { Dayjs } from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { IClasses } from "@/models/classes";
import { api } from "@/lib/axios";
import ClassCard from "./ClassCard";
import { ITeacher } from "@/models/teacher";
import TeachersCard from "./TeachersCard";
import ProfessorsCard from "./ProfessorsCard";

interface TeacherContainerProps {
  date: Dayjs | null;
}
const TeacherContainer: React.FC<TeacherContainerProps> = ({ date }) => {
  console.log("DATE", date);

  const { data: teachers } = useQuery<ITeacher[]>({
    queryKey: ["teachers", date],
    queryFn: async () => {
      const response = await api
        .get(
          `/todayTeachers?date=${
            date
              ? date.toISOString()
              : dayjs(new Date()).startOf("day").toISOString()
          }`
        )
        .then((response) => response.data);
      return response;
    },
  });

  console.log("classeskkkkkkk", teachers);

  return (
    <div className="h-[21rem] w-full flex flex-col rounded-md bg-white p-3 font-bold overflow-auto">
      <h1 className="text-2xl pb-3">Professores</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-2 h-full">
        {teachers?.map((e) => (
          <ProfessorsCard key={e.id} teacher={e} />
        ))}
      </div>
    </div>
  );
};

export default TeacherContainer;
