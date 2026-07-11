import React from 'react';
import * as d3 from 'd3';
import csvText from '../assets/gym_members_exercise_tracking_synthetic_data.csv?raw';

const parsedData = d3.csvParse(csvText, (row) => ({
  ...row,
  Calories_Burned: Number(row.Calories_Burned) || 0,
}));

const defaultData = parsedData.map((row) => row.Calories_Burned);

export default function Graphs({
  data = defaultData,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20,
}) {
  const values = Array.isArray(data) ? data : [];
  const x = d3.scaleLinear([0, values.length - 1], [marginLeft, width - marginRight]);
  const y = d3.scaleLinear([0, Math.max(...values, 0)], [height - marginBottom, marginTop]);
  const line = d3.line((_, i) => x(i), (d) => y(d));

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
    </svg>
    </span>
  );
}