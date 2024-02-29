import { NodeInterface, LinkInterface } from './graphInterface';

export interface UserInterface {
  name: string;
  email: string;
  nodes: NodeInterface[];
  links?: LinkInterface[];
  interest?: string[];
  history?: string[];
  weakness?: string[];
  strength?: string[];
  education?: string[];
}
