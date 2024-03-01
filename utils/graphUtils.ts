import { LinkInterface, NodeInterface } from '@/interface/graphInterface';

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

  //function to insert the new links
};

const insertUpskillingNodes = (
  startingNodeIdNumber: number,
  newNodeData: NodeInterface[]
) => {
  // function to insert new nodes
  newNodeData.forEach((newNode) => {});
};


