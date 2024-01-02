import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import d3Cloud from 'd3-cloud';

const WordCloudChart = ({ topics }) => {

  useEffect(() => {

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    if (topics.length > 0) {

      const layout = d3Cloud()
        .size([1000, 500])
        .words(getWordCloudData(topics))
        .padding(10)
        .rotate(() => Math.random())
        .fontSize(d => Math.sqrt(d.size)*15)
        .on('end', draw);

      layout.start();

      function draw(words) {
        svg
          .append('g')
          .attr('transform', 'translate(512,263)')
          .selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .attr('font-size', d => d.size)
          .attr('transform', d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
          .style('fill', 'white')
          .text(d => d.text);
      }
    }
  }, [topics]);

  const getWordCloudData = topics => {
    const topicCounts = {};
    topics.forEach(topic => {
      topicCounts[topic] = (topicCounts[topic] || 0) + 1;
    });

    return Object.entries(topicCounts).map(([topic, count]) => ({
      text: topic,
      size: count * 0.01,
    }));
  };

  const svgRef = useRef();

  return (
    <svg ref={svgRef} width="1030px" height="550px" padding='10px'>
    </svg>
  );
};

export default WordCloudChart;
