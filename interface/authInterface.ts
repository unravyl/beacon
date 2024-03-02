import { NodeInterface, LinkInterface } from './graphInterface';

export interface UserInterface {
  name: string;
  email: string;
  nodes?: NodeInterface[];
  links?: LinkInterface[];
  interest?: string[];
  history?: string[];
  weakness?: string[];
  strength?: string[];
  education?: string[];
  nodeNumber: number;
}

interface ProfileInterface {
  interest?: string[];
  history?: string[];
  weakness?: string[];
  strength?: string[];
  education?: string[];
}

export interface NewUserInterface {
  name: string;
  email: string;
  profile: ProfileInterface;
  nodes: NodeInterface[];
  links: LinkInterface[];
  nodeNumber: number;
}
