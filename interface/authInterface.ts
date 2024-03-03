import { NodeInterface, LinkInterface } from './graphInterface';

interface AdditionalProfileInterface {
  [key: string]: string[];
}
export type ProfileInterface = {
  interest?: string[];
  history?: string[];
  weakness?: string[];
  strength?: string[];
  education?: string[];
} & AdditionalProfileInterface;

export interface UserInterface {
  name: string;
  email: string;
  profile?: ProfileInterface;
  nodes: NodeInterface[];
  links: LinkInterface[];
  nodeNumber: number;
}
