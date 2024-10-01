import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import TeachersCard from "../components/TeachersCard";
import { UserRoundPen } from "lucide-react";
import { ITeacher } from "@/models/teacher";

const Teachers: React.FC = () => {
  const { data: teachers } = useQuery<ITeacher[]>({
    queryKey: ["teachers"],
    queryFn: () => {
      return api.get("/teachers").then((response) => response.data);
    },
  });

  console.log("teachers", teachers);

  return (
    <div className="h-full px-6 py-4 ">
      <div className="mb-5">
        <div>
          <p className="text-secondary text-3xl">Professores</p>
          <p className="text-gray-400 text-xl">Gestão</p>
        </div>
      </div>
      <div className="flex p-6 max-h-[90vh] overflow-y-auto rounded-lg gap-2 flex-wrap">
        {teachers &&
          (teachers.length > 0 ? (
            teachers?.map((e: ITeacher) => {
              return <TeachersCard teacher={e} key={e.id} />;
            })
          ) : (
            <div className="flex gap-4 justify-center items-center text-secondary text-2xl h-[500px] w-full">
              <UserRoundPen size={70} />
              <div className="flex flex-col gap-4 items-center">
                <p>Gerencie os professores da sua instituição</p>
                <span className="text-zinc-400">
                  Nenhum professor cadastrado.
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Teachers;
