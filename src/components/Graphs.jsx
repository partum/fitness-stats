import { React, useRef, useEffect, useState } from 'react';
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
  Session_Duration: Number(row.Session_Duration) || 0,
  Fat_Percentage: Number(row.Fat_Percentage) || 0,
  BMI: Number(row.BMI) || 0,
}));

export default function Graphs({ selectedXAxis }) {

  let data = defaultData
  let marginTop = 10
  let marginRight = 30
  let marginBottom = 30
  let marginLeft = 60
  let width = 600 - marginLeft - marginRight
  let height = 400 - marginTop - marginBottom

  let [xMax, setXMax] = useState(d3.max(data, (d) => d.selectedXAxis));
  let [xMin, setXMin] = useState(d3.min(data, (d) => d.selectedXAxis));

  let maxCalories = d3.max(data, (d) => d.Calories_Burned);
  let minCalories = d3.min(data, (d) => d.Calories_Burned);
  let maxBPM = d3.max(data, (d) => d.Avg_BPM);
  let minBPM = d3.min(data, (d) => d.Avg_BPM);
  let maxWeight = d3.max(data, (d) => d.Weight);
  let minWeight = d3.min(data, (d) => d.Weight);
  let maxHeight = d3.max(data, (d) => d.Height);
  let minHeight = d3.min(data, (d) => d.Height);
  let maxMaxBPM = d3.max(data, (d) => d.Max_BPM);
  let minMaxBPM = d3.min(data, (d) => d.Max_BPM);
  let maxRestingBPM = d3.max(data, (d) => d.Resting_BPM);
  let minRestingBPM = d3.min(data, (d) => d.Resting_BPM);
  let maxSessionDuration = d3.max(data, (d) => d.Session_Duration);
  let minSessionDuration = d3.min(data, (d) => d.Session_Duration);
  let maxFatPercentage = d3.max(data, (d) => d.Fat_Percentage);
  let minFatPercentage = d3.min(data, (d) => d.Fat_Percentage);
  let maxBMI = d3.max(data, (d) => d.BMI);
  let minBMI = d3.min(data, (d) => d.BMI);

  console.log("Max and min", xMax, xMin);



  const GraphTest = () => {
    const ref = useRef()

    useEffect(() => {
      const svgElement = d3.select(ref.current)
      // Add x-axis
      const x = d3.scaleLinear()
        .domain([xMin, xMax])
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
      //svgElement.append('g')
      svgElement
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x(d[selectedXAxis]); })
        .attr("cy", function (d) { return y(d.Calories_Burned); })
        .attr("r", 1.5)
        .style("fill", "#69b3a2")
        .attr("transform", `translate(${marginRight}, -${marginRight})`);
    }, [xMax])

    return (
      <svg style={{ border: "1px solid white" }} width={width} height={height}
        ref={ref}
      />
    )
  }

  useEffect(() => {
    setXMax(d3.max(data, (d) => d[selectedXAxis]));
    setXMin(d3.min(data, (d) => d[selectedXAxis]));
  }, [selectedXAxis]);

  return (
    <span>
      <h3>Title</h3>
      {GraphTest()}
      <h2>Test</h2>
    </span>
  );
}