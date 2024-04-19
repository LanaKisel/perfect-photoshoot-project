import React from "react";
import App from "./components/App";
import "./index.css";
import ReactDOM, { createRoot } from "react-dom/client";
// import reportWebVitals from './reportWebVitals';
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
