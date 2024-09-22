import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { SheetContent, SheetDescription, SheetHeader } from "./ui/sheet";
import { z } from "zod";

interface AlocationDrawerProps {
  roomName: string;
}

const createClassesSchema = z.object({
  subjectId: z.string(),
});

export function AlocationDrawer({ roomName }: AlocationDrawerProps) {
  const form = useForm();

  return (
    <SheetContent className="space-y-2">
      <SheetHeader className="text-xl">{roomName} </SheetHeader>
      <SheetDescription>Faça uma nova reserva para a sala</SheetDescription>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
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
          {/* <FormField
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
          /> */}

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
    </SheetContent>
  );
}
