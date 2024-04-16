import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import logo4 from "../assets/logo4.png";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  return (
    <div className=" h-screen w-screen flex justify-center items-center bg-[#2C2C2C]">
      <div className="gap-y-4 flex justify-center items-center flex-col w-[28rem] h-[36rem] rounded-lg bg-white">
        <div className="flex flex-row justify-center flex-wrap">
          <img src={logo4} className="w-28 h-28 mr-5 mt-2" />
          <div className="flex flex-col items-center">
            <span className="text-[4rem] font-bold ">UniLink</span>
            <span className="">Gestão de Salas de Aula</span>
          </div>
        </div>
        <FormControl className="w-4/5 flex gap-y-4">
          <TextField
            label="Usuário"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            label="Senha"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={password}
            onChange={handlePasswordChange}
          ></TextField>
          <Link
            className="text-blue-600 hover:underline decoration-solid"
            to={"/"}
          >
            Esqueci minha senha.
          </Link>
        </FormControl>
        <Button className="w-4/5" sx={{ marginTop: "2rem" }} variant="outlined">
          Login
        </Button>
        <Link
          className="text-blue-600 hover:underline decoration-solid"
          to={"/signup"}
        >
          Não possui conta? Registre-se
        </Link>
      </div>
    </div>
  );
};

export default Login;
