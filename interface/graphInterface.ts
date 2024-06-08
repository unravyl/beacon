import { SimulationLinkDatum, SimulationNodeDatum } from 'd3';

export interface NodeInterface extends SimulationNodeDatum {
  id: string;
  label: string;
  details: {
    description: string;
    link?: string;
    salary?: string;
    companies?: string[];
    qualifications?: string[];
  };
  group: number;
}

export interface LinkInterface
  extends SimulationLinkDatum<SimulationNodeDatum> {
  source: NodeInterface;
  target: NodeInterface;
}

