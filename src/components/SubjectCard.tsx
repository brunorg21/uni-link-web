const SubjectCard: React.FC = () => {
  return (
    <div className="flex flex-row bg-[#272727] h-72 w-72 rounded-lg justify-center p-6 items-center gap-10 ">
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center font-bold">
          <span className="text-white text-xl">Programação Linear</span>
          <span className="text-white text-lg">MPL0011</span>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-400">Divani Barbosa</p>
        </div>
        <button className="bg-white w-32 rounded-full h-8 font-bold">
          Editar
        </button>
      </div>
    </div>
  );
};

export default SubjectCard;
