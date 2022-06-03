import Popup from "reactjs-popup";
import { useState } from "react";
import style from "./ModelsDetail.module.scss";
import Table from "components/Tables";
export default function ModelsDetail({ trigger, data, open = false, onClose }) {
  const [select, setSelect] = useState([]);
  function isNumber(value) {
    return typeof value === "number" && isFinite(value);
  }
  const channels = data.ModelChannels;
  const tableHead = Object.keys(channels[0]).map((e) => ({
    id: e,
    numberic: isNumber(channels[0][e]),
    label: e,
  }));

  const tableBody = channels.map((channel) =>
    Object.keys(channel).reduce(
      (object, value) => ({
        ...object,
        [value]: { value: channel[value], key: channel[value] },
      }),
      {}
    )
  );
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
          <div className={style.head}>
            <h1 className={style.header}>{data.name}</h1>

            <div className={style.headContent}>
              <span>Manufacture:</span>
              <span>{data.manufacture}</span>
            </div>
            <div className={style.headContent}>
              <span>Type:</span> <span>{data.type}</span>
            </div>
            <div className={style.headContent}>
              <span>Channels:</span>
            </div>
          </div>
          <div className={style.content}>
            <Table
              head={tableHead}
              select={[select, setSelect]}
              data={tableBody}
              classes={{
                head: { name: style.head, default: true },
              }}
            />
          </div>
          <div onClick={() => close()} className={style.footer}>
            Close
          </div>
        </div>
      )}
    </Popup>
  );
}
