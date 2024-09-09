import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import TeachersCard from "../components/TeachersCard";
import { User } from "@/models/user";

const Teachers: React.FC = () => {
  const { data: teachers } = useQuery<User[]>({
    queryKey: ["teachers"],
    queryFn: () => {
      return api.get("/teachers").then((response) => response.data);
    },
  });
  return (
    <div className="h-full px-6 py-4 ">
      <div className="mb-5">
        <div>
          <p className="text-white text-xl">Professores</p>
          <p className="text-gray-400 text-lg">Gestão</p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-5 bg-white h-[90%] p-6 overflow-y-auto rounded-lg">
        {teachers?.map((e) => {
          return <TeachersCard key={e.id} user={e} />;
        })}
      </div>
    </div>
  );
};

export default Teachers;
