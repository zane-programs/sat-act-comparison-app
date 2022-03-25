import { Route, Routes } from "react-router-dom";

// pages
import Home from "./pages/Home";
import CollegeView from "./pages/CollegeView";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/college/:uuid" element={<CollegeView />} />
    </Routes>
  );
}
