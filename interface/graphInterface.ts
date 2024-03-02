export interface NodeInterface {
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

export interface LinkInterface {
  source: string;
  target: string;
}
