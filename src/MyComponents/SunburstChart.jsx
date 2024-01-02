import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SunburstChart = ({ data }) => {

  const svgRef = useRef();

  useEffect(() => {

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    if (data && data.length > 0) {

      const regionCounts = {};
      data.forEach(item => {
        const region = item.region || 'Undefined Region';
        const country = item.country || 'Undefined Country';
        if (!regionCounts[region]) {
          regionCounts[region] = {};
        }
        regionCounts[region][country] = (regionCounts[region][country] || 0) + 1;
      });

      const hierarchicalData = {
        name: 'root',
        children: Object.entries(regionCounts).map(([region, countries]) => ({
          name: region,
          children: Object.entries(countries).map(([country, count]) => ({
            name: country,
            value: count,
          })),
        })),
      };

      const width = 1024;
      const height = 600;
      const radius = Math.min(width, height) / 2;
      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const partition = data => d3.partition().size([2 * Math.PI, radius])(
        d3.hierarchy(data).sum(d => d.value)
      );
      const arc = d3.arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(radius / 2)
        .innerRadius(d => d.y0)
        .outerRadius(d => d.y1 - 1);

      const root = partition(hierarchicalData);

      const g = svg.append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

      g.selectAll('path')
        .data(root.descendants().filter(d => d.depth))
        .enter()
        .append('path')
        .attr('fill', d => color(d.data.name))
        .attr('d', arc)
        .append('title')
        .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${d.value}`);

      g.selectAll('text')
        .data(root.descendants().filter(d => d.depth && (d.y0 + d.y1) / 2 * (d.x1 - d.x0) > 10))
        .enter()
        .append('text')
        .attr('transform', function (d) {
          const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
          const y = (d.y0 + d.y1) / 2;
          return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
        })
        .attr('dy', '0.35em')
        .text(d => {
          const name = d.data.name.length > 12 ? d.data.name.slice(0, 10) + '...' : d.data.name;
          return name;
        })
        .style('font-size', '15px')
        .style('fill', 'white')
        .style('text-anchor', 'middle');
    }
  }, [data]);

  return (
    <div>
      <div style={{ width: '1000', height: '600' }}>
        <svg ref={svgRef} width="1000" height="600" style={{ overflow: 'visible' }}>
        </svg>
      </div>
    </div>
  );
};

export default SunburstChart;
