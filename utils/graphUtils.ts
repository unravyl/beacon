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
  const stepNodes: NodeInterface[] = [
    {
      id: 'Node ' + nodeIdNumber,
      label: 'Upskilling',
      details: { description: 'Preparation of skills for your career' },
      group: 3,
    },
    {
      id: 'Node ' + nodeIdNumber + 1,
      label: 'Legal Documents',
      details: {
        description:
          'Preparation of legal required documents for you to be able to work',
      },
      group: 3,
    },
    {
      id: 'Node ' + nodeIdNumber + 2,
      label: 'Resume and Cover Letter',
      details: {
        description:
          'Preparation of Resume and Cover Letter for you to submit with your job application',
      },
      group: 3,
    },
    {
      id: 'Node ' + nodeIdNumber + 3,
      label: 'Job Hunting',
      details: {
        description: 'Guide on the job hunting process',
      },
      group: 3,
    },
  ];

  // function to insert the new nodes
  // function to update the global latest node number
  updateUserNodes(user, setUser, stepNodes);

  let stepLinks: LinkInterface[] = [];

  stepNodes.forEach((stepNode: NodeInterface) => {
    let newLink = {} as LinkInterface;
    if (stepLinks.length) {
      newLink = {
        source: (parseInt(stepNode.id) - 1).toString(),
        target: stepNode.id,
      };
    } else {
      newLink = {
        source: careerNode.id,
        target: stepNode.id,
      };
    }
    stepLinks.push(newLink);
  });

  // function to insert the new links
  updateUserLinks(user, setUser, stepLinks);
};

export const insertUpskillingNodes = (
  startingNodeIdNumber: number,
  newUpskillingData: CareerUpskillingInterface,
  currentStepNode: NodeInterface,
  nextStepNode: NodeInterface
) => {
  // function to insert new nodes
  let nodeIdNumber = startingNodeIdNumber;
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
      source: currentStepNode.id,
      target: skillNode.id,
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
        source: skillNode.id,
        target: resourceNode.id,
      };
      newLinks.push(resourceLink);

      const assessmentLink: LinkInterface = {
        source: resourceNode.id,
        target: assessmentNode.id,
      };
      newLinks.push(assessmentLink);
    });

    const finalLink: LinkInterface = {
      source: assessmentNode.id,
      target: nextStepNode.id,
    };
    newLinks.push(finalLink);
  });

  // function that inserts newNodes
  // functon that inserts newLinks
  return {
    nodes: newNodes,
    links: newLinks,
  };
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
      source: previousNode.id,
      target: careerNode.id,
    };
    careerLinks.push(careerLink);
  });

  // update context and firestore
  updateUserNodes(user, setUser, careerNodes);
  updateUserLinks(user, setUser, careerLinks);
};
