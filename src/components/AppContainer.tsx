import { PropsWithChildren, useState } from "react";
import logo from "../assets/logo.png";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import Home from "../pages/Home";
import { Navigate, Outlet } from "react-router-dom";
import { NewAlocation } from "./NewAlocation";
import { MeetingRoom } from "@mui/icons-material";

const Notebook: React.FC = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.4 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12.6"
        stroke="#E3E3E3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 6H6"
        stroke="#E3E3E3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 10H6"
        stroke="#E3E3E3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 14H6"
        stroke="#E3E3E3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 18H6"
        stroke="#E3E3E3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.4 2.59999C18.8168 2.33093 19.3133 2.21284 19.8066 2.26538C20.3 2.31793 20.7604 2.53794 21.1112 2.88876C21.4621 3.23957 21.6821 3.70001 21.7346 4.19336C21.7872 4.6867 21.6691 5.18315 21.4 5.59999L16 11L12 12L13 7.99999L18.4 2.59999Z"
        stroke="#E3E3E3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const AppContainer: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)
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
              fontSize: "12px",
            }}
            size="large"
            fullWidth
            variant="text"
            startIcon={<HomeIcon />}
            onClick={() => <Navigate to="/home"></Navigate>}
          >
            Página Pricipal
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
              fontSize: "12px",
            }}
            size="large"
            fullWidth
            variant="text"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Nova Alocação
          </Button>
          <NewAlocation handleClose={() => setOpen(false)} open={open}/>
          <Button
            sx={{
              "&:hover": {
                color: "black",
                backgroundColor: "white",
              },
              color: "white",
              borderRadius: "10px",
              padding: "0.8rem",
              fontSize: "12px",
              display: "flex",
              justifyContent: "space-center",
              alignItems: "center",
              gap: "1rem"
            }}
            size="large"
            fullWidth
            variant="text"
            startIcon={<MeetingRoom />}
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
              fontSize: "12px",
            }}
            size="large"
            fullWidth
            variant="text"
            startIcon={<SettingsIcon />}
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
