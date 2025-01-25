import { useAuth } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const signInSchema = z.object({
  email: z
    .string()
    .email("Formato de email inválido")
    .min(1, "Email é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const { authUser } = useAuth();

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    authUser({ email: data.email, password: data.password });
  };

  return (
    <form
      className="flex flex-col w-full px-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="mx-auto">Bem vindo</span>
      <div className="flex flex-col justify-start w-full mt-3">
        <label htmlFor="email-input">Email</label>
        <input
          type="text"
          id="email-input"
          className="bg-gray-900 rounded-md border-cyan-700 border-solid border p-2"
          {...register("email")}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div className="flex flex-col justify-start w-full mt-3">
        <label htmlFor="password-input">Senha</label>
        <input
          type="password"
          id="password-input"
          className="bg-gray-900 rounded-md border-cyan-700 border-solid border p-2"
          {...register("password")}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <button
        className="mx-auto mt-8 border border-solid p-2 rounded-md"
        type="submit"
      >
        ENTRAR
      </button>
    </form>
  );
};
