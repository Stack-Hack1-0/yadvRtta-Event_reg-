import React, { useState, useEffect } from "react";
import CanvasJSReact from "../../assets/canvasJs/canvasjs.react";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import Styles from "./Chart.module.css";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [dataPoints, setDataPoints] = useState(null);

  const getData = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/v1/admin/submissionStats"
    );
    const arr = [];
    const total = res.data.data.stats.reduce(
      (acc, el) => acc + el.numRegistrations,
      0
    );
    res.data.data.stats.forEach((el) => {
      const label = el._id[0] + el._id.slice(1).toLowerCase();
      arr.push({
        y: el.numRegistrations,
        label: label,
        indexLabel: `${label}:${((el.numRegistrations / total) * 100).toFixed(
          2
        )}%`,
        click: function (e) {
          console.log("hello");
          console.log(el._id);
          props.setType(el._id);
        },
      });
    });
    console.log(arr);
    setDataPoints(arr);
    setLoading(false);
  };

  useEffect(() => {
    getData();
    return () => {
      // AbortController.abort();
    };
  }, []);

  const options = {
    animationEnabled: true,
    backgroundColor: "dimgrey",

    // height: ,
    exportEnabled: true,
    theme: "dark2", // "light1", "dark1", "dark2"
    title: {
      text: "All Registrations",
    },

    data: [
      {
        explodeOnClick: false,
        type: "pie",
        showInLegend: true,
        legendText: "{label}:{y}",
        startAngle: -90,
        dataPoints,
        cursor: "pointer",
      },
    ],
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={Styles.chart}>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default Chart;
