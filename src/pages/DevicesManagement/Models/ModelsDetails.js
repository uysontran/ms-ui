import Popup from "reactjs-popup";
import { useState } from "react";
import style from "./ModelsDetail.module.scss";
import { useModelsInfo } from "hooks";
import Table from "components/Tables";
export default function ModelsDetail({
  trigger,
  modelId,
  open = false,
  onClose,
}) {
  const [select, setSelect] = useState([]);
  const { data = [], isLoading } = useModelsInfo();
  function isNumber(value) {
    return typeof value === "number" && isFinite(value);
  }

  if (isLoading) {
    return <div>Loading</div>;
  }
  const model = data.find((e) => e.id === modelId);
  const channels = model[model.type];
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
      contentStyle={{ backgroundColor: "#eff4f9", borderRadius: "20px" }}
      open={open}
      onClose={onClose}
    >
      {(close) => (
        <div className={style.container}>
          <div className={style.head}>
            <h1 className={style.header}>{model.name}</h1>

            <div className={style.headContent}>
              <span>Manufacture:</span>
              <span>{model.manufacture}</span>
            </div>
            <div className={style.headContent}>
              <span>Type:</span> <span>{model.type}</span>
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
              //   classes={{
              //     head: { name: style.head, default: true },
              //   }}
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
