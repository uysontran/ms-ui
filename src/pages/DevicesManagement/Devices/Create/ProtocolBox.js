import Popup from "reactjs-popup";
import style from "./ProtocolBox.module.scss";
export default function ProtocolBox({ trigger, data, open = false, onClose }) {
  return (
    <Popup
      trigger={trigger}
      modal
      contentStyle={{ backgroundColor: "white", borderRadius: "20px" }}
      open={open}
      onClose={onClose}
    >
      {(close) => {
        <div className={style.container}></div>;
      }}
    </Popup>
  );
}
