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

interface NodeNumberContextInterface {
  nodeNumber: number;
  setNodeNumber: Dispatch<SetStateAction<number>>;
}

const NodeNumberContext = createContext<NodeNumberContextInterface>(
  {} as NodeNumberContextInterface
);

interface PropsInterface {
  children: ReactNode;
}

export const NodeNumberWrapper = (props: PropsInterface) => {
  const { children } = props;
  const [nodeNumber, setNodeNumber] = useState<number>(0);

  const nodeNumberContextProviderValue = useMemo(
    () => ({
      nodeNumber,
      setNodeNumber,
    }),
    [nodeNumber, setNodeNumber]
  );

  return (
    <NodeNumberContext.Provider value={nodeNumberContextProviderValue}>
      {children}
    </NodeNumberContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(NodeNumberContext);
};
