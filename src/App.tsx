import Plot from "react-plotly.js";

function App() {
  return (
    <Plot
      data={[
        {
          x: [1, 2, 3, 4],
          y: [10, 15, 13, 17],
          mode: "markers",
          name: "SAT - Accepted",
          type: "scatter",
          marker: {
            color: "rgb(0, 128, 0)",
            size: 12,
            symbol: "square",
          },
        },

        {
          x: [2, 3, 4, 5],
          y: [16, 5, 11, 9],
          mode: "markers",
          name: "SAT - Rejected",
          type: "scatter",
          marker: {
            color: "rgb(128, 0, 0)",
            size: 12,
            symbol: "square",
          },
        },
        {
          x: [2, 4, 6, 7],
          y: [13, 12, 19, 7],
          mode: "markers",
          name: "ACT - Accepted",
          type: "scatter",
          marker: {
            color: "rgb(0, 128, 0)",
            size: 12,
            symbol: "star",
          },
        },
        {
          x: [1, 2, 3, 4],
          y: [12, 9, 15, 12],
          mode: "markers",
          name: "ACT - Rejected",
          type: "scatter",
          marker: {
            color: "rgb(128, 0, 0)",
            size: 12,
            symbol: "star",
          },
        },
      ]}
      layout={{
        width: 800,
        height: 600,
        title: "SAT Acceptances & Rejections",
        font: {
          family:
            'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
        },
      }}
    />
  );
}

export default App;
