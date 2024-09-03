import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo4 from "../assets/logo4.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { signIn, SignInResponse } from "../http/sign-in";
import { useUser } from "../contexts/user-context";
import Cookies from "universal-cookie";

const authenticateFormSchema = z.object({
  email: z
    .string({
      message: "Insira um e-mail",
    })
    .email({
      message: "Por favor, digite um e-mail válido",
    }),
  password: z.string({
    message: "Insira uma senha",
  }),
});

type AuthenticateFormSchema = z.infer<typeof authenticateFormSchema>;

const Login: React.FC = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const cookies = new Cookies();

  const signInMutation = useMutation<
    SignInResponse,
    unknown,
    { email: string; password: string },
    unknown
  >({
    mutationFn: async ({ email, password }) => {
      const data = await signIn({
        email,
        password,
      });
      return data;
    },

    mutationKey: ["signIn"],
    onSuccess: (data) => {
      cookies.set("access_token", data.token, {
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      cookies.set("user-allowed", JSON.stringify(data.user), {
        path: "/",
        maxAge: 60 * 60 * 24,
      });
      setUser(data.user);
      navigate("/home");
    },
  });

  const { handleSubmit, register, formState } = useForm<AuthenticateFormSchema>(
    {
      resolver: zodResolver(authenticateFormSchema),
    }
  );

  useEffect(() => {
    user && navigate("/home");
  }, [user]);

  async function handleSignIn({ email, password }: AuthenticateFormSchema) {
    signInMutation.mutate({
      email,
      password,
    });
  }

  console.log("formState", formState)

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#2C2C2C]">
      <div className="gap-y-4 flex justify-center items-center flex-col w-[28rem] h-[32rem] rounded-lg bg-white">
        <div className="flex flex-row justify-center flex-wrap">
          <img src={logo4} className="w-16 h-16 mr-5 mt-2" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold ">UniLink</span>
            <span className="text-md">Gestão de Salas de Aula</span>
          </div>
        </div>
        <FormControl
          component="form"
          onSubmit={handleSubmit(handleSignIn)}
          className="w-4/5 flex gap-y-4"
        >
          <div className="flex flex-col gap-2">
            <TextField
              {...register("email")}
              label="E-mail"
              type="email"
              size="small"
            />
            {formState.errors.email && (
              <span className="text-red-500 text-sm font-bold">
                {formState.errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <TextField
              {...register("password")}
              label="Senha"
              size="small"
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
            />
            {formState.errors.password && (
              <span className="text-red-500 text-sm font-bold">
                {formState.errors.password.message}
              </span>
            )}
          </div>
          <Link
            className="text-blue-600 hover:underline decoration-solid"
            to={"/"}
          >
            Esqueci minha senha.
          </Link>
          <Button
            type="submit"
            className="w-full"
            sx={{ marginTop: "2rem" }}
            variant="outlined"
          >
            Login
          </Button>
        </FormControl>

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
