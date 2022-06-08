import style from "./index.module.scss";
import { useEffect, useState } from "react";
import { useServiceInfo } from "hooks";
import Table from "components/Tables";
import CreateChannel from "./CreateChannel";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPlusCircle } from "react-icons/bs";
import { useMutationModel } from "hooks";
import { useToast } from "hooks";
import { useNavigate } from "react-router-dom";
export default function CreateModel() {
  const { data: services = [], isLoading } = useServiceInfo();
  const downServices = services.filter((e) => e.type === "downService");
  const ProtocolTypes = downServices.map((e) => e.name);
  const [service, setService] = useState([]);
  const [select, setSelect] = useState([]);
  const toast = useToast("success");
  const navigate = useNavigate();
  const { mutate } = useMutationModel({
    onSuccess: () => {
      toast("Success");
      navigate(-1);
    },
  });
  const channelAttrs = [
    {
      key: "name",
    },
    {
      key: "ReadWrite",
      type: "ENUM",
      values: JSON.stringify(["R", "W", "RW"]),
    },
    {
      key: "Scale",
      defaultValue: 1,
    },
    {
      key: "Offset",
      defaultValue: 0,
    },
    {
      key: "Precision",
    },
    ...(service?.ServiceMetaDatas?.filter((e) => e.kind === "ModelChannel") ||
      []),
  ];
  const tableHead = [
    ...channelAttrs.map((attr) => ({
      id: attr.key,
      numberic: false,
      label: attr.key,
    })),
    {
      id: "delete",
      numberic: false,
      isSort: false,
      label: "",
    },
  ];
  const [channels, setChannels] = useState([]);
  const tableBody = channels.map((channel, i) => {
    return {
      ...Object.keys(channel).reduce(
        (a, b) => ({
          ...a,
          [b]: {
            value: channel[b],
            key: channel[b],
          },
        }),
        {}
      ),
      delete: {
        value: (
          <AiOutlineDelete
            onClick={() => {
              setChannels(channels.filter((e, id) => id !== i));
            }}
          />
        ),
        key: "delete",
      },
    };
  });
  const [open, setOpen] = useState(false);
  const [Form, setForm] = useState({
    name: "",
    type: "",
    manufacture: "",
    ProtocolType: ProtocolTypes[0],
  });
  useEffect(() => {
    setService(downServices[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services]);
  return (
    <div className={style.container}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        onChange={(e) => {
          setForm({ ...Form, [e.target.name]: e.target.value });
        }}
      >
        <div className={style.inputFields}>
          <div className={style.inputRow}>
            <div className={style.inputField}>
              <span>Name</span>
              <input type="text" name="name" />
            </div>
            <div className={style.inputField}>
              <span>Type</span>
              <input type="text" name="type" />
            </div>
          </div>
          <div className={style.inputRow}>
            <div className={style.inputField}>
              <span>Manufacture</span>
              <input type="text" name="manufacture" />
            </div>
            <div className={style.inputField}>
              <span>Protcol Type: </span>
              <select
                value={service?.name}
                onChange={(e) => {
                  const serviceName = e.target.value;
                  setService(downServices.find((e) => e.name === serviceName));
                }}
                name="ProtcolType"
              >
                {ProtocolTypes.map((e, i) => (
                  <option key={e + i} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </form>
      <div className={style.tableContainer}>
        {!isLoading && (
          <Table
            head={tableHead}
            data={tableBody}
            select={[select, setSelect]}
            footer={[
              <td
                key="1"
                colSpan={tableHead.length}
                className={style.tfooter}
                onClick={() => {
                  setOpen(true);
                }}
                align="center"
              >
                <BsPlusCircle />
              </td>,
            ]}
          />
        )}
        <div className={style.buttonHolder}>
          <button
            className={style.createButton}
            onClick={() => {
              mutate({ ...Form, channels });
            }}
          >
            Create
          </button>
        </div>
      </div>
      <CreateChannel
        open={open}
        onClose={() => setOpen(false)}
        setChannels={setChannels}
        channelAttrs={channelAttrs}
      />
    </div>
  );
}
