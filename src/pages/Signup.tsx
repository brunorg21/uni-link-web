import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

const Signup: React.FC = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [teacherRegister, setTeacherRegister] = useState("");
  const [studentRegister, setStudentRegister] = useState("");
  const [CPF, setCPF] = useState("");
  const [radioOption, setRadioOption] = useState("Professor");

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleCPFChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCPF(event.target.value);
  };

  const handleRadioOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRadioOption(event.target.value);
  };

  const handleStudentRegisterChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setStudentRegister(event.target.value);
  };

  const handleTeacherRegisterChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setTeacherRegister(event.target.value);
  };
  return (
    <div className=" h-screen w-screen flex justify-center items-center bg-[#2C2C2C]">
      <div className="gap-y-4 flex justify-center items-center flex-col w-[28rem] h-[36rem] rounded-lg bg-white">
        <span className="text-black font">Criar conta como:</span>
        <RadioGroup
          style={{ display: "flex", flexDirection: "row" }}
          onChange={handleRadioOptionChange}
          value={radioOption}
          defaultValue={"Professor"}
        >
          <FormControlLabel
            value="Professor"
            label="Professor(a)"
            control={<Radio></Radio>}
          ></FormControlLabel>
          <FormControlLabel
            value="Aluno"
            label="Aluno(a)"
            control={<Radio></Radio>}
          ></FormControlLabel>
        </RadioGroup>
        <FormControl className="w-4/5 flex gap-y-4">
          <FormLabel></FormLabel>
          <TextField
            label="Usuário"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            label="Senha"
            type={"password"}
            value={password}
            onChange={handlePasswordChange}
          ></TextField>
          <TextField
            label="CPF"
            type={"text"}
            value={CPF}
            onChange={handleCPFChange}
          ></TextField>
          {radioOption === "Professor" ? (
            <TextField
              label="Registro Profissional"
              type={"text"}
              value={teacherRegister}
              onChange={handleTeacherRegisterChange}
            ></TextField>
          ) : (
            <TextField
              label="Registro Aluno"
              type={"text"}
              value={studentRegister}
              onChange={handleStudentRegisterChange}
            ></TextField>
          )}
        </FormControl>
        <Button className="w-4/5" sx={{ marginTop: "2rem" }} variant="outlined">
          Cadastrar
        </Button>
        <Link
          className="text-blue-600 hover:underline decoration-solid"
          to={"/"}
        >
          Ja possui uma conta? Clique aqui.
        </Link>
      </div>
    </div>
  );
};

export default Signup;
