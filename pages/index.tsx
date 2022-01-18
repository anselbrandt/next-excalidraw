import type { NextPage } from "next";
import { useState, useEffect, useRef } from "react";
import {
  ExcalidrawImperativeAPI,
  ExcalidrawProps,
} from "@excalidraw/excalidraw/types/types";
import { initialData } from "../initialData";

const Home: NextPage = () => {
  const [height, setHeight] = useState<string>();
  const [Utils, setUtils] = useState<any>(null);
  const [Excalidraw, setExcalidraw] = useState<any>(null);
  const ref = useRef<ExcalidrawImperativeAPI>();
  const [viewModeEnabled, setViewModeEnabled] = useState(false);
  const [zenModeEnabled, setZenModeEnabled] = useState(false);
  const [gridModeEnabled, setGridModeEnabled] = useState(false);
  const [exportWithDarkMode, setExportWithDarkMode] = useState(false);

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

  useEffect(() => {
    import("@excalidraw/utils").then((comp) => {
      setUtils(comp);
    });
  }, []);

  const updateScene = () => {
    const sceneData = {
      elements: [
        {
          type: "rectangle",
          version: 141,
          versionNonce: 361174001,
          isDeleted: false,
          id: "oDVXy8D6rom3H1-LLH2-f",
          fillStyle: "hachure",
          strokeWidth: 1,
          strokeStyle: "solid",
          roughness: 1,
          opacity: 100,
          angle: 0,
          x: 100.50390625,
          y: 93.67578125,
          strokeColor: "#c92a2a",
          backgroundColor: "transparent",
          width: 186.47265625,
          height: 141.9765625,
          seed: 1968410350,
          groupIds: [],
        },
      ],
      appState: {
        viewBackgroundColor: "#edf2ff",
      },
    };
    ref.current.updateScene(sceneData);
  };

  const handleReset = () => {
    ref.current.resetScene();
  };

  const handleSetViewMode = () => setViewModeEnabled(!viewModeEnabled);

  const handleSetZenMode = () => setZenModeEnabled(!zenModeEnabled);

  const handleSetGridMode = () => setGridModeEnabled(!gridModeEnabled);

  const handleExportWithDarkMode = () =>
    setExportWithDarkMode(!exportWithDarkMode);

  const handleExportToSVG = async () => {
    if (typeof document !== "undefined") {
      const svg = await Utils.exportToSvg({
        elements: ref.current.getSceneElements(),
        appState: {
          ...initialData.appState,
          exportWithDarkMode,
          width: 300,
          height: 100,
        },
        embedScene: true,
      });
      console.log(svg);
    }
  };

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
      <button className="update-scene" onClick={updateScene}>
        Update Scene
      </button>
      <button className="reset-scene" onClick={handleReset}>
        Reset Scene
      </button>
      <label>
        <input
          type="checkbox"
          checked={viewModeEnabled}
          onChange={handleSetViewMode}
        />
        View mode
      </label>
      <label>
        <input
          type="checkbox"
          checked={zenModeEnabled}
          onChange={handleSetZenMode}
        />
        Zen mode
      </label>
      <label>
        <input
          type="checkbox"
          checked={gridModeEnabled}
          onChange={handleSetGridMode}
        />
        Grid mode
      </label>
      <button onClick={handleExportToSVG}>Export to SVG</button>
      <label>
        <input
          type="checkbox"
          checked={exportWithDarkMode}
          onChange={handleExportWithDarkMode}
        />
        Export with dark mode
      </label>
      {Excalidraw && (
        <Excalidraw
          ref={ref}
          initialData={initialData}
          viewModeEnabled={viewModeEnabled}
          zenModeEnabled={zenModeEnabled}
          gridModeEnabled={gridModeEnabled}
        />
      )}
    </div>
  );
};

export default Home;
