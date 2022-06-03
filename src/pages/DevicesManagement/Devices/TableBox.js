import Popup from "reactjs-popup";
import style from "./TableBox.module.scss";
export default function TableBox({ trigger, data, head }) {
  return (
    <Popup
      trigger={trigger}
      modal
      contentStyle={{ backgroundColor: "#eff4f9", borderRadius: "20px" }}
    >
      {(close) => (
        <div className={style.container}>
          <div className={style.head}>{head}</div>
          <div className={style.content}>
            {Object.keys(data)
              .filter((e) => e !== "id")
              .map((e, index) => (
                <div key={index + "tablebox"}>
                  <span>{e}</span>
                  <span>{data[e]}</span>
                </div>
              ))}
          </div>
          <div onClick={() => close()} className={style.footer}>
            Close
          </div>
        </div>
      )}
    </Popup>
  );
}
