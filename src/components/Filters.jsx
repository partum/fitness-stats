import React, { useState, useRef, useEffect } from 'react';
import * as d3 from "d3";
import FilterRadio from './FilterRadio';

function Filters(props) {

  return (<span>
    <h2>Filters</h2>
    <div className="filters">
      <span>
        <h3>X-Axis</h3>
        <FilterRadio name="filter_data_x" default={props.default} onChange={props.onChange} />
      </span>
      <span>
        <h3>Y-Axis</h3>
        <FilterRadio name="filter_data_y" default="height" />
      </span>
    </div>
  </span>)

}
export default Filters;