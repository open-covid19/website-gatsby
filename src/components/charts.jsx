import React from "react";
import "./styles.css";

import Countries from "./countries";

export default function Charts() {
  return (
    <div className="App">
      <h1>COVID-2019 Data Charts</h1>
      <h2>First 60 countries sorted by confirmed cases, in descending order</h2>

      <Countries />
    </div>
  );
}