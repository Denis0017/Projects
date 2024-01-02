import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Bubblechart = ({ data }) => {
  const sanitizedData = data.map(item => ({
    ...item,
    country: item.country.trim() === '' ? 'Unknown' : item.country,
  }));

  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const countryCounts = {};
    sanitizedData.forEach(item => {
      const country = item.country;
      countryCounts[country] = (countryCounts[country] || 0) + 1;
    });

    const bubbles = Object.entries(countryCounts).map(([country, count]) => ({
      country,
      count,
    }));

    const radiusScale = d3
      .scaleLinear()
      .domain([0, d3.max(bubbles, d => d.count)])
      .range([25, 210]);

    const simulation = d3
      .forceSimulation(bubbles)
      .force('charge', d3.forceManyBody().strength(5))
      .force('center', d3.forceCenter(400, 400))
      .force(
        'collision',
        d3.forceCollide().radius(d => radiusScale(d.count)).strength(0.2).iterations(5)
      );

    svg
      .selectAll('circle')
      .data(bubbles)
      .enter()
      .append('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => radiusScale(d.count))
      .style('fill', '#bb86fc');

    svg
      .selectAll('text')
      .data(bubbles)
      .enter()
      .append('text')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .style('font-size', '15px')
      .style('fill', 'white')
      .text(d => d.country);

    simulation.on('tick', () => {
      svg
        .selectAll('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

      svg
        .selectAll('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y);
    });
  }, [sanitizedData]);

  return (
    <svg ref={svgRef} width="800" height="800">
    </svg>
  );
};

export default Bubblechart;
