import { useState } from "react";
import {
  BsArrowBarUp,
  BsCloudArrowUp,
  BsCloudCheck,
  BsCloudSlash,
  BsInfoCircle,
} from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import ReactTooltip from "react-tooltip";

import { ConfirmBox } from "components/ToolBox";
import Table from "components/Tables";
import { useDevicesInfo, useModelsInfo, useProvision } from "hooks";
import style from "./index.module.scss";
import { databaseCheck, databaseX } from "assets";
import TableBox from "./TableBox";
import ModelsDetail from "../Models/ModelsDetails";
import { Link } from "react-router-dom";
export default function Devices() {
  const [select, setSelect] = useState([]);
  const { data = [] } = useDevicesInfo();
  const data1 = useModelsInfo().data;
  const info = data.map((e) => tableBody(e));
  const [open, setOpen] = useState(false);
  const [modelId, setModelId] = useState(null);
  const { mutate } = useProvision({ onSuccess: () => {} });
  const tableHead = [
    {
      id: "name",
      numberic: false,
      label: "Name",
    },
    {
      id: "isProvision",
      numberic: true,
      label: "Provision Status",
    },
    {
      id: "isPersistence",
      numberic: true,
      label: "Persistence Status",
    },
    {
      id: "upProtocol",
      numberic: false,
      label: "Up Protocol",
    },
    {
      id: "downProtocol",
      numberic: false,
      label: "Down Protocol",
    },
    {
      id: "modelName",
      numberic: false,
      label: "Model Name",
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
    {
      id: "delete",
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
      modelName: {
        value: (
          <div
            onClick={() => {
              const temp = (data1?.length ? data1 : []).find(
                (e) => e.name === data.Model.name
              );
              setModelId(temp);
              setOpen(true);
            }}
          >
            {data.Model.name}
          </div>
        ),
        key: data.Model.name,
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
        key: data.isProvision ? 1 : 0,
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
        key: data.isPersistence ? 1 : 0,
      },
      upProtocol: {
        value: (
          <TableBox
            trigger={
              <div style={{ cursor: "pointer" }}>
                <BsInfoCircle />
              </div>
            }
            data={data.upProtocol}
            head={`${data.name} up protocol`}
          ></TableBox>
        ),
        key: data.name,
      },
      downProtocol: {
        value: (
          <TableBox
            trigger={
              <div style={{ cursor: "pointer" }}>
                <BsInfoCircle />
              </div>
            }
            data={data.downProtocol}
            head={`${data.name} down protocol`}
          ></TableBox>
        ),
        key: data.name,
      },
      provision: {
        value: (
          <ConfirmBox
            onConfirm={() => {
              mutate(data.id);
            }}
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
                data-tip="delete"
                data-effect="solid"
                data-place="top"
                data-for="persistence"
              >
                <ReactTooltip id="persistence" />
                <BsCloudArrowUp size={25} />
              </div>
            }
          >
            Are you sure about upload?
          </ConfirmBox>
        ),
        key: data.name,
      },
      delete: {
        value: (
          <ConfirmBox
            trigger={
              <div
                style={{ cursor: "pointer" }}
                data-tip="Upload Delete Devices"
                data-effect="solid"
                data-place="top"
                data-for="persistence"
              >
                <ReactTooltip id="delete" />
                <AiOutlineDelete size={25} />
              </div>
            }
          >
            Are you sure about delete?
          </ConfirmBox>
        ),
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
        {modelId !== null && (
          <ModelsDetail
            data={modelId}
            open={open}
            onClose={() => setOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
