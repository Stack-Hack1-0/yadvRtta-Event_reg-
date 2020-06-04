import React, { useState, useEffect } from "react";
import CanvasJSReact from "../../assets/canvasJs/canvasjs.react";
import axios from "axios";
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = () => {
  const [chart, setChart] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [dataPoints, setDataPoints] = useState(null);
  const [total, setTotal] = useState(null);

  const getData = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/v1/admin/submissionStats"
    );
    const arr = [];
    res.data.data.stats.forEach((el) => {
      const label = el._id[0] + el._id.slice(1).toLowerCase();
      arr.push({
        y: el.numRegistrations,
        label: label,
        indexLabel: `${label}:${(el.numRegistrations / el.total) * 100}%`,
      });
    });
    console.log(arr);
    setDataPoints(arr);
  };

  useEffect(() => {
    getData();
  }, []);

  const options = {
    animationEnabled: true,
    backgroundColor: "dimgrey",
    exportEnabled: true,
    theme: "dark2", // "light1", "dark1", "dark2"
    title: {
      text: "Trip Expenses",
    },
    data: [
      {
        type: "pie",
        startAngle: -90,
        dataPoints,
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default Chart;
