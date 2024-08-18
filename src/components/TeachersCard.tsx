const TeachersCard: React.FC = () => {
  return (
    <div className="flex flex-row bg-[#272727] h-36 w-[32%] rounded-lg justify-start p-6 items-center gap-10">
      <div className="flex flex-col items-start">
        <span className="text-white text-lg">Professor Luiz Evangelista</span>
        <div className="flex flex-col items-start">
          <p className="text-sm text-gray-400">Segurânça da Informação</p>
          <p className="text-sm text-gray-400">Engenharia de Software</p>
          <p className="text-sm text-gray-400">
            Programação em Microinformatica
          </p>
          <p className="text-sm text-gray-400">Laboratório de Hardware</p>
        </div>
      </div>
      <img className="rounded-full" src="https://fakeimg.pl/70x70" />
    </div>
  );
};

export default TeachersCard;
