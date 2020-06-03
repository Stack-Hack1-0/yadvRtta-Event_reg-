import React, { useState } from "react";
import CanvasJSReact from "../../assets/canvasJs/canvasjs.react";
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = () => {
  const [chart, setChart] = useState(null);
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
        indexLabel: "{label}: {y}%",
        startAngle: -90,

        dataPoints: [
          {
            y: 20,
            label: "Airfare",
            click: () => console.log("hello"),
            cursor: "pointer",
          },
          { y: 24, label: "Food & Drinks" },
          { y: 20, label: "Accomodation" },
          { y: 14, label: "Transportation" },
          { y: 12, label: "Activities" },
          { y: 10, label: "Misc" },
        ],
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} onRef={(ref) => setChart(ref)} />
    </div>
  );
};

export default Chart;
