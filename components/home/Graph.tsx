'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

import JobTitleModal from './JobTitleModal';
import Details from '@/components/home/Details';
import SimpleSidePanel from '@/components/home/SimpleSidePanel';

import { useUserContext } from '@/context/UserContext';
import axios from 'axios';
import Spinner from '@/components/generics/Spinner';
import { updateUserLinks, updateUserNodes } from '@/db/store';
import { LinkInterface, NodeInterface } from '@/interface/graphInterface';
import { insertStepNodes } from '@/utils/graphUtils';

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
  };
  const nodeTextColors = {
    1: '#fff',
    2: '#fff',
    3: '#274069',
  };

  const showSummary = (node: NodeInterface) => {
    setShowSidePanelModal(true);
    setShowJobTitleModal(false);
  };

  const expandCareerNode = async (node: NodeInterface) => {
    setIsLoading(true);
    setShowJobTitleModal(false);
    insertStepNodes(user, setUser, node);
    // const response = await axios.post(
    //   'http://127.0.0.1:8000/api/generate-upskilling/',
    //   { career: node.label }
    // );
    // const upskillingNodes = [
    //   ...response.data.response,
    //   {
    //     id: 'Node 15',
    //     label: 'Legal Documents',
    //     details: { description: 'Legal Stuff' },
    //     group: 3,
    //   },
    //   {
    //     id: 'Node 16',
    //     label: 'Resume & Cover Letter',
    //     details: { description: 'Paper Stuff' },
    //     group: 3,
    //   },
    //   {
    //     id: 'Node 17',
    //     label: 'Job Application',
    //     details: { description: 'Where/How to apply' },
    //     group: 3,
    //   },
    // ];
    // updateUserNodes(user, setUser, upskillingNodes);
    // const upskillingLinks = [
    //   { source: node.id, target: upskillingNodes[0].id },
    //   { source: node.id, target: upskillingNodes[1].id },
    //   { source: upskillingNodes[0].id, target: upskillingNodes[2].id },
    //   { source: upskillingNodes[0].id, target: upskillingNodes[3].id },
    //   { source: upskillingNodes[1].id, target: upskillingNodes[4].id },
    //   { source: upskillingNodes[1].id, target: upskillingNodes[5].id },
    //   { source: upskillingNodes[2].id, target: upskillingNodes[6].id },
    //   { source: upskillingNodes[3].id, target: upskillingNodes[6].id },
    //   { source: upskillingNodes[4].id, target: upskillingNodes[7].id },
    //   { source: upskillingNodes[5].id, target: upskillingNodes[7].id },
    //   { source: upskillingNodes[2].id, target: upskillingNodes[6].id },
    //   { source: upskillingNodes[6].id, target: upskillingNodes[8].id },
    //   { source: upskillingNodes[7].id, target: upskillingNodes[8].id },
    //   { source: upskillingNodes[8].id, target: upskillingNodes[9].id },
    //   { source: upskillingNodes[9].id, target: upskillingNodes[10].id },
    // ];
    // updateUserLinks(user, setUser, upskillingLinks);
    setIsLoading(false);
  };

  const svgRef = useRef();
  const [nodeList, setNodeList] = useState(user.nodes);
  const [linksList, setLinksList] = useState(user.links);

  const handleNodeClick = (d) => {
    if (d.group === 1) {
      return;
    } else if (d.group === 2) {
      // job title
      setSelectedNode(d);
      setShowJobTitleModal(true);
      setShowSidePanelModal(false);
      setShowSimpleSidePanel(false);
    } else if (d.group === 3) {
      setSelectedNode(d);
      setShowSimpleSidePanel(true);
      setShowSidePanelModal(false);
      setShowJobTitleModal(false);
    } else if (d.group === 4) {
      // requirements
      // show side panel
    }
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
        <Details
          details={{ ...selectedNode.details, title: selectedNode.label }}
          close={() => setShowSidePanelModal(false)}
        />
      )}
    </>
  );
};

export default Graph;
