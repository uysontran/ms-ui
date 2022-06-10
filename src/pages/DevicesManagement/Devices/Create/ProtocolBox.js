import Popup from "reactjs-popup";
import style from "./ProtocolBox.module.scss";
import { useMutateProtocol } from "hooks";
export default function ProtocolBox({ trigger, data, open = false, onClose }) {
  const { mutate } = useMutateProtocol({
    onSuccess: () => {
      console.log("success");
      window.location.reload();
    },
  });
  return (
    <Popup
      trigger={trigger}
      modal
      contentStyle={{ backgroundColor: "white" }}
      open={open}
      onClose={onClose}
    >
      {(close) => (
        <div className={style.container}>
          <form
            onSubmit={(elemet) => {
              elemet.preventDefault();
              [{ type: "STRING", key: "name" }, ...data].map((e) => ({
                [e.key]: elemet.target[e.key].value,
              }));

              const packet = [{ type: "STRING", key: "name" }, ...data]
                .map((e) => ({
                  [e.key]: elemet.target[e.key].value,
                }))
                .reduce((a, b) => ({ ...a, ...b }), {});
              packet.MicroserviceID = data[0]?.MicroserviceID;
              mutate(packet);
              close();
            }}
          >
            <div className={style.header}>Create new config</div>
            {[{ type: "STRING", key: "name" }, ...data].map((e) => {
              switch (e.type) {
                case "ENUM":
                  return (
                    <div className={style.row} key={e.key}>
                      <span>{e.key}</span>
                      <select name={e.key} defaultValue={e.defaultValue}>
                        {JSON.parse(e.values).map((e) => (
                          <option key={e} value={e}>
                            {e}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                default:
                  return (
                    <div className={style.row} key={e.key}>
                      <span>{e.key}</span>
                      <input
                        type="text"
                        name={e.key}
                        defaultValue={e.defaultValue}
                      />
                    </div>
                  );
              }
            })}
            <div className={style.footer}>
              <input
                type="submit"
                value="Create"
                className={style.buttonHolder}
              />
            </div>
          </form>
        </div>
      )}
    </Popup>
  );
}
