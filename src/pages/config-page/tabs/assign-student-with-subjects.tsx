"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { User } from "@/models/user";
import { api } from "@/lib/axios";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError, AxiosResponse } from "axios";
import { assignStudent } from "@/http/assign-student-with-subjects";
import { toast } from "sonner";

const assignStudentWithSubjectsSchema = z.object({
  studentId: z.string({
    message: "Selecione um aluno",
  }),
  semester: z.string({
    message: "Selecione o semestre",
  }),
});

type AssignStudentWithSubjectsType = z.infer<
  typeof assignStudentWithSubjectsSchema
>;

export function AssignStudentWithSubjects() {
  const { data: students } = useQuery<User[]>({
    queryKey: ["students"],
    queryFn: () => {
      return api.get("/students").then((response) => response.data);
    },
  });

  const form = useForm<AssignStudentWithSubjectsType>({
    resolver: zodResolver(assignStudentWithSubjectsSchema),
    defaultValues: {
      studentId: "",
      semester: "",
    },
  });

  const assignStudentMutation = useMutation<
    AxiosResponse,
    unknown,
    AssignStudentWithSubjectsType,
    unknown
  >({
    mutationFn: async ({ semester, studentId }) => {
      const response = await assignStudent({
        id: studentId,
        semester: Number(semester),
      });

      return response;
    },

    mutationKey: ["assign-student"],

    onSuccess: (response) => {
      if (response.status === 201) {
        form.reset();
        toast.success("Aluno matriculado com sucesso!");
      }
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log("error", error);
        error.response?.data.message &&
          toast.error("Erro ao matricular aluno!");
      }
    },
  });

  async function handleAssignStudent(data: AssignStudentWithSubjectsType) {
    await assignStudentMutation.mutate(data);
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-secondary w-full p-4  rounded-md">
        <h1 className="text-2xl font-bold mb-4">
          Matrícula de Alunos por Semestre
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAssignStudent)}
            className="grid grid-cols-2 gap-2"
          >
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Aluno</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleciona o aluno" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {students && students.length > 0 ? (
                          students?.map((student) => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.name}
                            </SelectItem>
                          ))
                        ) : (
                          <p className="text-gray-400 text-sm p-1">
                            Nenhum aluno encontrado
                          </p>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.studentId && (
              <p className="text-red-400 text-sm">
                {form.formState.errors.studentId.message}
              </p>
            )}
            <FormField
              control={form.control}
              name="semester"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Semestre</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleciona o semestre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={"1"}>1 Semestre</SelectItem>
                        <SelectItem value={"2"}>2 Semestre</SelectItem>
                        <SelectItem value={"3"}>3 Semestre</SelectItem>
                        <SelectItem value={"4"}>4 Semestre</SelectItem>
                        <SelectItem value={"5"}>5 Semestre</SelectItem>
                        <SelectItem value={"6"}>6 Semestre</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.semester && (
              <p className="text-red-400 text-sm">
                {form.formState.errors.semester.message}
              </p>
            )}

            <div className="col-span-2 flex w-full items-end justify-end">
              <Button
                disabled={form.formState.isLoading}
                className="disabled:cursor-not-allowed"
                type="submit"
              >
                {form.formState.isLoading ? "Matriculando aluno..." : "Salvar"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
