'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import JobTitleModal from './JobTitleModal';
import Details from '@/components/home/Details';
import { set } from 'firebase/database';

const Graph = ({ width = 600, height = 400}) => {
    const [showJobTitleModal, setShowJobTitleModal] = useState(false);
    const [showSidePanelModal, setShowSidePanelModal] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);


    // graph stuff
    const nodeColors = {
        1: '#69b3a2',
        2: '#2c2769',
        3: '#32CD32',
    }

    const showSummary = (node) => {
        console.log("hello")
        setShowSidePanelModal(true)
        setShowJobTitleModal(false);
    }

    const expandNode = (node) => {
        console.log("expand node");
        setShowJobTitleModal(false);
    }

    const svgRef = useRef();
    const [nodeList, setNodeList] = useState(
        [
            { id: 'Node 2', label: 'SELF', group: 1 },
            { id: 'Node 1', label: 'Software engineer', group: 2 },
            { id: 'Node 4', label: 'Fullstack developer', group: 2 },
            { id: 'Node 5', label: 'UI/UX Designer', group: 2 },
            { id: 'Node 3', label: 'Hackerman', group: 2 },
            { id: 'Node 6', label: 'Professor', group: 2 },
        ]
    );
    const [linksList, setLinksList] = useState(
        [
            { source: 'Node 1', target: 'Node 2' },
            { source: 'Node 3', target: 'Node 2' },
            { source: 'Node 4', target: 'Node 2' },
            { source: 'Node 5', target: 'Node 2' },
            { source: 'Node 6', target: 'Node 2' },
        ]
    );
    const [showSidePanel, setShowSidePanel] = useState(false);

    const handleNodeClick = (d) => {
        if (d.group === 1) {
            return;
        } else if (d.group === 2) {
            // job title
            setSelectedNode(d);
            setShowJobTitleModal(true);
            setShowSidePanelModal(false)
        } else if (d.group === 3) {
            // upskill
            // insert nodes
        } else if (d.group === 4) {
            // requirements
            // show side panel
        }
        // const newNode = {
        //     id: `Node ${nodeList.length + 1}`,
        //     label: `Node ${nodeList.length + 1} dsfasd fsdafs dfds afd fdsaf dfsa`,
        //     group: d.group + 1,
        //     x: d.x + (Math.random() - 0.5) * 100,
        //     y: d.y + (Math.random() - 0.5) * 100,
        // }
        // setNodeList([...nodeList, newNode])
        // localStorage.setItem('nodeList', JSON.stringify([...nodeList, newNode]))

        // const newLink = {
        //     source: newNode.id,
        //     target: d.id
        // }
        // const localStorageLinks = linksList.map(link => {
        //     return { source: link.source.id, target: link.target.id }
        // })
        // localStorageLinks.push(newLink);
        // const newList = [...linksList, newLink]
        // setLinksList(newList)
        // localStorage.setItem('linksList', JSON.stringify(localStorageLinks))
    }

    useEffect(() => {
        if (localStorage.getItem('nodeList')) {
            setNodeList(JSON.parse(localStorage.getItem('nodeList')))
        } else {
            localStorage.setItem('nodeList', JSON.stringify(nodeList))
        }

        if (localStorage.getItem('linksList')) {
            setLinksList(JSON.parse(localStorage.getItem('linksList')))
        } else {
            console.log(linksList);
            localStorage.setItem('linksList', JSON.stringify(linksList))
        }
    }, []);

    useEffect(() => {
        function wrap(text, width) {
            text.each(function () {
                var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1,
                    y = text.attr("y"),
                    dy = parseFloat(text.attr("dy")),
                    tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");

                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", `${lineNumber * lineHeight + 1}em`).text(word);
                    }
                }
            });
        }

        
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('background-color', '#0C1323')
            .call(d3.zoom().on("zoom", (event) => {
                container.attr("transform", event.transform);
            }));

        let container = svg.select("g");
        if (container.empty()) {
            container = svg.append("g");
        } else {
            container.selectAll("*").remove();
        }


        const nodes = nodeList;

        const links = linksList;

        const link = container.selectAll(".link")
            .data(links)
            .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", 1)
            .style("stroke", "#ffffff");

        const drag = d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);

        const node = container.selectAll(".node")
            .data(nodes)
            .enter().append("g")
            .call(drag)
            .on("click", (event, d) => {
                console.log("Node clicked:", d);
                event.stopPropagation()
                handleNodeClick(d)
            })
            .style("cursor", "pointer")
            .attr("class", "node");

        node.append("text")
            .text(d => d.label)
            .style("text-anchor", "middle")
            .style("fill", "#fff")
            .attr("dy", "0.5em")
            .attr("class", "node")
            .call(wrap, 220);

        node.each(function(d) {
            const bbox = this.getBBox();
            const padding = 4;
            d.width = Math.max(d.width, bbox.width + 2 * padding);
            d.height = bbox.height + 2 * padding;
        });

        node.selectAll("text").each(function(d) {
            const bbox = this.getBBox();
            const padding = 15;
            d.width = bbox.width + 2 * padding;
            d.height = bbox.height + 2 * padding;
        
            d3.select(this).attr("y", -d.height / 2 + padding + (bbox.height / 4));
        });

        node.insert("rect", "text")
            .style("fill", d => nodeColors[d.group]? nodeColors[d.group] : "#69b3a2")
            .style("stroke", "#fff")
            .style("stroke-width", 1)
            .attr("width", d => d.width)
            .attr("height", d => d.height)
            .attr("x", d => -d.width / 2)
            .attr("y", d => -d.height / 2)
            .attr("rx", 10)
            .attr("ry", 10);
        
        node.selectAll("rect")
            .attr("width", d => d.width)
            .attr("height", d => d.height)
            .attr("x", d => -d.width / 2)
            .attr("y", d => -d.height / 2);

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id).distance(200))
            .force("charge", d3.forceManyBody().strength(-1500))
            .force("center", d3.forceCenter(width / 2, height / 2));

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("transform", d => `translate(${d.x},${d.y})`);
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

    }, [width, height, nodeList, linksList]);

    return (
        <>
            <svg ref={svgRef} ></svg>
            {showJobTitleModal && <JobTitleModal title={selectedNode.label} width="300px" height="150px" 
            close={()=>{setShowJobTitleModal(false)}} 
            summary={()=>{ showSummary(selectedNode)}}
            expand={()=>{expandNode(selectedNode)}}
            />}
            {showSidePanelModal && ( <Details close={()=>setShowSidePanelModal(false)} />)}
        </>
    );
};

export default Graph;
