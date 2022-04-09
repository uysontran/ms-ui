import ModelsDetail from "pages/DevicesManagement/Models/ModelsDetails";
import Table from "components/Tables";
import { Link } from "react-router-dom";
import style from "./FirstPage.module.scss";
import { useToast } from "hooks";
import { useState } from "react";
import { useModelsInfo } from "hooks";
export default function FirstPage({ setIndex, submitData, setSubmitData }) {
  const [select, setSelect] = useState([]);
  const [open, setOpen] = useState(false);
  const [modelId, setModelId] = useState(null);
  const { data = [] } = useModelsInfo();
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
    {
      id: "select",
      numberic: false,
      label: "",
      isSort: false,
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
      select: {
        value: <input type="radio" name="id" value={data.id} />,
        key: data.id,
      },
    };
  }
  const errorToast = useToast("error");
  return (
    <div className={style.firstPage}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (e.target.id.value === "") {
            errorToast("Please select model first");
          } else {
            if (e.target.name.value === "") {
              errorToast("Please enter device name");
            } else {
              if (e.target.interval.value === "") {
                errorToast("Please enter device inverval");
              } else {
                setSubmitData({
                  ...submitData,
                  modelId: e.target.id.value,
                  name: e.target.name.value,
                  interval: e.target.interval.value,
                });
                setIndex(1);
              }
            }
          }
        }}
      >
        <div className={style.inputFields}>
          <div className={style.inputField}>
            <div>Name:</div>
            <input name="name" type="text" id="name" />
          </div>
          <div className={style.inputField}>
            <div>Interval:</div>
            <input name="interval" type="number" id="interval" />
          </div>
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
        <div className={style.note}>
          Note: You can click on a row to see model channels
        </div>
        <Link to="../models/new">
          <div>If there is no model you need, click here to create one</div>
        </Link>
        <input type="submit" value="Next" className={style.submit} />
      </form>
      {modelId !== null && (
        <ModelsDetail
          modelId={modelId}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
