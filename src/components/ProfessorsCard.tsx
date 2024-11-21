import { ITeacher } from "@/models/teacher";
import { Badge } from "./ui/badge";

interface TeachersProps {
  teacher: ITeacher;
  whiteMode?: boolean;
}

const ProfessorsCard = ({ teacher, whiteMode }: TeachersProps) => {
  return (
    <div
      className={`flex flex-col justify-between bg-[#272727] rounded-lg px-1 py-3 text-center col-span-1 hover:opacity-75 duration-150 hover:cursor-pointer`}
    >
      <div className=" h-full flex flex-col space-y-2 items-center justify-center">
        <span className={`${whiteMode ? "text-black" : "text-white"} text-2xl`}>
          {teacher.name}
        </span>
        <div className="flex gap-2 items-start ">
          {teacher.subjects?.map((e) => (
            <Badge key={e.name}>{e.name}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfessorsCard;
