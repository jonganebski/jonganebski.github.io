<script setup lang="ts">
import * as d3 from 'd3';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();
const containerRef = ref<HTMLDivElement | null>(null);
const margin = { top: 0, right: 0, bottom: 0, left: 0 };

function generateData() {
  const data: [number, number][] = [];
  for (let i = 0; i < 300; i++) {
    data.push([Math.random(), Math.random()]);
  }
  return data;
}

onMounted(() => {
  const data = generateData();

  const svg = d3
    .create('svg')
    .attr('viewBox', [0, 0, width.value, height.value])
    .style('width', width.value)
    .style('height', height.value);

  const x = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d[0]) as [number, number])
    .nice()
    .rangeRound([margin.left, width.value - margin.right]);

  const y = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d[1]) as [number, number])
    .nice()
    .rangeRound([height.value - margin.bottom, margin.top]);

  const contours = d3
    .contourDensity()
    .x((d) => x(d[0]))
    .y((d) => y(d[1]))
    .size([width.value, height.value])
    .bandwidth(100)
    .thresholds(40)(data);

  const g = svg
    .append('g')
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-linejoin', 'round');

  g.selectAll('path')
    .data(contours)
    .join('path')
    .sort((a, b) => b.value - a.value)
    .attr('stroke-width', (d, i) => (i % 5 ? 0.25 : 1))
    .attr('d', d3.geoPath())
    .attr('stroke-dasharray', (d, i, paths) => {
      return Math.round((paths[i] as SVGPathElement).getTotalLength());
    })
    .attr('stroke-dashoffset', (d, i, paths) => {
      return Math.round((paths[i] as SVGPathElement).getTotalLength());
    })
    .transition()
    .duration((d, i, paths) => {
      const totalLength = (paths[i] as SVGPathElement).getTotalLength();
      return Math.round(totalLength * 5);
    })
    .delay((d, i, paths) => {
      let sumOfDuration = 0;
      for (let j = 0; j < i + 1; j++) {
        sumOfDuration += (paths[j] as SVGPathElement).getTotalLength();
      }
      return Math.round(sumOfDuration / 2);
    })
    .ease(d3.easeLinear)
    .attr('stroke-dashoffset', () => {
      return 0;
    });

  const svgElement = svg.node();
  if (!svgElement) return;

  containerRef.value?.append(svgElement);
});
</script>

<template>
  <div ref="containerRef" class="fixed top-0 left-0 -z-1 w-full h-screen overflow-hidden" />
</template>
