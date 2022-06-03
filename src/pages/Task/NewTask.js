import Popup from "reactjs-popup";
import style from "./NewTask.module.scss";
export default function NewTask({ trigger, data, open = false, onClose }) {
  return (
    <Popup
      trigger={trigger}
      modal
      contentStyle={{ backgroundColor: "white", borderRadius: "20px" }}
      open={open}
      onClose={onClose}
    >
      {(close) => (
        <div className={style.container}>
          <div onClick={() => close()} className={style.footer}>
            Close
          </div>
        </div>
      )}
    </Popup>
  );
}
