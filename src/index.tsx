import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

// global styles
import "./styles/global.css";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
