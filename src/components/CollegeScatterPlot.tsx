import { useMemo } from "react";
import createPlotlyComponent from "react-plotly.js/factory";
import Plotly from "plotly.js-basic-dist";

import { convertParsedDataForGraphing } from "../utils/naviance";
import { CollegeData } from "../data";

// create Plot component
const Plot = createPlotlyComponent(Plotly);

export default function CollegeScatterPlot({
  college,
}: {
  college: CollegeData;
}) {
  const graphingData = useMemo(
    () => (college.data ? convertParsedDataForGraphing(college.data) : []),
    [college]
  );

  return (
    <Plot
      data={graphingData}
      layout={{
        width: 800,
        height: 600,
        title: "Decisions - " + college.name,
        font: {
          family:
            'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
        },
        xaxis: {
          title: {
            text: "Standardized Test Percentile",
          },
        },
        yaxis: {
          title: {
            text: "Weighted GPA",
          },
        },
      }}
    />
  );
}
