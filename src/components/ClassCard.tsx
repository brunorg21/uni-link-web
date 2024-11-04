import { IClasses } from "@/models/classes";

interface ClassCardProps {
  classes: IClasses;
}
const ClassCard: React.FC<ClassCardProps> = ({ classes }) => {
  return (
    <div className="flex flex-col justify-between bg-[#272727] rounded-lg px-1 py-3 text-center col-span-1 hover:opacity-75 duration-150 hover:cursor-pointer">
      <span className="text-white text-md">{classes.subject.name}</span>
      <p className="text-lg text-gray-400">{classes.classroom.name}</p>
      <p className="text-sm text-emerald-400">{`${classes.classSchedule.startHour} - ${classes.classSchedule.endHour}`}</p>
    </div>
  );
};

export default ClassCard;
