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


  return (
    <div className="h-full px-6 py-4 overflow-auto ">
      <div className="mb-5 h-[10%]">
        <div>
          <p className="text-white text-4xl">
            {user ? `Olá, ${user?.name}` : "Carregando..."}
          </p>
          <p className="text-gray-400 text-lg">Seja bem vindo a UniLink</p>
        </div>
        
      </div>
      <div className="flex flex-col space-y-2 h-[86%]">
        <div className="flex gap-2 justify-between items-center h-1/2">
          <ClassesCard />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Paper>
              <DateCalendar />
            </Paper>
          </LocalizationProvider>
        </div>
        {user && user.role === "STUDENT" && <StudentHome />}
        {user && user.role === "TEACHER" && <TeacherHome />}
        {user && user.role === "ADMIN" && <TeacherHome />}
      </div>
    </div>
  );
};

export default Home;
