import style from "./index.module.scss";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";

import DataCollection from "./DataCollection";
export default function Task() {
  const location = useLocation();
  const tab = ({ pathname }) => {
    switch (pathname.split("/")[2]) {
      case "data-collection":
        //   case "Repeat-Task":
        return 1;
      default:
        return 0;
    }
  };

  return (
    <div className={style.container}>
      <h1>Task management</h1>
      <div className={style.navigate}>
        <Link
          to="data-collection"
          style={{
            color: tab(location) === 1 ? "#8139ff" : "#707683",
            borderBottom: tab(location) === 1 ? "3px solid #8139ff" : "none",
          }}
        >
          Data Collection
        </Link>
      </div>
      <Routes>
        <Route index element={<Navigate to="data-collection" />} />
        <Route element={<DataCollection />} path="/data-collection" />
      </Routes>
    </div>
  );
}
