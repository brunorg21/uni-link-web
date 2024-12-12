import { Book, MoreHorizontal, PlusCircle } from "lucide-react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { ISubjects } from "@/models/subjects";

import { SubjectModal } from "@/components/subject-modal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/user-context";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/data-table";
import { ITeacher } from "@/models/teacher";
import { useState } from "react";
import { ICourse } from "@/models/course";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { deleteSubject } from "@/http/delete-subject";

const Subjects: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [subjectToEdit, setSubjectToEdit] = useState<ISubjects | null>(null);
  const { user } = useUser();

  const handleOpenModal = (subject: ISubjects) => {
    setSubjectToEdit(subject);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSubjectToEdit(null);
  };

  const { data: subjects } = useQuery<ISubjects[]>({
    queryKey: ["subjects"],
    queryFn: () => {
      return api.get("/subjects").then((response) => response.data);
    },
  });

  const deleteSubjectMutation = useMutation<
    AxiosResponse,
    unknown,
    { id: string },
    unknown
  >({
    mutationFn: async ({ id }) => {
      const response = await deleteSubject({
        subjectId: id,
      });

      return response;
    },

    mutationKey: ["delete-subject"],
    onSuccess: (response) => {
      if (response.status === 204) {
        toast.success("Matéria deletada com sucesso!");
        queryClient.invalidateQueries({
          queryKey: ["subjects"],
        });
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        error.response?.data.message &&
          toast.error("Erro ao deletar matéria!");
      }
    },
  });

  const columns: ColumnDef<ISubjects>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Nome",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "user",
      header: "Professor",
      cell: ({ row }) => {
        const teacher: ITeacher = row.getValue("user");

        return <div>{teacher.name}</div>;
      },
    },
    {
      accessorKey: "course",
      header: "Curso",
      cell: ({ row }) => {
        const course: ICourse = row.getValue("course");

        return <div>{course.name}</div>;
      },
    },
    {
      accessorKey: "semester",
      header: "Semestre",
      cell: ({ row }) => {
        return <div>{`${row.getValue("semester")}º Semestre`}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <>
            {user?.role === "ADMIN" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Ações</DropdownMenuLabel>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleOpenModal(row.original)}
                  >
                    Visualizar matéria
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={async () =>
                      await deleteSubjectMutation.mutateAsync({
                        id: row.original.id,
                      })
                    }
                    className="text-red-600"
                  >
                    Excluir {row.original.name}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </>
        );
      },
    },
  ];

  const filters = [
    {
      column: "name",
      placeholder: "Matéria",
    },
  ];

  return (
    <div className="h-full px-6 py-4 w-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-secondary text-3xl">Matérias</p>
          <p className="text-gray-400 text-xl">Gestão</p>
        </div>
        {user?.role === "ADMIN" && (
          <>
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
            <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
              {isModalOpen && <SubjectModal subjectToEdit={subjectToEdit} />}
            </Dialog>
          </>
        )}
      </div>
      <div className="flex space-y-2 h-[90%] p-6 overflow-y-auto rounded-lg">
        {subjects &&
          (subjects.length > 0 ? (
            <DataTable filters={filters} columns={columns} data={subjects} />
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
