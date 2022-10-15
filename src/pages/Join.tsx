import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { join } from "../api/join";
import { signIn } from "../api/signIn";
import Title from "../components/Title";
import UserForm from "../components/UserForm";
import { User } from "../models/User";

export function Join({ setIsLogin }: { setIsLogin: React.Dispatch<React.SetStateAction<boolean>> }) {
  const navigate = useNavigate();

  const handleJoin = useCallback(async (e: React.FormEvent<HTMLFormElement>, { email, password }: User) => {
    await join({ email, password });
    await signIn({ email, password });

    setIsLogin(true);

    navigate("/todo");
  }, []);

  return (
    <>
      <Title>singup Page</Title>
      <UserForm onSubmit={handleJoin} />
    </>
  );
}
