import { AiFillHome } from "react-icons/ai";
import { BsFillCpuFill } from "react-icons/bs";
// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: "",
    component: "pages/Login",
    layout: null,
    layoutProps: "",
    navBar: false,
  },
  {
    path: "/home",
    component: "pages/Home",
    layout: "SideBar",
    layoutProps: "",
    icon: <AiFillHome size={25} />,
    label: "Home",
  },
  {
    path: "/devices-management",
    component: "pages/DevicesManagement",
    layout: "SideBar",
    layoutProps: "",
    icon: <BsFillCpuFill size={25} />,
    label: "Device Management",
  },
];
