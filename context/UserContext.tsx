'use client';

import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react';
import { UserInterface } from '@/interface/authInterface';

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
  const [user, setUser] = useState<UserInterface>({} as UserInterface);

  const userContextProviderValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );

  return (
    <UserContext.Provider value={userContextProviderValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
