import { ITeacher } from "@/models/teacher";

interface TeachersProps {
  teacher: ITeacher;
  whiteMode?: boolean;
}

const TeachersCard = ({ teacher, whiteMode }: TeachersProps) => {
  console.log("teacher", teacher);

  return (
    <div
      className={`flex flex-row ${
        whiteMode ? "bg-white" : "bg-[#272727]"
      } h-36 w-[32%] rounded-lg justify-between p-6 items-center gap-10`}
    >
      <div className="flex flex-col items-start">
        <span className={`${whiteMode ? "text-black" : "text-white"} text-2xl`}>
          {teacher.name}
        </span>
        <div className="flex gap-2 items-start">
          {teacher.subjects?.map((e) => (
            <p className="text-md text-secondary">{e.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeachersCard;
