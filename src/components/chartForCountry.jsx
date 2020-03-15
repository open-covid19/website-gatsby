import React, { PureComponent } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

import "./styles.css";

const formatDate = epochTime => {
  return new Date(epochTime).toDateString().slice(4, -4);
};

class CustomizedXAxisTick extends PureComponent {
  render() {
    const { x, y, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} textAnchor="end" fill="#666" transform="rotate(-65)">
          {formatDate(payload.value)}
        </text>
      </g>
    );
  }
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <span className="date">{formatDate(label)}</span>
        <span className="confirmed">{`Confirmed : ${payload[0].value}`}</span>
        <span className="recovered">{`Recovered : ${payload[1].value}`}</span>
        <span className="deaths">{`Deaths : ${payload[2].value}`}</span>
      </div>
    );
  }

  return null;
};

export default class ChartForCountry extends PureComponent {
  render() {
    const { country } = this.props;

    return (
      <LineChart
        width={1000}
        height={250}
        data={country.chartSeries}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <XAxis dataKey="date" height={70} tick={<CustomizedXAxisTick />} />
        <YAxis allowDecimals={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="confirmed" stroke="#FF0000" />
        <Line type="monotone" dataKey="recovered" stroke="#00FF00" />
        <Line type="monotone" dataKey="deaths" stroke="#777777" />
      </LineChart>
    );
  }
}