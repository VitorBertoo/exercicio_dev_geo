export const SignInForm = () => {
  return (
    <>
      <span>ENTRAR</span>
      <div className="flex flex-col justify-start w-full mt-3">
        <label htmlFor="#email-input">Email</label>
        <input
          type="text"
          id="email-input"
          className="bg-gray-900 rounded-md border-cyan-700 border-solid border p-2"
        />
      </div>
      <div className="flex flex-col justify-start w-full mt-3">
        <label htmlFor="#password-input">Senha</label>
        <input
          type="password"
          id="password-input"
          className="bg-gray-900 rounded-md border-cyan-700 border-solid border p-2"
        />
      </div>
    </>
  );
};
