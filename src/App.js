import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

import router from "./constants/router";
import Layout from "layout";

import "styles/index.css";
function App() {
  return (
    <Routes>
      {router.map((route, index) => {
        const Element = lazy(() => import(`${route.component}`));
        return (
          <Route
            element={<Layout type={route.layout} props={route.layoutProps} />}
            key={"App router" + index}
          >
            <Route element={<Element />} path={route.path} />
          </Route>
        );
      })}
    </Routes>
  );
}

export default App;
