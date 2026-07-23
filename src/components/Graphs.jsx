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

export default function Graphs({ selectedXAxis, selectedYAxis }) {

  let data = defaultData
  let marginTop = 10
  let marginRight = 30
  let marginBottom = 30
  let marginLeft = 60
  let width = 600 - marginLeft - marginRight
  //let height = 400 - marginTop - marginBottom
  let height = 400

  let [xMax, setXMax] = useState(d3.max(data, (d) => d.selectedXAxis));
  let [xMin, setXMin] = useState(d3.min(data, (d) => d.selectedXAxis));
  let [yMax, setYMax] = useState(d3.max(data, (d) => d[selectedYAxis]));
  let [yMin, setYMin] = useState(d3.min(data, (d) => d[selectedYAxis]));
  let [xAxisLabel, setXAxisLabel] = useState(selectedXAxis.replace(/_/g, " "));
  let [yAxisLabel, setYAxisLabel] = useState(selectedYAxis.replace(/_/g, " "));


  const GraphTest = () => {
    const ref = useRef()

    useEffect(() => {
      const svgElement = d3.select(ref.current)
      svgElement.selectAll("*").remove(); // This line is from AI, I'm not sure if manipulating the DOM directly is ok in React
      // Add x-axis
      const x = d3.scaleLinear()
        .domain([xMin, xMax])
        .range([0, width - marginRight]);
      svgElement.append("g")
        .attr("transform", `translate(${marginRight + 50}, ${height - marginBottom - 50})`)
        .call(d3.axisBottom(x));
      // Add X axis label:
      svgElement.append("text")
        .attr("text-anchor", "end")
        .attr("x", width / 2 + marginLeft)
        //.attr("y", height + marginTop + 20)
        .attr("y", height + marginTop - 50)
        .text(xAxisLabel);
      // Add y-axis
      const y = d3.scaleLinear()
        .domain([yMin, yMax])
        .range([height - 50, 0]);
      svgElement.append("g")
        .attr("transform", `translate(${marginRight + 50}, -${marginRight})`)
        .call(d3.axisLeft(y));
      // Y axis label:
      svgElement.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", 30)
        .attr("x", -marginTop - height / 2 + 100)
        .text(yAxisLabel);
      //add dots
      svgElement
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x(d[selectedXAxis]); })
        .attr("cy", function (d) { return y(d[selectedYAxis]); })
        .attr("r", 1.5)
        .style("fill", "#69b3a2")
        .attr("transform", `translate(${marginRight + 50}, -${marginRight})`);

    }, [xMax, yMax])

    return (
      <svg style={{ border: "1px solid white" }} width={width} height={height}
        ref={ref}
      />
    )
  }

  useEffect(() => {
    setXMax(d3.max(data, (d) => d[selectedXAxis]));
    setXMin(d3.min(data, (d) => d[selectedXAxis]));
    setYMax(d3.max(data, (d) => d[selectedYAxis]));
    setYMin(d3.min(data, (d) => d[selectedYAxis]));
    setXAxisLabel(selectedXAxis.replace(/_/g, " "));
    setYAxisLabel(selectedYAxis.replace(/_/g, " "));
  }, [selectedXAxis, selectedYAxis]);

  return (
    <span>
      <h3>Title</h3>
      {GraphTest()}

    </span>
  );
}