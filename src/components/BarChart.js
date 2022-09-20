import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ chartData, options }) => {
  return <Bar data={chartData} options={options} />;
};

export default BarChart;
