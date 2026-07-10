import React from "react";
import ReactDOM from "react-dom/client";
import Yhteiskunta from "./yhteiskunta.jsx";
import logoUrl from "../assets/logo-mark.svg";

const favicon = document.getElementById("favicon");
if (favicon) favicon.href = logoUrl;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Yhteiskunta />
  </React.StrictMode>
);
