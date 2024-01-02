import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BoxPlot = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    if (data.length > 0) {
      const sectors = [...new Set(data.map(item => item.sector))];

      const x = d3.scaleBand()
        .domain(sectors)
        .range([0, 1500])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.likelihood)])
        .range([400, 0]);

      const svgChart = svg
        .append('g')
        .attr('transform', 'translate(40,40)'); 

      sectors.forEach(sector => {
        const sectorData = data.filter(item => item.sector === sector);

        const values = sectorData.map(d => d.likelihood);
        const min = d3.min(values);
        const max = d3.max(values);
        const q1 = d3.quantile(values, 0.25);
        const q2 = d3.quantile(values, 0.50);
        const q3 = d3.quantile(values, 0.75);
        const iqr = q3 - q1;
        const r0 = Math.max(min, q1 - iqr * 1.5);
        const r1 = Math.min(max, q3 + iqr * 1.5);
        const outliers = sectorData.filter(v => v.likelihood < r0 || v.likelihood > r1);

        svgChart.append('rect')
          .attr('x', x(sector))
          .attr('y', y(q3))
          .attr('width', x.bandwidth())
          .attr('height', y(q1) - y(q3))
          .attr('stroke', 'currentColor')
          .attr('stroke-width', 2)
          .attr('fill', '#bb86fc');

        svgChart.append('line')
          .attr('x1', x(sector) + x.bandwidth() / 2)
          .attr('y1', y(min))
          .attr('x2', x(sector) + x.bandwidth() / 2)
          .attr('y2', y(q1))
          .attr('stroke', 'currentColor')
          .attr('stroke-width', 2);

        svgChart.append('line')
          .attr('x1', x(sector) + x.bandwidth() / 2)
          .attr('y1', y(q1))
          .attr('x2', x(sector) + x.bandwidth() / 2)
          .attr('y2', y(q2))
          .attr('stroke', 'currentColor')
          .attr('stroke-width', 2);

        svgChart.append('line')
          .attr('x1', x(sector) + x.bandwidth() / 2)
          .attr('y1', y(q2))
          .attr('x2', x(sector) + x.bandwidth() / 2)
          .attr('y2', y(q3))
          .attr('stroke', 'currentColor')
          .attr('stroke-width', 2);


        svgChart.selectAll('circle.outlier')
          .data(outliers)
          .enter()
          .append('circle')
          .attr('class', 'outlier')
          .attr('cx', x(sector) + x.bandwidth() / 2)
          .attr('cy', d => y(d.likelihood))
          .attr('r', 4)
          .attr('fill', 'currentColor')
          .attr('fill-opacity', 0.2);
      });

      svgChart
        .append('g')
        .attr('transform', `translate(0,${400})`)
        .call(d3.axisBottom(x));

      svgChart
        .append('g')
        .call(d3.axisLeft(y));
    }
  }, [data]);

  return (
    <div style={{ width: '1000px', height: '500px'}}>
      <svg ref={svgRef} width="1000" height="500" style={{ overflow: 'visible' }}>

      </svg>
    </div>
  );
};

export default BoxPlot;
