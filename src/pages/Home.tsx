import { DateCalendar } from "@mui/x-date-pickers/DateCalendar/DateCalendar";
import ClassesCard from "../components/ClassesCard";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Paper } from "@mui/material";
import "dayjs/locale/pt-BR";
import { TeacherHome } from "./teacher-pages/teacher-home";
import { useUser } from "../contexts/user-context";
import { StudentHome } from "./student-pages/student-home";

const Home = () => {
  const { user } = useUser();

  console.log(user);

  return (
    <div className="h-full px-6 py-4 overflow-auto">
      <div className="mb-5">
        <div>
          <p className="text-white text-xl">Olá, Luis Evangelista</p>
          <p className="text-gray-400 text-lg">Seja bem vindo a UniLink</p>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex gap-2 justify-between items-center">
          <ClassesCard />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Paper>
              <DateCalendar />
            </Paper>
          </LocalizationProvider>
        </div>
        {user.role === "STUDENT" ? <StudentHome /> : <TeacherHome />}
      </div>
    </div>
  );
};

export default Home;
