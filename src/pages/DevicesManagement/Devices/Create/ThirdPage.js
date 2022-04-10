import { downProtocol } from "constants/protocolList";
import style from "./ThirdPage.module.scss";
import { useState } from "react";
export default function SecondPage({ setIndex, submitData, setSubmitData }) {
  const [protocol, setProtocol] = useState(Object.keys(downProtocol)[0]);
  return (
    <div className={style.container}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIndex(2);
        }}
      >
        <div className={style.select}>
          <div>Chose protocol to upload data</div>
          <select
            name="downProtocol"
            onChange={(e) => {
              setProtocol(e.target.value);
            }}
            value={protocol}
          >
            {Object.keys(downProtocol).map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select>
        </div>
        {downProtocol[protocol].map((ptc, index) => (
          <div className={style.select}>
            <div>{ptc.name}</div>
            <input name={ptc.name} type="text" />
          </div>
        ))}
        <input type="submit" value="Create" className={style.submit} />
      </form>
    </div>
  );
}
