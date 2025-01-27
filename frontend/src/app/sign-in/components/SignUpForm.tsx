import { useAuth } from '@/contexts/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const signUpSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z
      .string()
      .email('Formato de email inválido')
      .min(1, 'Email é obrigatório'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Senhas não coincidem',
    path: ['confirmPassword'],
  });

type SignInFormData = z.infer<typeof signUpSchema>;

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const { signUpUser } = useAuth();

  const onSubmit: SubmitHandler<SignInFormData> = data => {
    signUpUser({ name: data.name, email: data.email, password: data.password });
  };

  return (
    <form
      className="flex flex-col w-full px-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="mx-auto">Criar nova conta</span>
      <div className="flex flex-col justify-start w-full mt-3">
        <label htmlFor="email-input">Nome</label>
        <input
          type="text"
          id="email-input"
          className="bg-gray-900 rounded-md border-cyan-700 border-solid border p-2"
          {...register('name')}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div className="flex flex-col justify-start w-full mt-3">
        <label htmlFor="email-input">Email</label>
        <input
          type="text"
          id="email-input"
          className="bg-gray-900 rounded-md border-cyan-700 border-solid border p-2"
          {...register('email')}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div className="flex flex-col justify-start w-full mt-3">
        <label htmlFor="password-input">Senha</label>
        <input
          type="password"
          id="password-input"
          className="bg-gray-900 rounded-md border-cyan-700 border-solid border p-2"
          {...register('password')}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <div className="flex flex-col justify-start w-full mt-3">
        <label htmlFor="password-input">Confirmação de senha</label>
        <input
          type="password"
          id="confirm-password-input"
          className="bg-gray-900 rounded-md border-cyan-700 border-solid border p-2"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}
      </div>
      <button
        className="mx-auto mt-8 border border-solid p-2 rounded-md"
        type="submit"
      >
        Cadastrar
      </button>
    </form>
  );
};
