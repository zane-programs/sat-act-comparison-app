import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

// styles
import "katex/dist/katex.min.css";
import "./styles/global.css";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
