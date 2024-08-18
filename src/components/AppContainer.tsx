import { useState } from "react";
import logo from "../assets/logo.png";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";

import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { NewAlocation } from "./NewAlocation";
import { MeetingRoom } from "@mui/icons-material";
import GroupsIcon from "@mui/icons-material/Groups";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

const AppContainer: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
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
              display: "flex",
              justifyContent: "flex-start",
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
            onClick={() => navigate("/home")}
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
              display: "flex",
              justifyContent: "flex-start",
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
            onClick={() => navigate("/rooms")}
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
              justifyContent: "flex-start",
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
            onClick={() => navigate("/teachers")}
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
              justifyContent: "flex-start",
            }}
            size="large"
            fullWidth
            variant="text"
            startIcon={
              <GroupsIcon
                sx={{
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              />
            }
          >
            Professores
          </Button>
          <Button
            onClick={() => navigate("/subjects")}
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
              justifyContent: "flex-start",
            }}
            size="large"
            fullWidth
            variant="text"
            startIcon={
              <LibraryBooksIcon
                sx={{
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              />
            }
          >
            Matérias
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
              display: "flex",
              justifyContent: "flex-start",
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
      <div className="h-screen w-[80vw] overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default AppContainer;
