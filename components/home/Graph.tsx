'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

import JobTitleModal from './JobTitleModal';
import JobDescriptionSidePanel from '@/components/home/JobDescriptionSidePanel';
import SimpleSidePanel from '@/components/home/SimpleSidePanel';

import { useUserContext } from '@/context/UserContext';
import Spinner from '@/components/generics/Spinner';
import { LinkInterface, NodeInterface } from '@/interface/graphInterface';
import { insertStepNodes, insertUpskillingNodes } from '@/utils/graphUtils';
import axios from 'axios';
import { deleteLink } from '@/db/store';

const Graph = ({ width = 600, height = 400 }) => {
  const { user, setUser } = useUserContext();
  const [showJobTitleModal, setShowJobTitleModal] = useState(false);
  const [showSidePanelModal, setShowSidePanelModal] = useState(false);
  const [showSimpleSidePanel, setShowSimpleSidePanel] = useState(false);
  const [selectedNode, setSelectedNode] = useState({} as NodeInterface);
  const [isLoading, setIsLoading] = useState(false);

  // graph stuff
  const nodeColors = {
    1: '#69b3a2',
    2: '#274069',
    3: '#32CD32',
    3.1: '#5C8374',
    3.2: '#2D9596',
    3.3: '#176B87',
    4: '#32CD32',
    5: '#32CD32',
    6: '#32CD32',
  };
  const nodeTextColors = {
    1: '#fff',
    2: '#fff',
    3: '#274069',
    3.1: '#fff',
    3.2: '#fff',
    3.3: '#fff',
    4: '#274069',
    5: '#274069',
    6: '#274069',
  };

  const showSummary = (node: NodeInterface) => {
    setShowSidePanelModal(true);
    setShowJobTitleModal(false);
  };

  const expandCareerNode = async (node: NodeInterface) => {
    setIsLoading(true);
    setShowJobTitleModal(false);
    insertStepNodes(user, setUser, node);
    setIsLoading(false);
  };

  const expandUpskillingNode = async (node) => {
    setIsLoading(true);
    const userLinks = user.links;
    const userNodes = user.nodes;
    if (!userLinks?.length || !userNodes?.length) {
      console.error(
        'ERROR: Either node or link lists are empty when trying to expand upskilling node'
      );
      return;
    }
    const upskillingLink = userLinks.find((userLink) => {
      return node.id == userLink.target.id;
    });
    if (!upskillingLink) {
      console.error(
        'ERROR: No upskilling links are found when trying to expand upskilling node'
      );
      return;
    }
    const careerNode = userNodes.find((userNode) => {
      return upskillingLink?.source.id == userNode.id;
    });
    if (!careerNode) {
      console.error(
        'ERROR: No career nodes are found when trying to expand upskilling node'
      );
      return;
    }
    const { data } = await axios.post(
      'http://127.0.0.1:8000/api/generate-upskilling/',
      { career: careerNode.label }
    );
    console.log('LOG: Axios Data', careerNode.label, data);
    const nextStepLink = userLinks.find((userLink) => {
      return node.id == userLink.source.id;
    });
    if (!nextStepLink) {
      console.error(
        'ERROR: No legal document links are found when trying to expand upskilling node'
      );
      return;
    }
    const nextStepNode = userNodes.find((userNode) => {
      return nextStepLink?.target.id == userNode.id;
    });
    if (!nextStepNode) {
      console.error(
        'ERROR: No legal document nodes are found when trying to expand upskilling node'
      );
      return;
    }
    await deleteLink(user, setUser, nextStepLink);
    insertUpskillingNodes(user, setUser, data, node, nextStepNode);
    setIsLoading(false);
  };

  const svgRef = useRef();
  const [nodeList, setNodeList] = useState(user.nodes);
  const [linksList, setLinksList] = useState(user.links);

  const handleNodeClick = (node) => {
    if (node.group === 1) {
      // root node
      return;
    } else if (node.group === 2) {
      // career node
      setSelectedNode(node);
      setShowJobTitleModal(true);
      setShowSidePanelModal(false);
      setShowSimpleSidePanel(false);
    } else if (node.group === 3) {
      const currentLinks = user.links;
      const currentNodes = user.nodes;
      const upskillingLink = currentLinks?.find((currentLink) => {
        return node.id == currentLink.source.id;
      });
      if (!upskillingLink) {
        console.error('Error: No links after upskilling node found');
        return;
      }
      const nextStepNode = currentNodes?.find((currentNode) => {
        return upskillingLink.target.id == currentNode.id;
      });
      if (!nextStepNode) {
        console.error('Error: No nodes after upskilling link found');
        return;
      }
      if (nextStepNode.group != 4 && nextStepNode.group == 3.1) {
        console.log('LOG: Cannot expand upskilling node anymore');
        return;
      }

      // upskilling node
      setSelectedNode(node);
      expandUpskillingNode(node);
      setShowSimpleSidePanel(false);
      setShowSidePanelModal(false);
      setShowJobTitleModal(false);
    } else if (node.group === 4) {
      return;
    } else if (node.group === 5) {
      return;
    } else if (node.group === 6) {
      return;
    } else {
      setSelectedNode(node);
      setShowSidePanelModal(false);
      setShowSimpleSidePanel(true);
    }
    `
    1 - Root Node
    2 - Career Nodes
    3 - Upskilling Node
    3.1 - Skill Nodes 
    3.2 - Skill Resource Nodes 
    3.3 - Skill Assessment Nodes 
    4 - Legal Docs Node 
    5 - Resume and Cover Letter Node 
    6 - Job Hunting Node
    `;
  };

  useEffect(() => {
    setNodeList(user.nodes);
    setLinksList(user.links);
  }, [user]);

  useEffect(() => {
    if (linksList?.length && nodeList.length > 1) {
      function wrap(text, width) {
        text.each(function () {
          var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1,
            y = text.attr('y'),
            dy = parseFloat(text.attr('dy')),
            tspan = text
              .text(null)
              .append('tspan')
              .attr('x', 0)
              .attr('y', y)
              .attr('dy', dy + 'em');

          while ((word = words.pop())) {
            line.push(word);
            tspan.text(line.join(' '));
            if (tspan.node().getComputedTextLength() > width) {
              line.pop();
              tspan.text(line.join(' '));
              line = [word];
              tspan = text
                .append('tspan')
                .attr('x', 0)
                .attr('y', y)
                .attr('dy', `${lineNumber * lineHeight + 1}em`)
                .text(word);
            }
          }
        });
      }

      const svg = d3
        .select(svgRef.current)
        .attr('width', width)
        .attr('height', height)
        .style('background-color', '#0C1323')
        .call(
          d3.zoom().on('zoom', (event) => {
            container.attr('transform', event.transform);
          })
        );

      let container = svg.select('g');
      if (container.empty()) {
        container = svg.append('g');
      } else {
        container.selectAll('*').remove();
      }

      const nodes: NodeInterface[] = nodeList;

      const links: LinkInterface[] = linksList;

      const link = container
        .selectAll('.link')
        .data(links)
        .enter()
        .append('line')
        .attr('class', 'link')
        .style('stroke-width', 1)
        .style('stroke', '#ffffff');

      const drag = d3
        .drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);

      const node = container
        .selectAll('.node')
        .data(nodes)
        .enter()
        .append('g')
        .call(drag)
        .on('click', (event, d) => {
          console.log('Node clicked:', d);
          event.stopPropagation();
          handleNodeClick(d);
        })
        .style('cursor', 'pointer')
        .attr('class', 'node');

      node
        .append('text')
        .text((d) => d.label)

        .style('text-anchor', 'middle')
        .style('fill', (d) =>
          nodeTextColors[d.group] ? nodeTextColors[d.group] : '#000'
        )
        .attr('dy', '0.5em')
        .attr('class', 'node')
        .call(wrap, 220);

      node.each(function (d) {
        const bbox = this.getBBox();
        const padding = 4;
        d.width = Math.max(d.width, bbox.width + 2 * padding);
        d.height = bbox.height + 2 * padding;
      });

      node.selectAll('text').each(function (d) {
        const bbox = this.getBBox();
        const padding = 15;
        d.width = bbox.width + 2 * padding;
        d.height = bbox.height + 2 * padding;

        d3.select(this).attr('y', -d.height / 2 + padding + bbox.height / 4);
      });

      node
        .insert('rect', 'text')
        .style('fill', (d) =>
          nodeColors[d.group] ? nodeColors[d.group] : '#69b3a2'
        )
        .style('stroke', '#fff')
        .style('stroke-width', 1)
        .attr('width', (d) => d.width)
        .attr('height', (d) => d.height)
        .attr('x', (d) => -d.width / 2)
        .attr('y', (d) => -d.height / 2)
        .attr('rx', 10)
        .attr('ry', 10);

      node
        .selectAll('rect')
        .attr('width', (d) => d.width)
        .attr('height', (d) => d.height)
        .attr('x', (d) => -d.width / 2)
        .attr('y', (d) => -d.height / 2);

      const simulation = d3
        .forceSimulation(nodes)
        .force(
          'link',
          d3
            .forceLink(links)
            .id((d) => d.id)
            .distance(200)
        )
        .force('charge', d3.forceManyBody().strength(-1500))
        .force('center', d3.forceCenter(width / 2, height / 2));

      simulation.on('tick', () => {
        link
          .attr('x1', (d) => d.source.x)
          .attr('y1', (d) => d.source.y)
          .attr('x2', (d) => d.target.x)
          .attr('y2', (d) => d.target.y);

        node.attr('transform', (d) => `translate(${d.x},${d.y})`);
      });

      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
    }
  }, [width, height, nodeList, linksList]);

  return (
    <>
      {isLoading && <Spinner />}
      <svg ref={svgRef}></svg>
      {showJobTitleModal && (
        <JobTitleModal
          title={selectedNode.label}
          width="300px"
          height="150px"
          close={() => {
            setShowJobTitleModal(false);
          }}
          summary={() => {
            showSummary(selectedNode);
          }}
          expand={() => {
            expandCareerNode(selectedNode);
          }}
        />
      )}
      {showSimpleSidePanel && (
        <SimpleSidePanel
          details={{
            title: selectedNode.label,
            description: selectedNode.details.description,
          }}
          close={() => setShowSimpleSidePanel(false)}
        />
      )}
      {showSidePanelModal && (
        <JobDescriptionSidePanel
          details={{ ...selectedNode.details, title: selectedNode.label }}
          close={() => setShowSidePanelModal(false)}
        />
      )}
    </>
  );
};

export default Graph;

