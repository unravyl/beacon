import { updateUserLinks, updateUserNodes } from '@/db/store';
import { UserInterface } from '@/interface/authInterface';
import {
  CareerUpskillingInterface,
  CareerDetailsInterface,
} from '@/interface/careerInterface';
import { LinkInterface, NodeInterface } from '@/interface/graphInterface';
import { Dispatch, SetStateAction } from 'react';

export const insertStepNodes = (
  user: UserInterface,
  setUser: Dispatch<SetStateAction<UserInterface>>,
  careerNode: NodeInterface
) => {
  let nodeIdNumber = user.nodeNumber;
  let stepNodes: NodeInterface[] = [];
  let stepLinks: LinkInterface[] = [];
  const stepDetails = [
    {
      label: 'Upskilling',
      description: 'Preparation of skills for your career',
      group: 3,
    },
    {
      label: 'Legal Documents',
      description:
        'Preparation of legal required documents for you to be able to work',
      group: 4,
    },
    {
      label: 'Resume and Cover Letter',
      description:
        'Preparation of Resume and Cover Letter for you to submit with your job application',
      group: 5,
    },
    {
      label: 'Job Hunting',
      description: 'Guide on the job hunting process',
      group: 6,
    },
  ];

  stepDetails.forEach((step) => {
    const stepNode: NodeInterface = {
      id: 'Node ' + nodeIdNumber,
      label: step.label,
      details: {
        description: step.description,
      },
      group: step.group,
    };
    stepNodes.push(stepNode);

    let newLink = {} as LinkInterface;
    if (stepLinks.length) {
      console.log('LOG STEP NODES -2', stepNodes[stepNodes.length - 1]);
      newLink = {
        source: stepNodes[stepNodes.length - 2],
        target: stepNode,
      };
    } else {
      newLink = {
        source: careerNode,
        target: stepNode,
      };
    }
    stepLinks.push(newLink);

    nodeIdNumber += 1;
  });
  // function to insert the new nodes
  // function to update the global latest node number
  updateUserNodes(user, setUser, stepNodes);

  // function to insert the new links
  updateUserLinks(user, setUser, stepLinks);
};

export const insertUpskillingNodes = (
  user: UserInterface,
  setUser: Dispatch<SetStateAction<UserInterface>>,
  newUpskillingData: CareerUpskillingInterface,
  currentStepNode: NodeInterface,
  nextStepNode: NodeInterface
) => {
  // function to insert new nodes
  let nodeIdNumber = user.nodeNumber;
  const skills = newUpskillingData.skills;
  let newNodes: NodeInterface[] = [];
  let newLinks: LinkInterface[] = [];

  skills.forEach((skill) => {
    const skillNode: NodeInterface = {
      id: 'Node ' + nodeIdNumber,
      label: skill.name,
      details: {
        description: skill.description,
      },
      group: 3.1,
    };
    nodeIdNumber += 1;
    newNodes.push(skillNode);

    const skillLink: LinkInterface = {
      source: currentStepNode,
      target: skillNode,
    };
    newLinks.push(skillLink);

    const assessment = skill.assessment;
    const assessmentNode: NodeInterface = {
      id: 'Node ' + nodeIdNumber,
      label: assessment.name,
      details: {
        description: assessment.description,
        link: assessment.link,
      },
      group: 3.3,
    };
    nodeIdNumber += 1;
    newNodes.push(assessmentNode);

    const resources = skill.resources;
    resources.forEach((resource) => {
      const resourceNode: NodeInterface = {
        id: 'Node ' + nodeIdNumber,
        label: resource.name,
        details: {
          description: resource.description,
          link: resource.link,
        },
        group: 3.2,
      };
      nodeIdNumber += 1;
      newNodes.push(resourceNode);

      const resourceLink: LinkInterface = {
        source: skillNode,
        target: resourceNode,
      };
      newLinks.push(resourceLink);

      const assessmentLink: LinkInterface = {
        source: resourceNode,
        target: assessmentNode,
      };
      newLinks.push(assessmentLink);
    });

    const finalLink: LinkInterface = {
      source: assessmentNode,
      target: nextStepNode,
    };
    newLinks.push(finalLink);
  });

  // functon that insertsn newLinks
  updateUserNodes(user, setUser, newNodes);
  updateUserLinks(user, setUser, newLinks);
};

export const insertCareerNodes = (
  user: UserInterface,
  setUser: Dispatch<SetStateAction<UserInterface>>,
  careerData: CareerDetailsInterface[],
  previousNode: NodeInterface
) => {
  let careerNodes: NodeInterface[] = [];
  let careerLinks: LinkInterface[] = [];
  let nodeIdNumber = user.nodeNumber;

  careerData.forEach((career) => {
    const careerNode: NodeInterface = {
      id: 'Node ' + nodeIdNumber,
      label: career.name,
      details: {
        description: career.description,
        salary: career.salary,
        companies: career.companies,
        qualifications: career.qualifications,
      },
      group: 2,
    };
    careerNodes.push(careerNode);
    nodeIdNumber += 1;

    const careerLink: LinkInterface = {
      source: previousNode,
      target: careerNode,
    };
    careerLinks.push(careerLink);
  });

  // update context and firestore
  updateUserNodes(user, setUser, careerNodes);
  updateUserLinks(user, setUser, careerLinks);
};

