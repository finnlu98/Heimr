import { Coordinates, Transform } from "@dnd-kit/utilities";
import { GridItem, GridMetaData, PreviewState, Rect } from "../model/grid-models";
import { MoveType } from "../model/move-type";

export default class GridService {
  static computeWidthAndHeight(
    gridItem: GridItem,
    moveTransform: Transform | null,
    gridData: GridMetaData,
    editMode: boolean,
  ): React.CSSProperties {
    const transform = moveTransform ?? { x: 0, y: 0 };

    const baseX = gridItem.col * gridData.colWidth;
    const baseY = gridItem.row * gridData.colHeight;

    const leftGap = gridItem.col !== 0 ? gridData.gap : 0;
    let finalX = baseX + transform.x + leftGap;
    let rightGap = gridItem.col !== gridData.columns - gridItem.colSpan ? gridData.gap * 2 : gridData.gap;
    rightGap = gridItem.col === 0 ? rightGap - gridData.gap : rightGap;

    let widthPx = gridItem.colSpan * gridData.colWidth - rightGap;
    let finalY = baseY + transform.y + gridData.gap;
    let heightPx = gridItem.rowSpan * gridData.colHeight - gridData.gap * 2;

    return {
      position: "absolute",
      width: widthPx,
      height: heightPx,
      cursor: editMode ? "grab" : "",
      transform: `translate(${finalX}px, ${finalY}px)`,
    };
  }

  static computeMove(
    id: string,
    boxes: GridItem[],
    moveBox: GridItem,
    gridData: GridMetaData,
    delta: Coordinates,
    addGap: boolean,
  ): GridItem {
    const dxCells = Math.round(delta.x / gridData.colWidth);
    const dyCells = Math.round(delta.y / gridData.colHeight);

    let targetCol = moveBox.col + dxCells;
    let targetRow = moveBox.row + dyCells;

    const maxCol = gridData.columns - moveBox.colSpan;
    targetCol = this.getMaxDimension(maxCol, moveBox.colSpan, targetCol);

    const maxRow = gridData.height / gridData.colHeight - moveBox.rowSpan;
    targetRow = this.getMaxDimension(maxRow, moveBox.rowSpan, targetRow);

    return { ...moveBox, col: targetCol, row: targetRow };
  }

  static getMaxDimension(maxDimension: number, boxSpan: number, boxTarget: number): number {
    return Math.max(0, Math.min(maxDimension, boxTarget));
  }

  static hasCollison(moveId: string, candidate: Rect, boxes: GridItem[], gridData: GridMetaData): boolean {
    boxes.some((item) => {
      if (item.id === moveId) return true;

      const other: Rect = {
        left: item.col * gridData.colWidth,
        top: item.row * gridData.colHeight,
        right: item.col * gridData.colWidth + item.colSpan * gridData.colWidth,
        bottom: item.row * gridData.colHeight + item.rowSpan * gridData.colHeight,
      };

      return this.rectanglesOverlap(candidate, other);
    });

    return false;
  }

  static rectanglesOverlap(a: Rect, b: Rect): boolean {
    return !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
  }

  static computeResize(moveBox: GridItem, gridData: GridMetaData, delta: Coordinates): GridItem {
    const deltaCols = Math.round(delta.x / gridData.colWidth);
    const deltaRows = Math.round(delta.y / gridData.colHeight);
    const newCols = Math.max(1, moveBox.colSpan + deltaCols);
    const newRows = Math.max(1, moveBox.rowSpan + deltaRows);
    return { ...moveBox, colSpan: newCols, rowSpan: newRows };
  }

  static computeShadow(
    id: string,
    boxes: GridItem[],
    moveBox: GridItem,
    gridData: GridMetaData,
    delta: Coordinates,
    moveType: MoveType,
  ): PreviewState | undefined {
    var shadowBox: GridItem | null = null;

    if (moveType === MoveType.move) shadowBox = this.computeMove(id, boxes, moveBox, gridData, delta, false);

    if (moveType === MoveType.resize) shadowBox = this.computeResize(moveBox, gridData, delta);

    if (shadowBox) {
      return { id: id, col: shadowBox.col, row: shadowBox.row, colSpan: shadowBox.colSpan, rowSpan: shadowBox.rowSpan };
    }

    return undefined;
  }
}
