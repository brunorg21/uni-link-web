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

import { createCourse } from "@/http/create-course";
import { ICourse } from "@/models/course";
import { updateCourse } from "@/http/update-course";

interface CourseModalProps {
  courseToEdit?: ICourse | null;
}

const createCourseSchema = z.object({
  name: z.string({
    message: "Preencha o nome da curso",
  }),
});

export type CourseFormType = z.infer<typeof createCourseSchema>;

export function CourseModal({ courseToEdit }: CourseModalProps) {
  const form = useForm<CourseFormType>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      name: courseToEdit?.name || "",
    },
  });

  const createCourseMutation = useMutation<
    AxiosResponse,
    unknown,
    CourseFormType,
    unknown
  >({
    mutationFn: async ({ name }) => {
      const response = await createCourse({
        name,
      });

      return response;
    },

    mutationKey: ["create-course"],
    onSuccess: (response) => {
      if (response.status === 201) {
        toast.success("Curso criado com sucesso");
        queryClient.invalidateQueries({
          queryKey: ["courses"],
        });
        form.reset();
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        error.response?.data.message && toast.error("Erro ao criar curso");
      }
    },
  });

  const updateCourseMutation = useMutation<
    AxiosResponse,
    unknown,
    CourseFormType,
    unknown
  >({
    mutationFn: async ({ name }) => {
      const response = await updateCourse({
        name,
        courseId: courseToEdit?.id || "",
      });

      return response;
    },

    mutationKey: ["update-course"],
    onSuccess: (response) => {
      if (response.status === 204) {
        toast.success("Matéria atualizada com sucesso");
        queryClient.invalidateQueries({
          queryKey: ["courses"],
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

  async function handleCreateCourse(data: CourseFormType) {
    if (!courseToEdit) {
      createCourseMutation.mutate(data);
    } else {
      updateCourseMutation.mutate(data);
    }
  }

  return (
    <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
      <DialogHeader>
        <DialogTitle>
          {courseToEdit ? "Atualizar curso" : "Criar novo curso"}
        </DialogTitle>
        <DialogDescription>
          {`Preencha os campos para ${
            courseToEdit ? "atualizar um" : "adicionar uma novo"
          } curso na sua instituição.`}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateCourse)}
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
                    placeholder="Preencha com o nome do curso"
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
