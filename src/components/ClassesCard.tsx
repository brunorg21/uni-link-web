import { ClassCard } from "./ClassCard";

const ClassesCard: React.FC = () => {
  return (
    <div className="h-[21rem] max-w-2xl flex flex-col rounded-md bg-white p-3 font-bold">
      <p className="text-lg pb-3">Aulas</p>
      <div className="grid grid-cols-4 gap-3 overflow-y-auto">
        <ClassCard/>
        <ClassCard/>
        <ClassCard/>
        <ClassCard/>
        <ClassCard/>
        <ClassCard/>
        <ClassCard/>
        <ClassCard/>
        <ClassCard/>
        <ClassCard/>
        <ClassCard/>
        <ClassCard/>
        <ClassCard/>
        <ClassCard/>
      </div>
    </div>
  );
};

export default ClassesCard;
