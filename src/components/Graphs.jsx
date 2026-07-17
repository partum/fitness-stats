import { React, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import csvText from '../assets/gym_members_exercise_tracking_synthetic_data.csv?raw';

const parsedData = d3.csvParse(csvText, (row) => ({
  ...row,
  Calories_Burned: Number(row.Calories_Burned) || 0,
}));

const defaultData = parsedData.map((row) => ({
  Calories_Burned: Number(row.Calories_Burned) || 0,
  Weight: Number(row.Weight) || 0,
  Height: Number(row.Height) || 0,
  Max_BPM: Number(row.Max_BPM) || 0,
  Avg_BPM: Number(row.Avg_BPM) || 0,
  Resting_BPM: Number(row.Resting_BPM) || 0,
  Calories_Burned: Number(row.Calories_Burned) || 0,
  Session_Duration: Number(row.Session_Duration) || 0,
  Fat_Percentage: Number(row.Fat_Percentage) || 0,
  BMI: Number(row.BMI) || 0,
}));

export default function Graphs({
  data = defaultData,
  marginTop = 10,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 60,
  width = 600 - marginLeft - marginRight,
  height = 400 - marginTop - marginBottom,
}) {

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
        .attr("transform", `translate(${marginRight}, -${marginRight})`);
    }, [])

    return (
      <svg style={{ border: "1px solid pink" }} width={width} height={height}
        ref={ref}
      />
    )
  }

  return (
    <span>
      <h3>Title</h3>
      {GraphTest()}
      <h2>Test</h2>
    </span>
  );
}