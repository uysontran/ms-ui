import Popup from "reactjs-popup";
import style from "./CreateChannel.module.scss";
export default function CreateChannel({
  trigger,
  service,
  open = false,
  onClose,
  setChannels,
  channelAttrs,
}) {
  return (
    <Popup
      trigger={trigger}
      modal
      contentStyle={{ backgroundColor: "white" }}
      open={open}
      onClose={onClose}
    >
      {(close) => (
        <form
          className={style.container}
          onSubmit={(e) => {
            e.preventDefault();
            const channel = channelAttrs
              .map((ele, i) => ({
                [ele.key]: e.target[i].value,
              }))
              .reduce((a, b) => ({ ...a, ...b }), {});
            setChannels((channels) => [...channels, channel]);
            close();
          }}
        >
          <div className={style.header}>Create new channel</div>
          {channelAttrs.map((e) => {
            switch (e.type) {
              case "ENUM":
                return (
                  <div className={style.row}>
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
                  <div className={style.row}>
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
      )}
    </Popup>
  );
}
