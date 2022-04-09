import { upProtocol } from "constants/protocolList";
import style from "./SecondPage.module.scss";
import { useState } from "react";
export default function SecondPage() {
  const [protocol, setProtocol] = useState(Object.keys(upProtocol)[0]);
  return (
    <div className={style.secondPage}>
      <form>
        <div>
          <div>Chose protocol to upload data</div>
          <select
            name="upProtocol"
            onChange={(e) => {
              setProtocol(e.target.value);
            }}
            value={protocol}
          >
            {Object.keys(upProtocol).map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}
