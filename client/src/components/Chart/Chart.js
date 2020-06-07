import React, { useState, useEffect } from "react";
import CanvasJSReact from "../../assets/canvasJs/canvasjs.react";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import Styles from "./Chart.module.css";
import Config from "../../assets/config";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [dataPoints, setDataPoints] = useState(null);

  useEffect(
    (val = { ...props }) => {
      let sub = true;
      const getData = async () => {
        const res = await axios.get(`${Config.LINK}/admin/submissionStats`);
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
            indexLabel: `${label}:${(
              (el.numRegistrations / total) *
              100
            ).toFixed(2)}%`,
            click: function (e) {
              val.setType(el._id);
            },
          });
        });
        if (sub) {
          setDataPoints(arr);
          setLoading(false);
        }
      };
      getData(sub);
      return () => {
        sub = false;
      };
    },
    [props]
  );

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
