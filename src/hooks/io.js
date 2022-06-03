import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
export function useSocket(topic) {
  const IO = useRef(io());
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log("");
    IO.current.on("connect", () => {
      IO.current.emit(topic, true);
      IO.current.on(topic, (data) => {
        setData(data);
      });
    });
    return () => {};
  }, [IO, topic]);
  return data;
}
