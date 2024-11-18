import { DateCalendar } from "@mui/x-date-pickers/DateCalendar/DateCalendar";
import ClassesCard from "../components/ClassesCard";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Paper } from "@mui/material";
import "dayjs/locale/pt-BR";
import { TeacherHome } from "./teacher-pages/teacher-home";
import { useUser } from "../contexts/user-context";
import { StudentHome } from "./student-pages/student-home";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs/";
import updateLocale from "dayjs/plugin/updateLocale";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(updateLocale);
dayjs.extend(localeData);
dayjs.updateLocale("pt-BR", {
  weekdaysMin: ["D", "S", "T", "Q", "Q", "S", "S"], // Personalize os dias da semana abreviados
});
dayjs.locale("pt-BR");
const Home = () => {
  const { user } = useUser();
  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));
  console.log("Weekdays Min:", dayjs.weekdaysMin());
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
      <div className="flex flex-col space-y-5 h-[86%]">
        <div className="flex gap-2 justify-between items-center h-1/2">
          <ClassesCard date={date} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Paper>
              <DateCalendar
                value={date}
                onChange={(newDate) => setDate(newDate)}
              />
            </Paper>
          </LocalizationProvider>
        </div>
        {user && user.role === "STUDENT" && <StudentHome />}
        {user && user.role === "TEACHER" && <TeacherHome date={date} />}
        {user && user.role === "ADMIN" && <TeacherHome date={date} />}
      </div>
    </div>
  );
};

export default Home;
