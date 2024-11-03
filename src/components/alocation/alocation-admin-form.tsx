import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { z } from "zod";

import { getAllSubjectsByTeacher } from "@/http/get-all-subjects";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllClassSchedules } from "@/http/get-all-classSchedules";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError, AxiosResponse } from "axios";
import {
  createAlocation,
  CreateAlocationRequest,
} from "@/http/create-alocation";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import { IRooms } from "@/models/rooms";

import { Input } from "../ui/input";
import { ITeacher } from "@/models/teacher";
import { api } from "@/lib/axios";

const createClassesAndAlocationSchema = z.object({
  subjectId: z.string({
    message: "Selecione uma disciplina",
  }),
  teacherId: z.string({
    message: "Selecione um professor",
  }),
  classScheduleId: z.array(z.string()).refine((values) => values.length > 0, {
    message: "Selecione pelo menos um horário",
  }),
  date: z.string().transform((alocationDate) => new Date(alocationDate)),
});

type CreateClassesAndAlocationType = z.infer<
  typeof createClassesAndAlocationSchema
>;

interface AlocationAdminFormProps {
  classroom: IRooms;
}

export function AlocationAdminForm({ classroom }: AlocationAdminFormProps) {
  const { data: classSchedules } = useQuery({
    queryKey: ["classSchedules"],
    queryFn: async () => await getAllClassSchedules(),
  });

  const schedulesToUse = classSchedules?.filter((e) => {
    const isAlocated = classroom.classes.some(
      (a) => a.classScheduleId === e.id
    );

    if (isAlocated) {
      return false;
    }

    return true;
  });

  const allSchedulesNotAvailable = schedulesToUse?.length === 0;

  const form = useForm<CreateClassesAndAlocationType>({
    resolver: zodResolver(createClassesAndAlocationSchema),
    defaultValues: {
      classScheduleId: [],
    },
  });

  const { data: subjectsByTeacher } = useQuery({
    queryKey: ["subjects-by-teacher", form.getValues("teacherId")],
    queryFn: async () =>
      await getAllSubjectsByTeacher({
        teacherId: form.getValues("teacherId") as string,
      }),
  });

  const { data: teachers } = useQuery<ITeacher[]>({
    queryKey: ["teachers"],
    queryFn: () => {
      return api.get("/teachers").then((response) => response.data);
    },
  });

  const createAlocationMutation = useMutation<
    AxiosResponse,
    unknown,
    CreateAlocationRequest,
    unknown
  >({
    mutationFn: async ({
      classScheduleIds,
      classroomId,
      subjectId,
      date,
      userId,
    }) => {
      console.log({
        classScheduleIds,
        classroomId,
        subjectId,
        date,
        userId,
      });

      const response = await createAlocation({
        classScheduleIds,
        classroomId,
        subjectId,
        date,
        userId,
      });

      return response;
    },

    mutationKey: ["create-alocation"],

    onSuccess: (response) => {
      if (response.status === 201) {
        toast.success("Alocação realizada com sucesso!");
        queryClient.invalidateQueries({
          queryKey: ["classrooms"],
        });
        form.reset();
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log(error);
        error.response?.data.message &&
          toast.error("Erro ao realizar alocação.");
      }
    },
  });

  async function handleCreateAlocation({
    classScheduleId,
    subjectId,
    date,
    teacherId,
  }: CreateClassesAndAlocationType) {
    console.log({
      classScheduleId,
      subjectId,
      date,
      teacherId,
    });

    createAlocationMutation.mutate({
      classroomId: classroom.id,
      classScheduleIds: classScheduleId,
      subjectId,
      date,
      userId: teacherId,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateAlocation)}
        className="grid grid-cols-2 gap-2"
      >
        <FormField
          control={form.control}
          name="teacherId"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Professor</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o professor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {teachers && teachers.length > 0 ? (
                      teachers?.map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.id}>
                          {teacher.name}
                        </SelectItem>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm p-1">
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
          name="date"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Data de alocação</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={field.value ? field.value.toString() : undefined}
                />
              </FormControl>
              <FormDescription>
                Selecione uma data para alocação
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subjectId"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Matéria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleciona a matéria desejada" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {subjectsByTeacher && subjectsByTeacher.length > 0 ? (
                      subjectsByTeacher?.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </SelectItem>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm p-1">
                        Nenhuma màteria encontrada
                      </p>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        {schedulesToUse && schedulesToUse?.length > 0 ? (
          schedulesToUse.map((classSchedule) => (
            <FormField
              control={form.control}
              name="classScheduleId"
              key={classSchedule.id}
              render={({ field }) => (
                <FormItem className="flex gap-2 items-center space-y-0">
                  <FormControl>
                    <Checkbox
                      value={classSchedule.id}
                      checked={field.value.includes(classSchedule.id)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...field.value, classSchedule.id]
                          : field.value.filter((id) => id !== classSchedule.id);

                        field.onChange(newValue);
                      }}
                    />
                  </FormControl>

                  <FormLabel>
                    {classSchedule.startHour} - {classSchedule.endHour}
                  </FormLabel>
                </FormItem>
              )}
            />
          ))
        ) : (
          <p className="text-sm text-red-400 text-wrap">
            Nenhum horário disponível para alocação.
          </p>
        )}
        {form.formState.errors.classScheduleId && (
          <p className="text-red-400 text-sm">
            Selecione pelo menos um horário
          </p>
        )}

        <div className="col-span-2 flex w-full items-end justify-end">
          <Button
            className="disabled:cursor-not-allowed"
            disabled={allSchedulesNotAvailable}
            type="submit"
          >
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
}
