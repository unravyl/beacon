import { CareerDataInterface } from '@/interface/careerInterface';
import { LinkInterface, NodeInterface } from '@/interface/graphInterface';
import { link } from 'fs';

const insertStepNodes = (
  careerNode: NodeInterface,
  startingNodeIdNumber: number
) => {
  let nodeIdNumber = startingNodeIdNumber;
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
  nodeIdNumber += 4;
  // function to update the global latest node number

  let stepLinks = [];

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
};

const insertUpskillingNodes = (
  startingNodeIdNumber: number,
  newUpskillingData: CareerDataInterface,
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
};
