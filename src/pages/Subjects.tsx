import { Book, PlusCircle } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { ISubjects } from "@/models/subjects";
import SubjectCard from "@/components/SubjectCard";
import { SubjectModal } from "@/components/subject-modal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/user-context";

const Subjects: React.FC = () => {
  const { user } = useUser();

  const { data: subjects } = useQuery<ISubjects[]>({
    queryKey: ["subjects"],
    queryFn: () => {
      return api.get("/subjects").then((response) => response.data);
    },
  });

  console.log(subjects);

  return (
    <div className="h-full px-6 py-4 w-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-secondary text-3xl">Matérias</p>
          <p className="text-gray-400 text-xl">Gestão</p>
        </div>
        {user?.role === "ADMIN" && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant={"secondary"}
                className="flex items-center gap-2 p-4"
              >
                <PlusCircle size={20} /> Adicionar nova matéria
              </Button>
            </DialogTrigger>
            <SubjectModal />
          </Dialog>
        )}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {subjects &&
          (subjects.length > 0 ? (
            subjects?.map((e: ISubjects) => (
              <SubjectCard key={e.id} subject={e} />
            ))
          ) : (
            <div className="flex gap-4 justify-center items-center text-secondary text-2xl h-[500px] w-full">
              <Book size={70} />
              <div className="flex flex-col gap-4 items-center">
                <p>Gerencie as matérias para os seus professores</p>
                <span className="text-zinc-400">
                  Nenhuma matéria cadastrada
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Subjects;
