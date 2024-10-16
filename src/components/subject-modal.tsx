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

const createSubjectSchema = z.object({
  teacherId: z.string({
    message: "Selecione um professor",
  }),
  name: z.string({
    message: "Preencha o nome da matéria",
  }),
});

export type CreateSubjectType = z.infer<typeof createSubjectSchema>;

export function SubjectModal() {
  const form = useForm<CreateSubjectType>({
    resolver: zodResolver(createSubjectSchema),
  });

  const { data: users } = useQuery<User[]>({
    queryKey: ["teachersOnSchool"],
    queryFn: () => {
      return api.get("/teachers").then((response) => response.data);
    },
  });

  const createSubjectMutation = useMutation<
    AxiosResponse,
    unknown,
    CreateSubjectType,
    unknown
  >({
    mutationFn: async ({ name, teacherId }) => {
      const response = await createSubject({
        name,
        teacherId,
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
      if (error instanceof AxiosError) {
        error.response?.data.message && toast.error("Erro ao criar matéria");
      }
    },
  });

  async function handleCreateSubject(data: CreateSubjectType) {
    createSubjectMutation.mutate(data);
  }

  return (
    <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
      <DialogHeader>
        <DialogTitle>Criar nova sala</DialogTitle>
        <DialogDescription>
          Preencha os campos para adicionar uma nova sala na sua instituição.
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
            name="teacherId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de sala</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo da sala" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {users && users.length > 0 ? (
                        users?.map((user) => (
                          <SelectItem value={user.id}>{user.name}</SelectItem>
                        ))
                      ) : (
                        <p className="text-sm">Nenhum professor encontrado</p>
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
    </DialogContent>
  );
}
