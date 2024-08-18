import SubjectCard from "../components/SubjectCard";

const Subjects: React.FC = () => {
  return (
    <div className="h-full px-6 py-4 ">
      <div className="mb-5">
        <div>
          <p className="text-white text-xl">Matérias</p>
          <p className="text-gray-400 text-lg">Gestão</p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4 bg-white h-[90%] p-6 overflow-y-auto rounded-lg">
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
      </div>
    </div>
  );
};

export default Subjects;
