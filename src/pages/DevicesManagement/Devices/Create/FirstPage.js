import ModelsDetail from "pages/DevicesManagement/Models/ModelsDetails";
import Table from "components/Tables";
import { Link } from "react-router-dom";
import style from "./FirstPage.module.scss";
import { useToast } from "hooks";
import { useState, useRef } from "react";
import { useModelsInfo, useServiceInfo, useProtcolConfig } from "hooks";
import { AiTwotoneEdit } from "react-icons/ai";
import ProtocolBox from "./ProtocolBox";
export default function FirstPage({ submitData, setSubmitData }) {
  //state
  const [select, setSelect] = useState([]);
  const [open, setOpen] = useState(false);
  const [modelId, setModelId] = useState(null);
  const upService = useRef({ value: null });
  const downService = useRef({ value: null });
  const [openConnection, setOpenConnection] = useState(false);
  const [openServer, setOpenServer] = useState(false);
  //api
  const { data = [] } = useModelsInfo();
  const services = useServiceInfo();
  const downServiceData = useProtcolConfig(downService.current.value);
  const upServiceData = useProtcolConfig(upService.current.value);
  //data processing
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
      onClick: () => {
        setOpen(true);
        setModelId(data);
      },
      name: {
        value: <div>{data.name}</div>,
        key: data.name,
      },
      manufacture: {
        value: <div>{data.manufacture}</div>,
        key: data.manufacture,
      },
      type: {
        value: <div>{data.type}</div>,
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
              setSubmitData({
                ...submitData,
                modelId: e.target.id.value,
                name: e.target.name.value,
              });
            }
          }
        }}
      >
        <div className={style.inputFields}>
          <div className={style.inputRow}>
            <div className={style.inputField}>
              <div>Name:</div>
              <input name="name" type="text" id="name" />
            </div>
          </div>
          <div className={style.inputRow}>
            <div className={style.inputField}>
              <div>Down Service:</div>
              <select ref={downService}>
                {services.data
                  ? services.data
                      .filter((e) => e.type === "downService")
                      .map((e, i) => (
                        <option key={i} value={e.id}>
                          {e.name}
                        </option>
                      ))
                  : null}
              </select>
            </div>
            <div className={style.inputField}>
              <div>Connection</div>
              <div style={{ display: "flex" }}>
                <select>
                  {downServiceData.data
                    ? downServiceData.data.map((e, i) => (
                        <option key={i} value={e.id}>
                          {e.name}
                        </option>
                      ))
                    : null}
                </select>
                <div style={{ paddingLeft: "10px", cursor: "pointer" }}>
                  <AiTwotoneEdit />
                </div>
              </div>
            </div>
          </div>
          <div className={style.inputRow}>
            <div className={style.inputField}>
              <div>Up Service:</div>
              <select ref={upService}>
                {services.data
                  ? services.data
                      .filter((e) => e.type === "upService")
                      .map((e, i) => (
                        <option key={i} value={e.id}>
                          {e.name}
                        </option>
                      ))
                  : null}
              </select>
            </div>
            <div className={style.inputField}>
              <div>Server</div>
              <div style={{ display: "flex" }}>
                <select>
                  {upServiceData.data
                    ? upServiceData.data.map((e, i) => (
                        <option key={i} value={e.id}>
                          {e.name}
                        </option>
                      ))
                    : null}
                  <option></option>
                </select>
                <div style={{ paddingLeft: "10px", cursor: "pointer" }}>
                  <AiTwotoneEdit />
                </div>
              </div>
            </div>
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
          data={modelId}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
