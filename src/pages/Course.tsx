import { Book, MoreHorizontal, PlusCircle } from "lucide-react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

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

import { ICourse } from "@/models/course";
import { ISubjects } from "@/models/subjects";
import { CourseModal } from "@/components/course-modal";
import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import { deleteCourse } from "@/http/delete-course";

const Course: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [courseToEdit, setCourseToEdit] = useState<ICourse | null>(null);
  const { user } = useUser();

  const deleteCourseMutation = useMutation<
    AxiosResponse,
    unknown,
    { id: string },
    unknown
  >({
    mutationFn: async ({ id }) => {
      const response = await deleteCourse({
        courseId: id,
      });

      return response;
    },

    mutationKey: ["delete-alocation"],
    onSuccess: (response) => {
      if (response.status === 204) {
        toast.success("Alocação deletada com sucesso!");
        queryClient.invalidateQueries({
          queryKey: ["courses"],
        });
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        error.response?.data.message &&
          toast.error("Erro ao deletar alocação!");
      }
    },
  });

  const handleOpenModal = (course: ICourse) => {
    setCourseToEdit(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCourseToEdit(null);
  };

  const { data: courses } = useQuery<ICourse[]>({
    queryKey: ["courses"],
    queryFn: () => {
      return api.get("/courses").then((response) => response.data);
    },
  });

  const columns: ColumnDef<ICourse>[] = [
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
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "subjects",
      header: "Matérias",
      cell: ({ row }) => {
        const subjects: ISubjects[] = row.getValue("subjects");
        return <div>{subjects.map((e) => e.name).join(", ")}</div>;
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
                      await deleteCourseMutation.mutateAsync({
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
      placeholder: "Nome do curso",
    },
  ];

  return (
    <div className="h-full px-6 py-4 w-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-secondary text-3xl">Cursos</p>
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
              <CourseModal />
            </Dialog>

            <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
              {isModalOpen && <CourseModal courseToEdit={courseToEdit} />}
            </Dialog>
          </>
        )}
      </div>
      <div className="flex space-y-2 h-[90%] p-6 overflow-y-auto rounded-lg">
        {courses &&
          (courses.length > 0 ? (
            <DataTable filters={filters} columns={columns} data={courses} />
          ) : (
            <div className="flex gap-4 justify-center items-center text-secondary text-2xl h-[500px] w-full">
              <Book size={70} />
              <div className="flex flex-col gap-4 items-center">
                <p>Gerencie os cursos para sua instituição</p>
                <span className="text-zinc-400">Nenhuma curso cadastrado</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Course;
