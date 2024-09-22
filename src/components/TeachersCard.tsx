import { ITeacher } from "@/models/teacher";

interface TeachersProps {
  teacher: ITeacher;
}

const TeachersCard = ({ teacher }: TeachersProps) => {
  return (
    <div className="flex flex-row bg-[#272727] h-36 w-[32%] rounded-lg justify-start p-6 items-center gap-10">
      <div className="flex flex-col items-start">
        <span className="text-white text-lg">{teacher.name}</span>
        <div className="flex flex-col items-start">
          {teacher.subjects?.map((e) => (
            <p className="text-sm text-gray-400">{e.name}</p>
          ))}
        </div>
      </div>
      <img className="rounded-full" src="https://fakeimg.pl/70x70" />
    </div>
  );
};

export default TeachersCard;
