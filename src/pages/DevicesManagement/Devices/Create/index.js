import { useState } from "react";
import style from "./index.module.scss";
import FirstPage from "./FirstPage";
export default function CreateDevice() {
  const [submitData, setSubmitData] = useState({});
  return (
    <div className={style.container}>
      <div className={style.Carousel}>
        <FirstPage submitData={submitData} setSubmitData={setSubmitData} />
      </div>
    </div>
  );
}
