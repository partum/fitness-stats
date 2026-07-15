import { React, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import csvText from '../assets/gym_members_exercise_tracking_synthetic_data.csv?raw';

const parsedData = d3.csvParse(csvText, (row) => ({
  ...row,
  Calories_Burned: Number(row.Calories_Burned) || 0,
}));

const defaultData = parsedData.map((row) => row.Calories_Burned);

export default function Graphs({
  data = defaultData,
  marginTop = 10,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 60,
  width = 460 - marginLeft - marginRight,
  height = 400 - marginTop - marginBottom,
}) {
  const values = Array.isArray(data) ? data : [];
  //const x = d3.scaleLinear([0, values.length - 1], [marginLeft, width - marginRight]);
  const x = d3.scaleLinear()
    .domain([0, values.length - 1])
    .range([marginLeft, width - marginRight]);

  const y = d3.scaleLinear([0, Math.max(...values, 0)], [height - marginBottom, marginTop]);
  const line = d3.line((_, i) => x(i), (d) => y(d));

  data = parsedData.map((row) => ({
    Avg_BPM: Number(row.Avg_BPM) || 0,
    Calories_Burned: Number(row.Calories_Burned) || 0,
  }));

  let maxCalories = d3.max(data, (d) => d.Calories_Burned);
  let minCalories = d3.min(data, (d) => d.Calories_Burned);
  let maxBPM = d3.max(data, (d) => d.Avg_BPM);
  let minBPM = d3.min(data, (d) => d.Avg_BPM);

  const GraphTest = () => {
    const ref = useRef()

    useEffect(() => {
      const svgElement = d3.select(ref.current)
      // Add x-axis
      const x = d3.scaleLinear()
        .domain([minBPM, maxBPM])
        .range([0, width - marginRight]);
      svgElement.append("g")
        .attr("transform", `translate(${marginRight}, ${height - marginBottom})`)
        .call(d3.axisBottom(x));
      // Add y-axis
      const y = d3.scaleLinear()
        .domain([minCalories, maxCalories])
        .range([height, 0]);
      svgElement.append("g")
        .attr("transform", `translate(${marginRight}, -${marginRight})`)
        .call(d3.axisLeft(y));
      // Add dots
      svgElement.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x(d.Avg_BPM); })
        .attr("cy", function (d) { return y(d.Calories_Burned); })
        .attr("r", 1.5)
        .style("fill", "#69b3a2")
    }, [])

    return (
      <svg style={{ border: "1px solid pink" }} width={width} height={height}
        ref={ref}
      />
    )
  }

  return (
    <span>
      <p>Calories Burned Over Time</p>
      <svg width={width} height={height}>
        <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(values)} />
        <g fill="white" stroke="currentColor" strokeWidth="1.5">
          {values.map((d, i) => (
            <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
          ))}
        </g>
        <g transform='translate(0, ${height})'></g>
      </svg>
      {GraphTest()}
      <h2>Test</h2>
    </span>
  );
}