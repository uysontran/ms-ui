import { useState } from "react";
import {
  BsArrowBarUp,
  BsCloudArrowUp,
  BsCloudCheck,
  BsCloudSlash,
} from "react-icons/bs";
import ReactTooltip from "react-tooltip";

import { ConfirmBox } from "components/ToolBox";
import Table from "components/Tables";
import { useDevicesInfo } from "hooks";
import style from "./index.module.scss";
import { databaseCheck, databaseX } from "assets";
import TableBox from "./TableBox";
import ModelsDetail from "../Models/ModelsDetails";
import { Link } from "react-router-dom";
export default function Devices() {
  const [select, setSelect] = useState([]);
  const { data = [] } = useDevicesInfo();
  const info = data.map((e) => tableBody(e));
  const tableHead = [
    {
      id: "name",
      numberic: false,
      label: "Name",
    },
    {
      id: "interval",
      numberic: true,
      label: "Interval",
    },
    {
      id: "isProvision",
      numberic: false,
      label: "Provision Status",
    },
    {
      id: "isPersistence",
      numberic: false,
      label: "Persistence Status",
    },
    {
      id: "northProtocol",
      numberic: false,
      label: "Up Protocol",
    },
    {
      id: "southProtocol",
      numberic: false,
      label: "Down Protocol",
    },
    {
      id: "modelName",
      numberic: false,
      label: "Model Name",
    },
    {
      id: "startTime",
      numberic: true,
      label: "Start Time",
    },
    {
      id: "provision",
      numberic: false,
      label: "",
      isSort: false,
    },
    {
      id: "persistence",
      numberic: false,
      label: "",
      isSort: false,
    },
  ];

  function tableBody(data) {
    return {
      name: {
        value: <div>{data.name}</div>,
        key: data.name,
      },
      interval: {
        value: <div>{data.interval}</div>,
        key: data.interval,
      },
      startTime: {
        value: <div>{new Date(data.startTime).toLocaleString("vi-VN")}</div>,
        key: Date.parse(data.startTime),
      },
      isProvision: {
        value: (
          <div>
            {data.isProvision ? (
              <div data-tip="This device has provisioned" data-effect="solid">
                <BsCloudCheck size={25} color="#00ad55" />
                <ReactTooltip />
              </div>
            ) : (
              <div data-tip="This device has not provisioned">
                <BsCloudSlash size={25} color="#f30d0d" />
                <ReactTooltip />
              </div>
            )}
          </div>
        ),
        key: data.isProvision,
      },
      isPersistence: {
        value: (
          <div>
            {data.isPersistence ? (
              <div
                data-tip="This device's data is persist into local storage"
                data-effect="solid"
              >
                <img src={databaseCheck} alt="databaseCheck" width={25} />
                <ReactTooltip />
              </div>
            ) : (
              <div
                data-tip="This device's data is not persist into local storage"
                data-effect="solid"
              >
                <img src={databaseX} alt="databaseCheck" width={25} />
                <ReactTooltip />
              </div>
            )}
          </div>
        ),
        key: data.isPersistence,
      },
      northProtocol: {
        value: (
          <TableBox
            trigger={
              <div style={{ cursor: "pointer" }}>{data.northProtocol}</div>
            }
            data={data[data.northProtocol]}
            head={`${data.name} up protocol`}
          ></TableBox>
        ),
        key: data.northProtocol,
      },
      southProtocol: {
        value: (
          <TableBox
            trigger={
              <div style={{ cursor: "pointer" }}>{data.southProtocol}</div>
            }
            data={data[data.southProtocol]}
            head={`${data.name} down protocol`}
          ></TableBox>
        ),
        key: data.southProtocol,
      },
      modelName: {
        value: (
          <ModelsDetail
            trigger={<div style={{ cursor: "pointer" }}>{data.model.name}</div>}
            modelId={data.model.id}
          ></ModelsDetail>
        ),
        key: data.model.name,
      },
      provision: {
        value: (
          <ConfirmBox
            trigger={
              <div
                style={{ cursor: "pointer" }}
                data-tip="Provision"
                data-effect="solid"
              >
                <ReactTooltip />
                <BsArrowBarUp size={25} />
              </div>
            }
          >
            Are you sure about provision?
          </ConfirmBox>
        ),
        key: data.name,
      },
      persistence: {
        value: (
          <ConfirmBox
            trigger={
              <div
                style={{ cursor: "pointer" }}
                data-tip="Upload All Data"
                data-effect="solid"
                data-place="top"
                data-for="persistence"
              >
                <ReactTooltip id="persistence" />
                <BsCloudArrowUp size={25} />
              </div>
            }
          >
            Are you sure about upload all data?
          </ConfirmBox>
        ),
        key: data.name,
      },
    };
  }

  return (
    <div className={style.container}>
      <div className={style.buttonHolder}>
        <Link to="new">
          <div className={style.createButton}>+ Create</div>
        </Link>
      </div>
      <div className={style.tableContainer}>
        <Table
          head={tableHead}
          select={[select, setSelect]}
          data={info}
          classes={{
            head: { name: style.head, default: true },
          }}
        />
      </div>
    </div>
  );
}
