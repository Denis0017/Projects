import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {

  const svgRef = useRef();

  useEffect(() => {

    // Clear the old chart before rendering the new one
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Remove all child elements

    // Check if data array is not empty before proceeding
    if (data.length > 0) {

      // Group data by unique intensity values and count occurrences
      const intensityCounts = {};
      data.forEach(item => {
        const intensity = item.intensity;
        intensityCounts[intensity] = (intensityCounts[intensity] || 0) + 1;
      });

      // Create data for bar chart
      const barData = Object.entries(intensityCounts).map(([intensity, count]) => ({
        intensity,
        count,
      }));

      // Set up bar chart parameters
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 1000 - margin.left - margin.right;
      const height = 600 - margin.top - margin.bottom;

      const x = d3
        .scaleBand()
        .range([0, width])
        .padding(0.1)
        .domain(barData.map(d => d.intensity));

      const y = d3.scaleLinear().range([height, 0]).domain([0, d3.max(barData, d => d.count)]);

      // Create bar chart
      const svgChart = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      svgChart
        .selectAll('rect')
        .data(barData)
        .enter()
        .append('rect')
        .attr('x', d => x(d.intensity))
        .attr('width', x.bandwidth())
        .attr('y', d => y(d.count))
        .attr('height', d => height - y(d.count))
        .attr('fill', 'steelblue');

      // Add x and y axis
      svgChart
        .append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      svgChart.append('g').call(d3.axisLeft(y));
    }
  }, [data]);

  return (
    <div style={{ width: '1000px', height: '600px'}}>
      <svg ref={svgRef} width="100%" height="100%" style={{ overflow: 'visible' }}>
        {/* Bar chart SVG */}
      </svg>
    </div>
  );
};

export default BarChart;
