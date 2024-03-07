'use client';

import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useMemo,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { UserInterface } from '@/interface/authInterface';
import { handleAuthStateChange } from '@/db/auth';

interface UserContextInterface {
  user: UserInterface;
  setUser: Dispatch<SetStateAction<UserInterface>>;
}

const UserContext = createContext<UserContextInterface>(
  {} as UserContextInterface
);

interface PropsInterface {
  children: ReactNode;
}

export const UserWrapper = (props: PropsInterface) => {
  const { children } = props;
  const [user, setUser] = useState({} as UserInterface);

  const userContextProviderValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );

  useEffect(() => {
    handleAuthStateChange(user, setUser);
  }, []);

  return (
    <UserContext.Provider value={userContextProviderValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
