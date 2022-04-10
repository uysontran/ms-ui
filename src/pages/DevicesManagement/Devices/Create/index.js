import { Carousel } from "components/ToolBox";
import { useState } from "react";
import style from "./index.module.scss";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import ThirdPage from "./ThirdPage";
export default function CreateDevice() {
  const [index, setIndex] = useState(0);
  const [submitData, setSubmitData] = useState({});
  return (
    <div className={style.container}>
      <div className={style.Carousel}>
        <Carousel toolbars={false} Index={index % 3}>
          {/* <FirstPage
            setIndex={setIndex}
            submitData={submitData}
            setSubmitData={setSubmitData}
          />
          <SecondPage setIndex={setIndex} /> */}
          <ThirdPage />
          <div></div>
        </Carousel>
      </div>
    </div>
  );
}
