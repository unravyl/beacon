export interface CareerInterface {
  name: string;
  description: string;
  salary: string;
  companies: string[];
  qualifications: string[];
  strengths: string[];
  weaknessness: string[];
}

interface CareerAssessmentInterface {
  name: string;
  description: string;
  link: string;
}

interface CareerSkillResourceInterface {
  name: string;
  description: string;
  link: string;
}

interface CareerSkillInterface {
  name: string;
  description: string;
  assessment: CareerAssessmentInterface;
  resources: CareerSkillResourceInterface[];
}

export interface CareerDataInterface {
  name: string;
  skills: CareerSkillInterface[];
}
