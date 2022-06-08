import Popup from "reactjs-popup";
import style from "./NewTask.module.scss";
import { useDevicesInfo, useModelsInfo, useMutateTask } from "hooks";
import { useState } from "react";
import Table from "components/Tables";

export default function NewTask({ trigger, data, open = false, onClose }) {
  const { data: devices = [] } = useDevicesInfo();
  const { data: models = [], isLoading } = useModelsInfo();
  const [deviceSelect, setDeviceSelect] = useState(1);
  // eslint-disable-next-line eqeqeq
  const device = devices.find((e) => e.id == deviceSelect);
  const model = models.find((e) => e.id === device.ModelID);
  const [select, setSelect] = useState([]);
  const { mutate } = useMutateTask({
    onSuccess: () => console.log("thang cong"),
  });
  function isNumber(value) {
    return typeof value === "number" && isFinite(value);
  }
  if (isLoading) {
    return <div></div>;
  }
  if (device === undefined) {
    return <div></div>;
  }
  if (model === undefined) {
    return <div></div>;
  }
  console.log(model);
  const channels = model?.ModelChannels;
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
          <h3>Create new Task</h3>
          <form
            className={style.form}
            onSubmit={(e) => {
              e.preventDefault();
              mutate({
                DeviceID: e.target.DeviceID.value,
                type: "ReadDeviceData",
                scheduleType: "Periodic",
                status: "running",
                ReadDeviceData: select.map((e) => ({ ChannelID: e.id.value })),
                startTime: new Date(e.target.startTime.value).toISOString(),
                interval: e.target.interval.value,
              });
              close();
            }}
          >
            <div className={style.bar}>
              <span>Devices:</span>
              <select
                onChange={(event) => setDeviceSelect(event.target.value)}
                name="DeviceID"
              >
                {devices.map((device, index) => (
                  <option value={device.id} key={index}>
                    {device?.name}
                  </option>
                ))}
              </select>
              <span>Inverval:</span>
              <input type="number" name="interval" />
              <span>StartTime:</span>
              <input type="datetime-local" name="startTime" />
            </div>
            <div className={style.container}>
              <div className={style.head}>
                <div className={style.headContent}>
                  <span>Channels:</span>
                  <Table
                    head={tableHead}
                    select={[select, setSelect]}
                    data={tableBody}
                    classes={{
                      head: { name: style.head, default: true },
                    }}
                    checkbox
                  />
                </div>
              </div>
              <div className={style.content}> </div>
            </div>
            <div className={style.footer}>
              <input
                type="submit"
                value="Create"
                className={style.buttonHolder}
              />
            </div>
          </form>
        </div>
      )}
    </Popup>
  );
}
