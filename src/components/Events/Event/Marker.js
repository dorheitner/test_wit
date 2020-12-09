/** @format */

import React from "react";
import styled from "styled-components";

const MarkerTag = styled.div`
  color: white;
  background: #269c9c;
  padding: 15px 10px;
  display: inline-flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 20%;
  transform: translate(-50%, -50%);
`;

const Marker = (props) => (
  <div>
    <MarkerTag>{props.text}</MarkerTag>
  </div>
);

export default Marker;
