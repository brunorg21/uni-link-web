import { api } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  ArrowUpDown,
  MoreHorizontal,
  PlusCircle,
  UserRoundPen,
} from "lucide-react";
import { ITeacher } from "@/models/teacher";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ISubjects } from "@/models/subjects";
import { useUser } from "@/contexts/user-context";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TeacherModal } from "@/components/teacher-modal";
import { useState } from "react";

import { AxiosError, AxiosResponse } from "axios";
import { deleteTeacher } from "@/http/delete-teacher";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import Cookies from "universal-cookie";

interface DeleteTeacherProps {
  id: string;
}

const Teachers: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [teacherToEdit, setTeacherToEdit] = useState<ITeacher | null>(null);
  const { user } = useUser();
  const cookies = new Cookies();
  const { data: teachers } = useQuery<ITeacher[]>({
    queryKey: ["teachers"],
    queryFn: () => {
      return api
        .get("/teachers", {
          headers: { Authorization: `Bearer ${cookies.get("access_token")}` },
        })
        .then((response) => response.data);
    },
  });

  const deleteTeacherMutation = useMutation<
    AxiosResponse,
    unknown,
    DeleteTeacherProps,
    unknown
  >({
    mutationFn: async ({ id }) => {
      const response = await deleteTeacher({
        id,
      });

      return response;
    },

    mutationKey: ["delete-teacher"],
    onSuccess: (response) => {
      console.log("response", response);
      if (response.status === 204) {
        toast.success("Professor deletado com sucesso!");
        queryClient.invalidateQueries({
          queryKey: ["teachers"],
        });
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log("error", error);
        error.response?.data.message &&
          toast.error("Erro ao deletar professor!");
      }
    },
  });

  const handleOpenModal = (teacher: ITeacher) => {
    setTeacherToEdit(teacher);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTeacherToEdit(null);
  };

  const columns: ColumnDef<ITeacher>[] = [
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
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
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
      cell: ({ row }) => (
        <>
          {user?.role === "ADMIN" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleOpenModal(row.original)}>
                  Visualizar professor
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => {
                    deleteTeacherMutation.mutate({ id: row.original.id });
                  }}
                >
                  Excluir {row.original.name}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </>
      ),
    },
  ];

  const filters = [
    {
      column: "email",
      placeholder: "Email",
    },
    {
      column: "name",
      placeholder: "Nome",
    },
  ];

  return (
    <div className="h-full px-6 py-4 ">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-secondary text-3xl">Professores</p>
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
                  <PlusCircle size={20} /> Adicionar novo(a) professor(a)
                </Button>
              </DialogTrigger>
              <TeacherModal />
            </Dialog>
            <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
              {isModalOpen && <TeacherModal teacherToEdit={teacherToEdit} />}
            </Dialog>
          </>
        )}
      </div>
      <div className="flex space-y-2 h-[90%] p-6 overflow-y-auto rounded-lg">
        {teachers &&
          (teachers.length > 0 ? (
            <DataTable filters={filters} columns={columns} data={teachers} />
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
