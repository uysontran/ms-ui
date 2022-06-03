import { useDevicesInfo, useTask } from "hooks";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import Table from "components/Tables";
import { useState } from "react";
import TaskDetail from "./TaskDetail";
import { Link } from "react-router-dom";
import style from "./DataCollection.module.scss";
import NewTask from "./NewTask";
export default function DataCollection() {
  const [select, setSelect] = useState([]);
  const tasks = useTask(null);
  const devices = useDevicesInfo(null);
  const [open, setOpen] = useState(false);
  const [channels, setChannels] = useState(null);
  const [newTask, setNewTask] = useState(false);
  const tableHead = [
    {
      id: "id",
      numberic: false,
      label: "taskID",
    },
    {
      id: "device",
      numberic: false,
      label: "Device Name",
    },
    {
      id: "type",
      numberic: false,
      label: "Task ID",
    },
    {
      id: "interval",
      numberic: true,
      label: "Interval",
    },
    {
      id: "channels",
      numberic: false,
      isSort: false,
      label: "Channels",
    },
    {
      id: "delete",
      numberic: false,
      isSort: false,
      label: "",
    },
  ];
  const tableBody = (tasks?.data || []).map((task, index) => {
    return {
      id: {
        value: task.id,
        key: task.id,
      },
      device: {
        value: (devices?.data ? devices?.data : []).find(
          (e) => e.id === task.DeviceID
        )?.name,
        key: (devices?.data ? devices?.data : []).find(
          (e) => e.id === task.DeviceID
        )?.name,
      },
      type: {
        value: task.scheduleType,
        key: task.scheduleType,
      },
      interval: {
        value: task.interval,
        key: task.interval,
      },
      channels: {
        value: (
          <BsInfoCircle
            onClick={() => {
              setOpen(true);
              setChannels(task);
            }}
          />
        ),
        key: task.id,
      },
      delete: {
        value: <AiOutlineDelete size={25} />,
        key: task.id,
      },
    };
  });
  return (
    <div className={style.container}>
      <div className={style.buttonHolder}>
        <div className={style.createButton} onClick={() => setNewTask(true)}>
          + Create
        </div>
      </div>
      <Table head={tableHead} select={[select, setSelect]} data={tableBody} />
      {tasks !== null && (
        <TaskDetail
          data={channels}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
      <NewTask open={newTask} onClose={() => setNewTask(false)} />
    </div>
  );
}
