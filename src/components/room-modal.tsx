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
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { createRoom } from "@/http/create-room";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";

const createRoomSchema = z.object({
  type: z.enum(["LAB", "CLASSROOM"], {
    message: "Preencha um tipo válido",
  }),
  name: z.string({
    message: "Preencha o nome da sala",
  }),
  capacity: z.coerce
    .number()
    .min(0, {
      message: "Capacidade mínima excedida (mín. 0)",
    })
    .max(100, {
      message: "Capacidade máxima excedida (máx. 100)",
    })
    .default(0),
  computers: z.coerce
    .number()
    .min(0, {
      message: "Quantidade de computadores mínima excedida (mín. 0)",
    })
    .max(100, {
      message: "Quantidade de computadores máxima excedida (máx. 100)",
    })
    .default(0),
});

export type CreateRoomType = z.infer<typeof createRoomSchema>;

export function RoomModal() {
  const form = useForm<CreateRoomType>({
    resolver: zodResolver(createRoomSchema),
  });

  const createRoomMutation = useMutation<
    AxiosResponse,
    unknown,
    CreateRoomType,
    unknown
  >({
    mutationFn: async ({ capacity, computers, name, type }) => {
      const response = await createRoom({
        capacity,
        computers,
        name,
        type,
      });
      return response;
    },

    mutationKey: ["create-room"],
    onSuccess: (response) => {
      if (response.status === 201) {
        toast.success("Sala criada com sucesso");
        queryClient.invalidateQueries({
          queryKey: ["classrooms"],
        });
        form.reset();
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        error.response?.data.message && toast.error("Erro ao criar sala");
      }
    },
  });

  async function handleCreateRoom(data: CreateRoomType) {
    await createRoomMutation.mutate(data);
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
          onSubmit={form.handleSubmit(handleCreateRoom)}
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
                    placeholder="Preencha com o nome da sala"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacidade</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Capacidade de alunos"
                    min={0}
                    max={100}
                    type="number"
                    id="capacity"
                    className="col-span-3"
                    {...field}
                    defaultValue={0}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
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
                      <SelectItem value="LAB">Laboratório</SelectItem>
                      <SelectItem value="CLASSROOM">Sala de aula</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="computers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Computadores</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Número de computadores"
                    min={0}
                    max={100}
                    type="number"
                    id="computers"
                    className="col-span-3"
                    defaultValue={0}
                    {...field}
                  />
                </FormControl>

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
