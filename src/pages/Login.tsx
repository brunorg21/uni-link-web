import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo4 from "../assets/logo4.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { signIn, SignInResponse } from "../http/sign-in";
import { useUser } from "../contexts/user-context";
import Cookies from "universal-cookie";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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

  const form = useForm<AuthenticateFormSchema>({
    resolver: zodResolver(authenticateFormSchema),
  });

  useEffect(() => {
    user && navigate("/home");
  }, [user]);

  async function handleSignIn({ email, password }: AuthenticateFormSchema) {
    signInMutation.mutate({
      email,
      password,
    });
  }

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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignIn)}
            className="w-4/5 flex flex-col gap-y-4"
            action=""
          >
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="E-mail" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Senha" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Link
              className=" hover:underline decoration-solid font-semibold"
              to={"/"}
            >
              Esqueci minha senha.
            </Link>

            <Button type="submit" className="w-full mt-2">
              {signInMutation.isPending ? (
                <Loader2 className="animate-spin" size={"small"} />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>

        <Link
          className="hover:underline decoration-solid font-semibold"
          to={"/signup"}
        >
          Não possui conta? Registre-se
        </Link>
      </div>
    </div>
  );
};

export default Login;
