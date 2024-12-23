import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <style>
      {`
        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          border: none;
        }
      `}
    </style>
    <App />
  </React.StrictMode>
);
