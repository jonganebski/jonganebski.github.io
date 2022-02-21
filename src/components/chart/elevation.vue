<script setup lang="ts">
import * as d3 from 'd3';
import type { UsePointsQueryResult } from '~/api/usePointsQuery';
import colors from 'windicss/colors';

interface Props {
  hoverPoint: UsePointsQueryResult | null;
  fileName: string;
  points?: UsePointsQueryResult[];
}

interface Emits {
  (
    event: 'update:hoverPoint',
    payload: {
      lon: number;
      lat: number;
    } | null,
  ): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const containerRef = ref<HTMLDivElement | null>(null);

const { height: windowHeight } = useWindowSize();

const marginTop = 20;
const marginRight = 0;
const marginBottom = 30;
const marginLeft = 40;

const stopWatch = watchEffect(() => {
  if (!containerRef.value) return;
  if (!props.points) return;

  stopWatch();

  const width = containerRef.value?.getBoundingClientRect().width;
  const height = Math.round(windowHeight.value / 3.5);

  const xRange = [marginLeft, width - marginRight];
  const yRange = [height - marginBottom, marginTop];

  const X = d3.map(props.points, ({ distance }) => distance);
  const Y = d3.map(props.points, ({ ele }) => ele);
  const I = d3.range(X.length);
  const D = d3.map(props.points, (d, i) => !isNaN(X[i]) && !isNaN(Y[i]));

  const xDomain = d3.extent(X);
  const yDomain = d3.extent(Y);

  const [minX, maxX] = xDomain;
  if (minX === undefined || maxX === undefined) return;
  const [minY, maxY] = yDomain;
  if (minY === undefined || maxY === undefined) return;

  const paddedMinY = Math.max(0, minY - 100);

  const xScale = d3.scaleLinear(xDomain, xRange);
  const yScale = d3.scaleLinear([paddedMinY, maxY], yRange);
  const xAxis = d3
    .axisBottom(xScale)
    .ticks(width / 80)
    .tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(null);

  const area = d3
    .area<number>()
    .defined((_, i) => D[i])
    .curve(d3.curveLinear)
    .x((_, i) => xScale(X[i]))
    .y0(yScale(paddedMinY))
    .y1((_, i) => yScale(Y[i]));

  const svg = d3
    .create('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height])
    .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

  svg
    .append('g')
    .attr('transform', `translate(${marginLeft},0)`)
    .call(yAxis)
    .call((g) => g.select('.domain').remove())
    .call((g) =>
      g
        .selectAll('.tick line')
        .clone()
        .attr('x2', width - marginLeft - marginRight)
        .attr('stroke-opacity', 0.1),
    )
    .call((g) =>
      g
        .append('text')
        .attr('x', -marginLeft)
        .attr('y', 10)
        .attr('fill', 'currentColor')
        .attr('text-anchor', 'start')
        .text('Elevation'),
    );

  svg.append('path').attr('fill', colors.lime[900]).attr('d', area(I));

  svg
    .append('g')
    .attr('transform', `translate(0,${height - marginBottom})`)
    .call(xAxis)
    .call((g) =>
      g
        .append('text')
        .attr('x', width - marginRight - 20)
        .attr('y', 16)
        .attr('fill', 'currentColor')
        .attr('text-anchor', 'start')
        .text('Km'),
    );

  const lineY = svg
    .append('g')
    .append('line')
    .attr('y1', height - marginBottom)
    .attr('stroke', colors.red[900])
    .attr('opacity', 0);

  const snail = svg
    .append('g')
    .append('text')
    .attr('dy', 6)
    .attr('text-anchor', 'middle')
    .attr('font-size', 30)
    .attr('opacity', 0)
    .text('🐌');

  svg.on('mousemove', (event: MouseEvent) => {
    if (!props.points) return;
    const [xCoord, yCoord] = d3.pointer(event);
    const distance = xScale.invert(xCoord);
    const index = d3
      .bisector<UsePointsQueryResult, number>((d) => d.distance)
      .right(props.points, distance);
    const hoverPoint = props.points[index];
    emits('update:hoverPoint', hoverPoint);

    const isPointerOutsideAxis = height - marginBottom <= yCoord || xCoord <= marginLeft;
    if (isPointerOutsideAxis) return;

    lineY.attr('x1', xCoord).attr('x2', xCoord).attr('y2', 0).attr('opacity', 1);
    snail.attr('transform', `translate(${xCoord},${yScale(hoverPoint.ele)})`).attr('opacity', 1);
  });

  svg.on('mouseleave', () => {
    emits('update:hoverPoint', null);
    lineY.attr('opacity', 0);
    snail.attr('opacity', 0);
  });

  const chart = svg.node();
  if (!chart) return;

  containerRef.value.append(chart);
});
</script>

<template>
  <div ref="containerRef" class="w-full bg-white" />
</template>
