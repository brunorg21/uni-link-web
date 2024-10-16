import { ISubjects } from "@/models/subjects";
import { Button } from "./ui/button";

interface SubjectProps {
  subject: ISubjects;
}

const SubjectCard = ({ subject }: SubjectProps) => {
  return (
    <div className="col-span-1 bg-secondary rounded-lg p-6 items-center ">
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center font-bold">
          <span className="text-primary text-xl">{subject.name}</span>
          <span className="text-primary text-lg">MPL0011</span>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-400 font-semibold">
            {subject.user.name}
          </p>
        </div>
        <Button>Editar</Button>
      </div>
    </div>
  );
};

export default SubjectCard;
