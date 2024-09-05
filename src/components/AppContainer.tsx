import logo from "../assets/logo.png";

import { Outlet } from "react-router-dom";

import { NavButton } from "./NavButton";

const AppContainer: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-[#171717] flex flex-row to-[#313131] h-screen">
      <div className="flex flex-col max-w-[250px] gap-y-20 border-r-2 p-4">
        <img src={logo} />
        <div className="flex flex-col gap-y-4">
          <NavButton name="House" text="Página Inicial" to="/home" />
          <NavButton name="Plus" text="Nova alocação" to="/new-alocation" />
          <NavButton name="DoorOpen" text="Salas" to="/rooms" />
          <NavButton name="UserRoundPen" text="Professores" to="/teachers" />
          <NavButton name="Book" text="Matérias" to="/classes" />
          <NavButton name="UserRoundCog" text="Configurações" to="/config" />
        </div>
      </div>
      <div className="h-screen w-[80vw] overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default AppContainer;
