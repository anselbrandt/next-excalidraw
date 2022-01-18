import type { NextPage } from "next";
import { useState, useEffect, useRef } from "react";
import {
  ExcalidrawImperativeAPI,
  ExcalidrawProps,
} from "@excalidraw/excalidraw/types/types";
const Home: NextPage = () => {
  const [height, setHeight] = useState<string>();
  const [Excalidraw, setExcalidraw] = useState<any>(null);
  const ref = useRef<ExcalidrawImperativeAPI>();

  useEffect(() => {
    function handleResize() {
      setHeight(`${window.innerHeight - 500}px`);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    import("@excalidraw/excalidraw").then((comp) => {
      setExcalidraw(comp.default);
    });
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {Excalidraw && <Excalidraw ref={ref} />}
    </div>
  );
};

export default Home;
