import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssignStudentWithSubjects } from "./tabs/assign-student-with-subjects";
import { useUser } from "@/contexts/user-context";
import { UserCheckIcon, UserPlus } from "lucide-react";
import { CreateStudent } from "./tabs/create-student";

export function Config() {
  const { user } = useUser();

  return (
    <Tabs className="h-screen p-4" defaultValue="assign-student">
      <TabsList className="grid w-full grid-cols-2 bg-muted text-primary">
        <TabsTrigger className="flex items-center gap-2" value="assign-student">
          <UserCheckIcon size={20} />
          Matricular aluno
        </TabsTrigger>
        {user?.role === "ADMIN" && (
          <TabsTrigger
            className="flex items-center gap-2"
            value="create-student"
          >
            <UserPlus size={20} />
            Criar novo estudante
          </TabsTrigger>
        )}
      </TabsList>
      <TabsContent value="assign-student">
        <AssignStudentWithSubjects />
      </TabsContent>
      <TabsContent value="create-student">
        <CreateStudent />
      </TabsContent>
    </Tabs>
  );
}
