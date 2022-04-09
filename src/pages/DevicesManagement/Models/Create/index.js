import style from "./index.module.scss";
import { useRef, useState } from "react";
import { useToast } from "hooks";
import { useMutationModel } from "hooks";
export default function CreateModel() {
  const [type, setType] = useState("modbusChannels");
  const [channels, setChannels] = useState([]);
  const errorToast = useToast("error");
  const { mutate } = useMutationModel();
  const tableHead = {
    modbusChannels: [
      "Channel Name",
      "Function",
      "Address",
      "Quantity",
      "Parse",
      "Scale",
      "Precision",
    ],
  };
  const typeList = {
    modbusChannels: [
      "channel_name",
      "fc",
      "addr",
      "quantity",
      "parse",
      "scale",
      "precision",
    ],
  };
  const form1 = useRef();
  const form2 = useRef();
  return (
    <div className={style.container}>
      <form onSubmit={(e) => e.preventDefault()} ref={form1}>
        <div className={style.inputFields}>
          <div className={style.inputField}>
            <div>Name:</div>
            <input name="name" type="text" id="name" />
          </div>
          <div className={style.inputField}>
            <div>Manufacture:</div>
            <input name="manufacture" type="text" id="manufacture" />
          </div>
        </div>
        <div className={style.inputFields}>
          <div className={style.inputField}>
            <div>Type: </div>
            <select
              className={style.field}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="modbusChannels">Modbus</option>
            </select>
          </div>
        </div>
        <input type="submit" style={{ display: "none" }} />
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let vadidate = false;
          typeList[type].every((el, index) => {
            if (e.target[el].value === "") {
              errorToast("please enter " + tableHead[type][index]);
              vadidate = true;
              return false;
            }
            return true;
          });
          if (vadidate) return;
          setChannels([
            ...channels,
            typeList[type].map((el) => ({
              value:
                e.target[el].dataset.type === "number"
                  ? parseFloat(e.target[el].value)
                  : e.target[el].value,
            })),
          ]);

          e.target.reset();
        }}
        ref={form2}
      >
        <table className={style.table}>
          <tbody>
            <tr>
              {tableHead[type].map((e, i) => (
                <td key={i + e + "modelcreate"}>{e}</td>
              ))}
            </tr>
            {channels.length === 0
              ? null
              : channels.map((channel, id) => (
                  <tr key={id + "modelCreate2"}>
                    {channel.map((e, i) => (
                      <td key={i + e + "modelCreate2"}>{e.value}</td>
                    ))}
                  </tr>
                ))}
            <tr>
              <AddRow />
            </tr>
          </tbody>
        </table>
        <input type="submit" style={{ display: "none" }} />
      </form>
      <button
        onClick={() => {
          if (form1.current.name.value === undefined) {
            errorToast("please enter model name");
            return;
          } else if (channels.length === 0) {
            errorToast("model must have channels");
          } else {
            const data = {
              name: form1.current.name.value,
              type: type,
              manufacture: form1.current.manufacture.value,
              channels: channels.map((channel) =>
                channel.reduce(function (object, e, i) {
                  return {
                    ...object,
                    [typeList[type][i]]: e.value,
                  };
                }, {})
              ),
            };

            mutate(data);
          }
        }}
      >
        Create
      </button>
    </div>
  );
}
function AddRow({ type }) {
  switch (type) {
    default:
      return <AddModbusChannel />;
  }
}
function AddModbusChannel() {
  const parseValue16 = ["Int16BE", "Int16LE", "UInt16BE", "UInt16LE"];
  const parseValue32 = [
    "Int32BE",
    "Int32LE",
    "UInt32BE",
    "UInt32LE",
    "FloatBE",
    "FloatLE",
  ];
  const parseValue64 = [
    "BigInt64BE",
    "BigInt64LE",
    "BigUInt64BE",
    "BigUInt64LE",
    "DoubleBE",
    "DoubleLE",
  ];
  const [parse, setParse] = useState("1");
  return (
    <>
      <td>
        <input type="text" name="channel_name" />
      </td>
      <td>
        <select name="fc">
          <option value="03">03</option>
        </select>
      </td>
      <td>
        <input type="text" name="addr" />
      </td>
      <td>
        <select
          name="quantity"
          onChange={(e) => setParse(e.target.value)}
          data-type="number"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="4">4</option>
        </select>
      </td>
      <td>
        <select name="parse">
          {parse === "1" &&
            parseValue16.map((e) => (
              <option value={e} key={e}>
                {e}
              </option>
            ))}
          {parse === "2" &&
            parseValue32.map((e) => (
              <option value={e} key={e}>
                {e}
              </option>
            ))}
          {parse === "4" &&
            parseValue64.map((e) => (
              <option value={e} key={e}>
                {e}
              </option>
            ))}
        </select>
      </td>
      <td>
        <input
          type="number"
          name="scale"
          step="any"
          defaultValue={1}
          data-type="number"
        />
      </td>
      <td>
        <input
          type="number"
          name="precision"
          defaultValue={1}
          data-type="number"
        />
      </td>
    </>
  );
}
