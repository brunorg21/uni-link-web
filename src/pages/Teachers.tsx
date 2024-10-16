import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

import { ArrowUpDown, MoreHorizontal, UserRoundPen } from "lucide-react";
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

const Teachers: React.FC = () => {
  const { data: teachers } = useQuery<ITeacher[]>({
    queryKey: ["teachers"],
    queryFn: () => {
      return api.get("/teachers").then((response) => response.data);
    },
  });

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
      cell: () => {
        return (
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
              <DropdownMenuItem>Visualizar professor</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
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
      <div className="mb-5">
        <div>
          <p className="text-secondary text-3xl">Professores</p>
          <p className="text-gray-400 text-xl">Gestão</p>
        </div>
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
