import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { Button } from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { LuUserRound } from "react-icons/lu";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Logo } from "../../components/Logo";
import { auth } from "../../services/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect } from "react";
import toast from "react-hot-toast";
const schema = z.object({
  name: z.string().nonempty("O campo nome e obrigátorio"),
  email: z
    .string()
    .email("Deve ser um email válido")
    .nonempty("O Campo email e obrigátorio"),
  password: z
    .string()
    .min(8, "A senha deve ter mais de 8 caracteres")
    .nonempty("Digite um senha"),
});

type FormData = z.infer<typeof schema>;

export function Register() {
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
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (user) => {
        await updateProfile(user.user, {
          displayName: data.name,
        });
        console.log(user);
        toast.success("CADASTRADO COM SUCESSO");
        navigate("/painel", { replace: true });
      })
      .catch((error) => {
        toast.error("ERRO EM CADASTRAR");
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
        className="flex flex-col gap-2 w-full max-w-md"
      >
        <Input
          type="name"
          name="name"
          placeholder="Digite seu nome..."
          icon={<LuUserRound />}
          register={register}
          error={errors.name?.message}
        />
        <Input
          type="email"
          name="email"
          placeholder="Digite seu e-mail..."
          icon={<MdOutlineEmail />}
          register={register}
          error={errors.email?.message}
        />
        <Input
          placeholder="Digite sua senha..."
          type="password"
          name="password"
          icon={<TbLockPassword />}
          register={register}
          error={errors.password?.message}
        />
        <Button className="text-2xl">Cadastrar</Button>
      </form>
      <p className="font-bold text-zinc-800">
        Já tem conta?<Link to={"/entrar"}> clique aqui</Link>
      </p>
    </div>
  );
}
