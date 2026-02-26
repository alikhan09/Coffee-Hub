import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import SolidGauge from "highcharts/modules/solid-gauge";

HighchartsMore.Highcharts;
SolidGauge.Highcharts;

const GaugeChart = ({ value }) => {
    const options = {
    chart: {
      type: "solidgauge",
      height: 120, 
      spacing: [0, 0, 0, 0],
      margin: [0, 0, 0, 0],
    },
    title: null,
    pane: {
      center: ["50%", "85%"], 
      size: "130%", 
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor: "#E5E7EB",
        innerRadius: "60%",
        outerRadius: "100%",
        shape: "arc",
      },
    },
    credits: { enabled: false },
    tooltip: { enabled: false },
    yAxis: {
      min: 0,
      max: 100,
      stops: [
        [0.3, "#DC2626"],
        [0.6, "#FACC15"],
        [1.0, "#16A34A"],
      ],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      labels: { enabled: false },
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          y: -15,
          borderWidth: 0,
          useHTML: true,
          format: `<div style="text-align:center">
                    <span style="font-size:14px;color:#111827">{y}</span>
                    <br/>
                    <span style="font-size:11px;color:#6B7280">Score</span>
                  </div>`,
        },
      },
    },
    series: [
      {
        name: "Score",
        data: [value],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default GaugeChart;