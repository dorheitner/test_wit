/** @format */

import React from "react";
import ErrorHandler from "./ErrorHandler/ErrorHandler";

export default function ErrorBoundary(props) {
  return (
    <div value={{ error: props.errors }}>
      {<ErrorHandler error={props.errors.message} />}
      {props.children}
    </div>
  );
}
