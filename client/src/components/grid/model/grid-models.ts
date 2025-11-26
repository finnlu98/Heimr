import { Widget } from "../../widgets/model/wigets";

export type GridItem = {
  id: string;
  position: Position;
  box: Box
  widget: Widget
};

export type Rect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export interface Position {
  x: number;
  y: number;
}

export interface Box {
  cols: number;
  rows: number
}

export interface GridMetaData {
  width: number,
  height: number
  cellSize: number
  columns: number
  gap: number
}


export interface PreviewState  {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}