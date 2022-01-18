import { ImportedDataState } from "@excalidraw/excalidraw/types/data/types";
import { drawingElements } from "./drawingElements";
import { newLibrary } from "./newLibrary";

export const initialData: ImportedDataState = {
  elements: drawingElements,
  appState: {
    gridSize: null,
    viewBackgroundColor: "#ffffff",
  },
  scrollToContent: true,
  libraryItems: newLibrary,
};
