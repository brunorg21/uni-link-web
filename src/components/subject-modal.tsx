import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { createSubject } from "@/http/create-subject";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import { User } from "@/models/user";
import { api } from "@/lib/axios";
import { ISubjects } from "@/models/subjects";
import { updateSubject } from "@/http/update-subject";
import { ICourse } from "@/models/course";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircleIcon, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SubjectModalProps {
  subjectToEdit?: ISubjects | null;
}

const createSubjectSchema = z.object({
  teacherId: z.string({
    message: "Selecione um professor",
  }),
  name: z.string({
    message: "Preencha o nome da matéria",
  }),
  courseId: z.string({
    message: "Preencha o curso que deseja vincular",
  }),
  semester: z.coerce
    .number({
      message: "Preencha o semestre que será lecionada a matéria",
    })
    .max(8, {
      message: "O semestre deve ser menor ou igual a 8",
    })
    .min(1, {
      message: "O semestre deve ser maior ou igual a 1",
    }),
});

export type SubjectFormType = z.infer<typeof createSubjectSchema>;

export function SubjectModal({ subjectToEdit }: SubjectModalProps) {
  const form = useForm<SubjectFormType>({
    resolver: zodResolver(createSubjectSchema),
    defaultValues: {
      name: subjectToEdit?.name || "",
      teacherId: subjectToEdit?.user.id || "",
      courseId: subjectToEdit?.courseId || "",
      semester: subjectToEdit?.semester || 1,
    },
  });

  const { data: users } = useQuery<User[]>({
    queryKey: ["teachersOnSchool"],
    queryFn: () => {
      return api.get("/teachers").then((response) => response.data);
    },
  });

  const { data: courses } = useQuery<ICourse[]>({
    queryKey: ["courses"],
    queryFn: () => {
      return api.get("/courses").then((response) => response.data);
    },
  });

  const noCoursesToCreateSubject = courses?.length === 0;

  const createSubjectMutation = useMutation<
    AxiosResponse,
    unknown,
    SubjectFormType,
    unknown
  >({
    mutationFn: async ({ name, teacherId, courseId, semester }) => {
      const response = await createSubject({
        name,
        teacherId,
        courseId,
        semester,
      });

      return response;
    },

    mutationKey: ["create-subject"],
    onSuccess: (response) => {
      if (response.status === 201) {
        toast.success("Matéria criada com sucesso");
        queryClient.invalidateQueries({
          queryKey: ["subjects"],
        });
        form.reset();
      }
    },
    onError: (error) => {
      console.log("error", error);
      if (error instanceof AxiosError) {
        error.response?.data.message && toast.error("Erro ao criar matéria");
      }
    },
  });

  const updateSubjectMutation = useMutation<
    AxiosResponse,
    unknown,
    SubjectFormType,
    unknown
  >({
    mutationFn: async ({ name, teacherId, courseId, semester }) => {
      const response = await updateSubject({
        name,
        teacherId,
        subjectId: subjectToEdit?.id || "",
        courseId,
        semester,
      });

      return response;
    },

    mutationKey: ["update-subject"],
    onSuccess: (response) => {
      if (response.status === 204) {
        toast.success("Matéria atualizada com sucesso");
        queryClient.invalidateQueries({
          queryKey: ["subjects"],
        });
        form.reset();
      }
    },
    onError: (error) => {
      console.log("error", error);
      if (error instanceof AxiosError) {
        error.response?.data.message &&
          toast.error("Erro ao atualizar matéria");
      }
    },
  });

  async function handleCreateSubject(data: SubjectFormType) {
    if (!subjectToEdit) {
      createSubjectMutation.mutate(data);
    } else {
      updateSubjectMutation.mutate(data);
    }
  }

  return (
    <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
      {noCoursesToCreateSubject ? (
        <Alert className="space-y-2" variant="default">
          <AlertTitle className="flex items-center gap-2 text-xl">
            <AlertCircleIcon className="h-6 w-6" /> Nenhum curso encontrado!
          </AlertTitle>
          <AlertDescription className="text-lg">
            Comece adicionando um curso na sua instituição antes de adicionar
            uma nova matéria.
          </AlertDescription>
          <Button asChild size={"default"} variant={"default"}>
            <Link className="flex items-center gap-2" to="/courses">
              Ir para cursos <ChevronRight />
            </Link>
          </Button>
        </Alert>
      ) : (
        <>
          <DialogHeader>
            <DialogTitle>
              {subjectToEdit ? "Atualizar matéria" : "Criar nova matéria"}
            </DialogTitle>
            <DialogDescription>
              {`Preencha os campos para ${
                subjectToEdit ? "atualizar uma" : "adicionar uma nova"
              } matéria na sua instituição.`}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreateSubject)}
              className="grid grid-cols-2 gap-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="Preencha com o nome da matéria"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="semester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semestre</FormLabel>
                    <FormControl>
                      <Input
                        id="semester"
                        placeholder="Preencha o semestre da matéria"
                        {...field}
                        type="number"
                        max={8}
                        min={1}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teacherId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Professor</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o professor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {users && users.length > 0 ? (
                            users?.map((user) => (
                              <SelectItem value={user.id}>
                                {user.name}
                              </SelectItem>
                            ))
                          ) : (
                            <p className="text-sm">
                              Nenhum professor encontrado
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
                name="courseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Curso</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o curso" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {courses && courses.length > 0 ? (
                            courses?.map((course) => (
                              <SelectItem value={course.id}>
                                {course.name}
                              </SelectItem>
                            ))
                          ) : (
                            <p className="text-sm">Nenhum curso encontrado</p>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-2 flex w-full items-end justify-end">
                <Button type="submit">Salvar</Button>
              </div>
            </form>
          </Form>
        </>
      )}
    </DialogContent>
  );
}
