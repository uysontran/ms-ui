import style from "./index.module.scss";
import { useRef, useState } from "react";
import { useMutationModel } from "hooks";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

export default function CreateModel() {
  const navigate = useNavigate();
  const [type, setType] = useState("modbusChannels");
  const [channels, setChannels] = useState([]);
  const [focus, setFocus] = useState(false);
  const { mutate } = useMutationModel({
    onSuccess: () => navigate(-1),
  });
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
  function newChannel(form) {
    form.preventDefault();
    setChannels([
      ...channels,
      typeList[type].map((prop, index) => {
        if (form.target[prop].dataset.type === "number") {
          return parseFloat(form.target[prop].value);
        } else {
          return form.target[prop].value;
        }
      }),
    ]);
    console.log("reset");
    form.target.reset();
    form.target.blur();
  }
  function focusAddChannel(form) {
    newChannel(form);
    setFocus(true);
  }
  function unFocusAddChannel(form) {
    newChannel(form);
    setFocus(false);
  }
  function editChannel(form, index) {
    form.preventDefault();
    channels[index] = typeList[type].map((prop, index) => {
      if (form.target[prop].dataset.type === "number") {
        return parseFloat(form.target[prop].value);
      } else {
        return form.target[prop].value;
      }
    });
    setChannels(channels);
  }
  function createModel() {
    const data = {
      name: form1.current.name.value,
      manufacture: form1.current.manufacture.value,
      type: type,
      channels: channels.map((channel) =>
        channel.reduce(
          (object, value, index) => ({
            ...object,
            [typeList[type][index]]: value,
          }),
          {}
        )
      ),
    };
    mutate(data);
  }
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
      <div className={style.tableContainer}>
        <div className={style.table}>
          <div className={style.tr}>
            {tableHead[type].map((head, index) => (
              <div key={"tableHead" + index} className={style.td}>
                <div>{head}</div>
              </div>
            ))}
          </div>
          {channels.map((channel, index) => (
            <form
              className={style.tr}
              key={"channels" + index}
              onSubmit={(form) => {
                editChannel(form, index);
              }}
              onBlur={(form) => {
                editChannel(form, index);
              }}
            >
              <AddModbusChannel channel={channel} />
              <input type="submit" hidden />
            </form>
          ))}
          <form
            className={clsx([
              style.tr,
              style.addRow,
              focus && style.addRowactive,
            ])}
            onSubmit={newChannel}
            onFocus={focusAddChannel}
            onBlur={unFocusAddChannel}
          >
            <AddRow />
            <input type="submit" hidden />
          </form>
          <button className={style.next} onClick={createModel}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
function AddRow({ type }) {
  switch (type) {
    default:
      return <AddModbusChannel />;
  }
}
function AddModbusChannel({ channel = ["", "03", "", "1", "Int16BE", 1, 1] }) {
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
      <div className={style.td}>
        <input
          type="text"
          name="channel_name"
          defaultValue={channel[0]}
          required={true}
        />
      </div>
      <div className={style.td}>
        <select name="fc" defaultValue={channel[1]}>
          <option value="03">03</option>
        </select>
      </div>
      <div className={style.td}>
        <input
          type="text"
          name="addr"
          defaultValue={channel[2]}
          required={true}
        />
      </div>
      <div className={style.td}>
        <select
          name="quantity"
          onChange={(e) => setParse(e.target.value)}
          data-type="number"
          defaultValue={channel[3]}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="4">4</option>
        </select>
      </div>
      <div className={style.td}>
        <select name="parse" defaultValue={channel[4]}>
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
      </div>
      <div className={style.td}>
        <input
          type="number"
          name="scale"
          step="any"
          defaultValue={channel[5] || 1}
          data-type="number"
        />
      </div>
      <div className={style.td}>
        <input
          type="number"
          name="precision"
          defaultValue={channel[6] || 1}
          data-type="number"
        />
      </div>
    </>
  );
}
