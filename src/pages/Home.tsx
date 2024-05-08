import { DateCalendar } from "@mui/x-date-pickers/DateCalendar/DateCalendar";
import ClassesCard from "../components/ClassesCard";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Paper } from "@mui/material";
import RoomsAvailable from "../components/RoomsAvailable";
import MostUsedRooms from "../components/MostUsedRooms";

const Home: React.FC = () => {
  return (
    <div className="h-screen w-[80vw] bg-black px-6 py-4 overflow-auto">
      <div className="mb-5">
        <div>
          <p className="text-white text-xl">Olá, Luis Evangelista</p>
          <p className="text-gray-400 text-lg">Seja bem vindo a UniLink</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <ClassesCard />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Paper className="w-[500px]">
              <DateCalendar />
            </Paper>
          </LocalizationProvider>
        </div>
        <RoomsAvailable />
        <MostUsedRooms />
      </div>
    </div>
  );
};

export default Home;
