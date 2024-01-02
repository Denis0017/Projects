import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    if (data.length > 0) {
      const addedCounts = {};
      const publishedCounts = {};
      const parseTime = d3.timeParse('%B, %d %Y %H:%M:%S');
      const formatTime = d3.timeFormat('%B %Y');

      data.forEach(item => {
        const parsedDate = parseTime(item.added);
        const formattedDate = formatTime(parsedDate);

        addedCounts[formattedDate] = (addedCounts[formattedDate] || 0) + 1;

        if (item.published) {
          const parsedPublishedDate = parseTime(item.published);
          const formattedPublishedDate = formatTime(parsedPublishedDate);
          publishedCounts[formattedPublishedDate] = (publishedCounts[formattedPublishedDate] || 0) + 1;
        }
      });

      const combinedData = Object.entries(addedCounts).map(([date, addedCount]) => ({
        date,
        addedCount,
        publishedCount: publishedCounts[date] || 0,
      }));

      const margin = { top: 50, right: 50, bottom: 50, left: 50 };
      const width = 1000 - margin.left - margin.right;
      const height = 600 - margin.top - margin.bottom;

      const x = d3
        .scaleBand()
        .range([0, width])
        .padding(0.1)
        .domain(combinedData.map(d => d.date));

      const y = d3.scaleLinear().range([height, 0]).domain([0, d3.max(combinedData, d => Math.max(d.addedCount, d.publishedCount))]);

      const svgChart = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const addedLine = d3
        .line()
        .x(d => x(d.date) + x.bandwidth() / 2)
        .y(d => y(d.addedCount));

      const publishedLine = d3
        .line()
        .x(d => x(d.date) + x.bandwidth() / 2)
        .y(d => y(d.publishedCount));

      svgChart
        .append('path')
        .datum(combinedData)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('d', addedLine);

      svgChart
        .append('path')
        .datum(combinedData)
        .attr('fill', 'none')
        .attr('stroke', 'orange')
        .attr('stroke-width', 2)
        .attr('d', publishedLine);

      svgChart
        .append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      svgChart.append('g').call(d3.axisLeft(y));
    }
  }, [data]);

  return (
    <div style={{ width: '1000px', height: '600px'}}>
      <svg ref={svgRef} width="1000" height="1000" style={{ overflow: 'visible' }}>
      </svg>
    </div>
  );
};

export default LineChart;
