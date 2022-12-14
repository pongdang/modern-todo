import { join } from '../api/join';
import { signIn } from '../api/signIn';
import { useTokenContext } from '../contexts/TokenContext';
import { User } from '../models/User';

export function useLogin() {
  const { setAccessToken } = useTokenContext();

  return {
    login: async (user: User) => {
      const { access_token } = await signIn(user);

      setAccessToken(access_token);
    },
  } as const;
}

export function useJoin() {
  const { setAccessToken } = useTokenContext();

  return {
    join: async (user: User) => {
      const { access_token } = await join(user);

      setAccessToken(access_token);
    },
  } as const;
}

export function useLogout() {
  const { clearAccessToken } = useTokenContext();

  return {
    logout: () => {
      clearAccessToken();
    },
  };
}
