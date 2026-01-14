import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { Button } from "../../components/Button";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Logo } from "../../components/Logo";
import { useEffect } from "react";
import toast from "react-hot-toast";

const schema = z.object({
  email: z
    .string()
    .email("Insira um email válido")
    .nonempty("O campo email e obrigatório"),
  password: z.string().nonempty("O campo senha e obrigatório"),
});

type FormData = z.infer<typeof schema>;

export function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  async function onSubmit(data: FormData) {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => {
        toast.success("Logado com sucesso");
        console.log(user);
        navigate("/painel", { replace: true });
      })
      .catch((error) => {
        toast.error("Erro em entrar");
        console.log(error);
      });
  }

  useEffect(() => {
    async function handleLogout() {
      await signOut(auth);
      toast.success("USUARIO DESLOGADO");
    }

    handleLogout();
  }, []);

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center gap-5">
      <Logo />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full max-w-md p-2"
      >
        <Input
          type="email"
          name="email"
          placeholder="Digite seu e-mail..."
          register={register}
          error={errors.email?.message}
          icon={<MdOutlineEmail />}
        />
        <Input
          placeholder="Digite sua senha..."
          type="password"
          name="password"
          register={register}
          error={errors.password?.message}
          icon={<TbLockPassword />}
        />
        <Button className="text-2xl">Entrar</Button>
      </form>
      <p className="font-bold">
        Não tem conta? <Link to={"/cadastro"}>Cadastre Aqui</Link>
      </p>
    </div>
  );
}
