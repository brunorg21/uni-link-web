import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import { createTeacher } from "@/http/create-teacher";
import { ITeacher } from "@/models/teacher";
import { updateTeacher } from "@/http/update-teacher";
import { Loader2 } from "lucide-react";

interface TeacherModalProps {
  teacherToEdit?: ITeacher | null;
}

const createTeacherSchema = z.object({
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
});

export type CreateTeacherType = z.infer<typeof createTeacherSchema>;

export function TeacherModal({ teacherToEdit }: TeacherModalProps) {
  const form = useForm<CreateTeacherType>({
    resolver: zodResolver(createTeacherSchema),
    defaultValues: {
      name: teacherToEdit?.name || "",
      email: teacherToEdit?.email || "",
      password: teacherToEdit?.password_hash || "",
    },
  });

  const createTeacherMutation = useMutation<
    AxiosResponse,
    unknown,
    CreateTeacherType,
    unknown
  >({
    mutationFn: async ({ name, email, password }) => {
      const response = await createTeacher({
        name,
        email,
        password,
        role: "TEACHER",
      });

      return response;
    },

    mutationKey: ["create-teacher"],
    onSuccess: (response) => {
      if (response.status === 201) {
        toast.success("Professor criado com sucesso!");
        queryClient.invalidateQueries({
          queryKey: ["teachers"],
        });
        form.reset();
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log("error", error);
        error.response?.data.message && toast.error("Erro ao criar professor!");
      }
    },
  });

  const updateTeacherMutation = useMutation<
    AxiosResponse,
    unknown,
    CreateTeacherType,
    unknown
  >({
    mutationFn: async ({ name, email, password }) => {
      const response = await updateTeacher({
        id: teacherToEdit?.id || "",
        name,
        email,
        password,
        role: "TEACHER",
      });

      return response;
    },

    mutationKey: ["update-teacher"],
    onSuccess: (response) => {
      console.log("response", response);
      if (response.status === 204) {
        toast.success("Professor atualizado com sucesso!");
        queryClient.invalidateQueries({
          queryKey: ["teachers"],
        });
        form.reset();
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log("error", error);
        error.response?.data.message &&
          toast.error("Erro ao atualizar professor!");
      }
    },
  });

  async function handleCreateSubject(data: CreateTeacherType) {
    if (!teacherToEdit) {
      createTeacherMutation.mutate(data);
    } else {
      updateTeacherMutation.mutate(data);
    }
  }

  return (
    <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
      <DialogHeader>
        <DialogTitle>
          {teacherToEdit
            ? "Atualizar professor(a)"
            : "Criar novo(a) professor(a)"}
        </DialogTitle>
        <DialogDescription>
          {`Preencha os campos para ${
            teacherToEdit ? "atualizar um(a)" : "adicionar uma novo(a)"
          } professor(a) na sua
          instituição.`}
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
              <FormItem className="col-span-2">
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

          {!teacherToEdit && (
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
          )}

          <div className="col-span-2 flex w-full items-end justify-end">
            <Button
              disabled={form.formState.isSubmitting}
              className="flex items-center gap-2"
              type="submit"
            >
              {form.formState.isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Salvar
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
