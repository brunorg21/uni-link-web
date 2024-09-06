import { ClassCard } from "./ClassCard";

const ClassesCard: React.FC = () => {
  return (
    <div className="h-[21rem] w-full flex flex-col rounded-md bg-white p-3 font-bold overflow-auto">
      <h1 className="text-2xl pb-3">Aulas</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-2">
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
      </div>
    </div>
  );
};

export default ClassesCard;
