"use client";

import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import { toast } from "sonner";
import { createTeacher } from "@/http/create-teacher";
import { Input } from "@/components/ui/input";
import { Select } from "@radix-ui/react-select";
import { ICourse } from "@/models/course";
import { api } from "@/lib/axios";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { queryClient } from "@/lib/react-query";

const createStudentSchema = z.object({
  name: z.string({
    message: "Preencha o nome do professor",
  }),
  email: z
    .string({
      message: "Preencha o email do professor",
    })
    .email({
      message: "Preencha com um e-mail válido",
    }),
  password: z.string({
    message: "Preencha a senha do professor",
  }),
  courseId: z.string({
    message: "Preencha o curso do aluno",
  }),
});

type CreateStudentType = z.infer<typeof createStudentSchema>;

export function CreateStudent() {
  const form = useForm<CreateStudentType>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      courseId: "",
      email: "",
      name: "",
      password: "",
    },
  });

  const createStudentMutation = useMutation<
    AxiosResponse,
    unknown,
    CreateStudentType,
    unknown
  >({
    mutationFn: async ({ name, email, password, courseId }) => {
      const response = await createTeacher({
        name,
        email,
        password,
        role: "STUDENT",
        courseId,
      });

      return response;
    },

    mutationKey: ["create-student"],
    onSuccess: (response) => {
      if (response.status === 201) {
        form.reset();
        toast.success("Aluno criado com sucesso!");
        queryClient.invalidateQueries({
          queryKey: ["students"],
        });
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log("error", error);
        error.response?.data.message && toast.error("Erro ao criar aluno!");
      }
    },
  });

  const { data: courses } = useQuery<ICourse[]>({
    queryKey: ["courses"],
    queryFn: () => {
      return api.get("/courses").then((response) => response.data);
    },
  });

  async function handleCreateStudent(data: CreateStudentType) {
    await createStudentMutation.mutate(data);
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-secondary w-full p-4  rounded-md">
        <h1 className="text-2xl font-bold mb-4">
          Matrícula de Alunos por Semestre
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateStudent)}
            className="grid grid-cols-2 gap-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Preencha com o nome do aluno"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Curso</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleciona o curso" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {courses && courses.length > 0 ? (
                          courses?.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.name}
                            </SelectItem>
                          ))
                        ) : (
                          <p className="text-gray-400 text-sm p-1">
                            Nenhum curso encontrado
                          </p>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="Email"
                      type="email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      placeholder="Senha"
                      type="password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-2 flex w-full items-end justify-end">
              <Button
                disabled={form.formState.isLoading}
                className="disabled:cursor-not-allowed"
                type="submit"
              >
                {form.formState.isLoading ? "Criando aluno..." : "Salvar"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
