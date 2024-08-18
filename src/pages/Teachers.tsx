import TeachersCard from "../components/TeachersCard";

const Teachers: React.FC = () => {
  return (
    <div className="h-full px-6 py-4 ">
      <div className="mb-5">
        <div>
          <p className="text-white text-xl">Professores</p>
          <p className="text-gray-400 text-lg">Gestão</p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-5 bg-white h-[90%] p-6 overflow-y-auto rounded-lg">
        <TeachersCard />
        <TeachersCard />
        <TeachersCard />
        <TeachersCard />
        <TeachersCard />
        <TeachersCard />
        <TeachersCard />
        <TeachersCard />
        <TeachersCard />
        <TeachersCard />
        <TeachersCard />
        <TeachersCard />
        <TeachersCard />
        <TeachersCard />
        <TeachersCard />
      </div>
    </div>
  );
};

export default Teachers;
