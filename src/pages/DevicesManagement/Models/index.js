import Table from "components/Tables";
import { useState } from "react";
import style from "./index.module.scss";
import { useModelsInfo } from "hooks";
import ModelsDetail from "../Models/ModelsDetails";
import { Link } from "react-router-dom";
export default function Devices() {
  const { data = [] } = useModelsInfo();
  const [select, setSelect] = useState([]);
  const [open, setOpen] = useState(false);
  const [modelId, setModelId] = useState(null);
  const info = data.map((e) => tableBody(e));
  const tableHead = [
    {
      id: "name",
      numberic: false,
      label: "Name",
    },
    {
      id: "manufacture",
      numberic: true,
      label: "Manufacture",
    },
    {
      id: "type",
      numberic: false,
      label: "Type",
    },
  ];
  function tableBody(data) {
    return {
      name: {
        value: (
          <div
            onClick={() => {
              setOpen(true);
              setModelId(data.id);
            }}
          >
            {data.name}
          </div>
        ),
        key: data.name,
      },
      manufacture: {
        value: (
          <div
            onClick={() => {
              setOpen(true);
              setModelId(data.id);
            }}
          >
            {data.manufacture}
          </div>
        ),
        key: data.manufacture,
      },
      type: {
        value: (
          <div
            onClick={() => {
              setOpen(true);
              setModelId(data.id);
            }}
          >
            {data.type}
          </div>
        ),
        key: data.type,
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
            modelId={modelId}
            open={open}
            onClose={() => setOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
