import logo from "../assets/logo.png";

import { Outlet, useNavigate } from "react-router-dom";

import { NavButton } from "./NavButton";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useUser } from "@/contexts/user-context";
import Cookies from "universal-cookie";

const AppContainer: React.FC = () => {
  const { setUser } = useUser();

  const cookies = new Cookies();

  const navigate = useNavigate();

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
          <Button
            variant={"ghost"}
            className={`flex gap-4 items-center text-white hover:text-primary text-md p-6 $`}
            onClick={() => {
              cookies.remove("user-allowed");
              cookies.remove("access_token");
              setUser(null);
              navigate("/login");
            }}
          >
            <LogOut size={25} />
            Sair
          </Button>
        </div>
      </div>
      <div className="h-screen w-full overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default AppContainer;
