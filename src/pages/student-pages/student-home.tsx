import TeachersCard from "@/components/TeachersCard";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";
import { ITeacher } from "@/models/teacher";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";

export function StudentHome() {
  const { data: teachers } = useQuery<ITeacher[]>({
    queryKey: ["teachers"],
    queryFn: () => {
      return api.get("/teachers").then((response) => response.data);
    },
  });
  const [search, setSearch] = useState("");
  const filtedTeachers = teachers?.filter((e: ITeacher) => {
    return e.name.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <div className="py-5 h-1/2">
      <div className="relative w-80 h-12">
        <Search className="absolute left-3 top-6 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          className="pl-10 h-full bg-white text-base"
          placeholder="Buscar Professor"
        />
      </div>
      <div className="flex flex-row py-6 gap-2 mt-4 rounded-lg overflow-y-auto flex-wrap h-[80%]">
        {filtedTeachers?.map((e: ITeacher) => (
          <TeachersCard whiteMode={true} teacher={e} key={e.id} />
        ))}
      </div>
    </div>
  );
}
