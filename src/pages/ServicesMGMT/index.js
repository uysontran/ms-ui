// import style from "./index.module.scss";
// import Table from "components/Tables";
// import { useServiceInfo, useSocket } from "hooks";
// import { useState } from "react";
// import ServiceDetail from "./ServiceDetail";
// export default function ServicesMGMT() {
//   const { data = [] } = useServiceInfo();
//   const [select, setSelect] = useState([]);
//   const [displayTable, setDisPlayTable] = useState(null);
//   const [open, setOpen] = useState(false);
//   const performance = useSocket("MSPerformance");
//   // const performance = [];
//   const tableHead = [
//     { id: "name", numberic: false, label: "name" },
//     { id: "type", numberic: false, label: "type" },
//     { id: "status", numberic: false, label: "status" },
//     { id: "memory", numberic: true, label: "memory" },
//     { id: "cpu", numberic: true, label: "cpu" },
//   ];
//   const tableData = data.map((row) => {
//     row.memory = (
//       (performance.find((e) => e.name === row.name)?.monit?.memory || 0) /
//       (1024 * 1024)
//     ).toFixed(2);
//     row.cpu = performance.find((e) => e.name === row.name)?.monit?.cpu || 0;
//     return {
//       onClick: function () {
//         setDisPlayTable(row);
//         setOpen(true);
//       },
//       name: {
//         value: <div>{row.name}</div>,
//         key: row.name,
//       },
//       type: {
//         value: <div>{row.type}</div>,
//         key: row.type,
//       },
//       status: {
//         value: <div>{row.status}</div>,
//         key: row.status,
//       },
//       memory: {
//         value: <div>{row.memory}</div>,
//         key: row.memory,
//       },
//       cpu: {
//         value: <div>{row.cpu}</div>,
//         key: row.cpu,
//       },
//     };
//   });

//   return (
//     <div className={style.container}>
//       <h1>Services Management</h1>

//       <Table head={tableHead} select={[select, setSelect]} data={tableData} />
//       {displayTable !== null && (
//         <ServiceDetail
//           service={displayTable}
//           open={open}
//           onClose={() => setOpen(false)}
//         />
//       )}
//     </div>
//   );
// }

export default function Home() {
  return <div>This is Home</div>;
}
