import { Outlet, Link, useLocation } from "react-router-dom";
import { Suspense } from "react";
import style from "./index.module.scss";
import dino from "assets/logos/dino.png";
import router from "constants/router";
import clsx from "clsx";
export default function SideBarLayout() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className={style.container}>
      <div className={style.sideBar}>
        <div className={style.imgContainer}>
          <img src={dino} alt="dino" />
        </div>
        <div className={style.LinksHolder}>
          {router
            .filter((route) => route.navBar !== false)
            .map((route, index) => (
              <Link
                to={
                  route.path === currentPath.slice(0, route.path.length)
                    ? location.pathname
                    : route.path
                }
                className={clsx([
                  style.LinkHolder,
                  currentPath === route.path && style.LinkHolderActive,
                ])}
              >
                <div className={style.iconHolder}>{route.icon}</div>
                <span>{route.label}</span>
              </Link>
            ))}
        </div>
      </div>
      <div className={style.outlet}>
        <Suspense fallback={<h1>App is Loading</h1>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
