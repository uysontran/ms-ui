import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";

import Devices from "./Devices";
import Models from "./Models";
import CreateDevices from "./Devices/Create";
import CreateModel from "./Models/Create";
import style from "./index.module.scss";
export default function DeviceManagement() {
  const location = useLocation();
  const tab = ({ pathname }) => {
    switch (pathname.split("/")[2]) {
      case "Devices":
      case "devices":
        return "Devices";
      case "models":
      case "Models":
        return "Models";
      default:
        return "";
    }
  };
  return (
    <div className={style.container}>
      <h1>Devices Management</h1>
      <div className={style.tabsName}>
        <Link
          to="devices"
          style={{
            color: tab(location) === "Devices" ? "#8139ff" : "#707683",
            borderBottom:
              tab(location) === "Devices" ? "3px solid #8139ff" : "none",
          }}
        >
          Devices
        </Link>
        <Link
          to="models"
          style={{
            color: tab(location) === "Models" ? "#8139ff" : "#707683",
            borderBottom:
              tab(location) === "Models" ? "3px solid #8139ff" : "none",
          }}
        >
          Models
        </Link>
      </div>
      <Routes>
        <Route index element={<Navigate to="devices" />} />
        <Route element={<Devices />} path="/devices" />
        <Route element={<CreateDevices />} path="/devices/new" />
        <Route element={<Models />} path="/models" />
        <Route element={<CreateModel />} path="/models/new" />
      </Routes>
    </div>
  );
}
