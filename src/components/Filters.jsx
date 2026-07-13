import React, { useState, useRef, useEffect } from 'react';
import * as d3 from "d3";
import FilterRadio from './FilterRadio';

function Filters() {

  const Circle = () => {
    const ref = useRef()

    useEffect(() => {
      const svgElement = d3.select(ref.current)
      svgElement.append("circle")
        .attr("cx", 150)
        .attr("cy", 70)
        .attr("r", 50)
    }, [])

    return (
      <svg
        ref={ref}
      />
    )
  }
  return (<span>
    <h2>Filters</h2>
    {Circle()}
    <h3>X-Axis</h3>
    <FilterRadio name="filter_data_x" default="weight" />
    <h3>Y-Axis</h3>
    <FilterRadio name="filter_data_y" default="height" />
  </span>)

}
export default Filters;