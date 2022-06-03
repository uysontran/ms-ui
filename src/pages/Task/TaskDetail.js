import Popup from "reactjs-popup";
import { useState } from "react";
import style from "./TaskDetail.module.scss";
import Table from "components/Tables";
import { useDevicesInfo, useModelsInfo } from "hooks";
export default function TaskDetail({ trigger, data, open = false, onClose }) {
  const [select, setSelect] = useState([]);
  const devices = useDevicesInfo();
  const models = useModelsInfo();
  function isNumber(value) {
    return typeof value === "number" && isFinite(value);
  }
  const device = (devices?.data ? devices.data : []).find(
    (e) => e?.id === data?.DeviceID
  );
  const model = (models?.data ? models.data : []).find(
    (e) => e?.id === device?.ModelID
  );
  const channels = (model?.ModelChannels || [])
    .filter((channel) =>
      data.ReadDeviceData.some((e) => e?.ChannelID === channel.id)
    )
    .map((e) => ({ ...e }));

  const tableHead = channels.length
    ? Object.keys(channels[0]).map((e) => ({
        id: e,
        numberic: isNumber(channels[0][e]),
        label: e,
      }))
    : [];
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
          <Table
            head={tableHead}
            select={[select, setSelect]}
            data={tableBody}
            // classes={{
            //   head: { name: style.head, default: true },
            // }}
          />
          <div onClick={() => close()} className={style.footer}>
            Close
          </div>
        </div>
      )}
    </Popup>
  );
}
