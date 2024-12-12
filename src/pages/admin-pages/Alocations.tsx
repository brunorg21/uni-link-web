import { Book, DoorOpenIcon, Laptop, MoreHorizontal } from "lucide-react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Button } from "@/components/ui/button";
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
import { IAlocations } from "@/models/alocations";
import { Badge } from "@/components/ui/badge";

import { deleteAlocation } from "@/http/delete-alocation";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";

interface DeleteAlocationProps {
  id: string;
}

const Alocations: React.FC = () => {
  const { data: myAlocations } = useQuery<IAlocations[]>({
    queryKey: ["all-alocations-admin"],
    queryFn: async () => {
      return await api.get(`/alocations`).then((response) => {
        console.log(response);
        return response.data.alocations;
      });
    },
  });

  console.log("myAlocations", myAlocations);

  const deleteAlocationMutation = useMutation<
    AxiosResponse,
    unknown,
    DeleteAlocationProps,
    unknown
  >({
    mutationFn: async ({ id }) => {
      const response = await deleteAlocation({
        alocationId: id,
      });

      return response;
    },

    mutationKey: ["delete-alocation"],
    onSuccess: (response) => {
      if (response.status === 204) {
        toast.success("Alocação deletada com sucesso!");
        queryClient.invalidateQueries({
          queryKey: ["all-alocations-admin"],
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

  const columns: ColumnDef<IAlocations>[] = [
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
      accessorKey: "roomName",
      header: "Sala",
      cell: ({ row }) => {
        return <div>{row.original?.classroom?.name ?? ""}</div>;
      },
    },
    {
      accessorKey: "roomType",
      header: "Tipo de sala",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            {row.original?.classroom?.type === "LAB" ? (
              <Laptop />
            ) : (
              <DoorOpenIcon />
            )}
            {row.original?.classroom?.type === "CLASSROOM"
              ? "Sala de aula"
              : "Laboratório"}
          </div>
        );
      },
    },
    {
      accessorKey: "subject",
      header: "Matéria",
      cell: ({ row }) => {
        return <div>{row.original?.class?.subject.name ?? ""}</div>;
      },
    },
    {
      accessorKey: "classSchedule",
      header: "Horário da aula",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Badge variant={"default"}>
              {row.original?.class?.classSchedule.startHour ?? ""}
            </Badge>
            -
            <Badge variant={"default"}>
              {row.original?.class?.classSchedule.endHour ?? ""}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Data de alocação",
      cell: ({ row }) => {
        const utcDate = row.original?.date && new Date(row.original?.date);

        return (
          <div>
            {utcDate &&
              `${utcDate.getUTCDate()}/${
                utcDate.getUTCMonth() + 1
              }/${utcDate.getUTCFullYear()}`}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <>
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
                  onClick={() =>
                    deleteAlocationMutation.mutate({ id: row.original.id })
                  }
                  className="text-red-600"
                >
                  Excluir alocação
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ];

  return (
    <div className="h-full px-6 py-4 w-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-secondary text-3xl">Alocações</p>
          <p className="text-gray-400 text-xl">Gestão</p>
        </div>
      </div>
      <div className="flex space-y-2 h-[90%] p-6 overflow-y-auto rounded-lg">
        {myAlocations &&
          (myAlocations.length > 0 ? (
            <DataTable filters={[]} columns={columns} data={myAlocations} />
          ) : (
            <div className="flex gap-4 justify-center items-center text-secondary text-2xl h-[500px] w-full">
              <Book size={70} />
              <div className="flex flex-col gap-4 items-center">
                <p>Gerencie as suas alocações</p>
                <span className="text-zinc-400">
                  Nenhuma alocação foi realizada.
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Alocations;
