import { useState } from "react";
import Popup from "reactjs-popup";
import style from "./ServiceDetail.module.scss";
import Table from "components/Tables";
export default function ServiceDetail({
  trigger,
  service,
  open = false,
  onClose,
}) {
  const [tab, setTab] = useState(1);
  const getAttribute = service.RESTAttributes.find((e) => e.type === "get");
  const setAttribute = service.RESTAttributes.find((e) => e.type === "set");
  const protocolConfig = service.ServiceMetaDatas.filter(
    (e) => e.kind === "ProtocolConfig"
  );
  const ModelChannels = service.ServiceMetaDatas.filter(
    (e) => e.kind === "ModelChannel"
  );
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
          <div className={style.navigate}>
            <div
              onClick={() => {
                setTab(1);
              }}
              style={{
                color:
                  tab === 1
                    ? "var(--navigate-active)"
                    : "var(--navigate-inactive)",
                borderBottom:
                  tab === 1 ? "3px solid var(--navigate-active)" : "none",
              }}
            >
              General
            </div>
            <div
              onClick={() => {
                setTab(2);
              }}
              style={{
                color:
                  tab === 2
                    ? "var(--navigate-active)"
                    : "var(--navigate-inactive)",
                borderBottom:
                  tab === 2 ? "3px solid var(--navigate-active)" : "none",
              }}
            >
              Protocol Attribute
            </div>
            {service.type === "downService" && (
              <div
                onClick={() => {
                  setTab(3);
                }}
                style={{
                  color:
                    tab === 3
                      ? "var(--navigate-active)"
                      : "var(--navigate-inactive)",
                  borderBottom:
                    tab === 3 ? "3px solid var(--navigate-active)" : "none",
                }}
              >
                Channel Attribute
              </div>
            )}
          </div>
          <div className={style.body}>
            {tab === 1 && (
              <>
                <div className={style.bodyRow}>
                  <div>name</div> <div>{service.name}</div>
                </div>
                <div className={style.bodyRow}>
                  <div>type</div> <div>{service.type}</div>
                </div>
                <div className={style.bodyRow}>
                  <div>path</div> <div>{service.path}</div>
                </div>
                <div className={style.bodyRow}>
                  <div>status</div>
                  <div>{service.status}</div>
                </div>
                <div className={style.bodyRow}>
                  <div>startup</div>
                  <div>{JSON.stringify(service.runOnStartUp)}</div>
                </div>
                {getAttribute && (
                  <>
                    <h4>REST set method</h4>
                    <div className={style.bodyRow}>
                      <div>method</div> <div>{getAttribute.method}</div>
                    </div>
                    <div className={style.bodyRow}>
                      <div>host</div>
                      <div>{getAttribute.host}</div>
                    </div>
                    <div className={style.bodyRow}>
                      <div>path</div> <div>{getAttribute.path}</div>
                    </div>
                  </>
                )}
                {setAttribute && (
                  <>
                    <h4>REST get method</h4>
                    <div className={style.bodyRow}>
                      <div>method</div> <div>{setAttribute.method}</div>
                    </div>
                    <div className={style.bodyRow}>
                      <div>host</div> <div>{setAttribute.host}</div>
                    </div>
                    <div className={style.bodyRow}>
                      <div>path</div> <div>{setAttribute.path}</div>
                    </div>
                  </>
                )}
              </>
            )}
            {tab === 2 && (
              <>
                <ProtocolConfigTable data={protocolConfig} />
              </>
            )}
            {tab === 3 && (
              <div>
                <ProtocolConfigTable data={ModelChannels} />{" "}
              </div>
            )}
          </div>
        </div>
      )}
    </Popup>
  );
}
function ProtocolConfigTable({ data }) {
  const [select, setSelect] = useState([]);
  function isNumber(value) {
    return typeof value === "number" && isFinite(value);
  }
  const channels = data;
  const tableHead = Object.keys(channels[0])
    .filter(
      (e) =>
        e !== "kind" && e !== "MicroserviceID" && e !== "id" && e !== "values"
    )
    .map((e) => ({
      id: e,
      numberic: isNumber(channels[0][e]),
      label: e,
      isSort: false,
    }));
  const tableBody = channels.map((channel) =>
    Object.keys(channel).reduce(
      (object, value) => ({
        ...object,
        [value]: {
          value:
            typeof channel[value] === "string"
              ? channel[value]
              : JSON.stringify(channel[value]),
          key: channel[value],
        },
      }),
      {}
    )
  );
  return (
    <div className={style.content}>
      <Table
        head={tableHead}
        select={[select, setSelect]}
        data={tableBody}
        // classes={{
        //   head: { name: style.head, default: true },
        // }}
      />
    </div>
  );
}
