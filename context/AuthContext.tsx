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

interface AuthContextInterface {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

interface PropsInterface {
  children: ReactNode;
}

export const AuthWrapper = (props: PropsInterface) => {
  const { children } = props;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const authContextProviderValue = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
    }),
    [isLoggedIn, setIsLoggedIn]
  );

  return (
    <AuthContext.Provider value={authContextProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
