import { useAuthState, useDataQuery } from "./firebase";

export const useProfile = () => {
  const {user} = useAuthState();
  const [adminInfo, isLoading, error] =  useDataQuery(`admins/${user?.uid || 'guest'}`);
  const isAdmin = (adminInfo as {isAdmin?: boolean})?.isAdmin === true;

  return [{ user, isAdmin }, isLoading, error] as const;
};
