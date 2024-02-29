export interface NodeInterface {
  id: string;
  label: string;
  details: {
    description: string;
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
