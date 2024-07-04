import { useState } from "react";
import logo from "../assets/logo.png";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";

import { Navigate, Outlet } from "react-router-dom";
import { NewAlocation } from "./NewAlocation";
import { MeetingRoom } from "@mui/icons-material";

const AppContainer: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="bg-gradient-to-r from-[#171717] flex flex-row to-[#313131] h-screen w-screen ">
      <div className="h-screen w-[20vw] flex flex-col gap-y-20 border-r-2 p-10">
        <img src={logo} />
        <div className="flex flex-col gap-y-6">
          <Button
            sx={{
              "&:hover": {
                color: "black",
                backgroundColor: "white",
              },
              color: "white",
              borderRadius: "10px",
              padding: "0.8rem",
              fontSize: "17px",
            }}
            size="large"
            fullWidth
            variant="text"
            startIcon={
              <HomeIcon
                sx={{
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              />
            }
            onClick={() => <Navigate to="/home"></Navigate>}
          >
            Página Principal
          </Button>
          <Button
            sx={{
              "&:hover": {
                color: "black",
                backgroundColor: "white",
              },
              color: "white",
              borderRadius: "10px",
              padding: "0.8rem",
              fontSize: "17px",
            }}
            size="large"
            fullWidth
            variant="text"
            startIcon={
              <AddIcon
                sx={{
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              />
            }
            onClick={() => setOpen(true)}
          >
            Nova Alocação
          </Button>
          <NewAlocation handleClose={() => setOpen(false)} open={open} />
          <Button
            sx={{
              "&:hover": {
                color: "black",
                backgroundColor: "white",
              },
              color: "white",
              borderRadius: "10px",
              padding: "0.8rem",
              fontSize: "17px",
              display: "flex",
              justifyContent: "space-center",
              alignItems: "center",
              gap: "1rem",
            }}
            size="large"
            fullWidth
            variant="text"
            startIcon={
              <MeetingRoom
                sx={{
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              />
            }
          >
            Salas
          </Button>
          <Button
            sx={{
              "&:hover": {
                color: "black",
                backgroundColor: "white",
              },
              color: "white",
              borderRadius: "10px",
              padding: "0.8rem",
              fontSize: "17px",
            }}
            size="large"
            fullWidth
            variant="text"
            startIcon={
              <SettingsIcon
                sx={{
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              />
            }
          >
            Configurações
          </Button>
        </div>
      </div>
      <div className="h-screen w-[80vw]">
        <Outlet />
      </div>
    </div>
  );
};

export default AppContainer;
