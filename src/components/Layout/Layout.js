/** @format */

import React from "react";

import styled from "styled-components";

const Wrapper = styled.div`
  padding: 4em;
  margin: 0;
  hight: auto;
  width: 100%;
  justify-content: center;
  @media (min-width: 1000px) {
    margin: 0;
  }
`;

export default function Layout(props) {
  return <Wrapper>{props.children}</Wrapper>;
}
