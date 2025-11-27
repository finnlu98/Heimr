import { Coordinates } from "@dnd-kit/utilities";
import { GridItem, GridMetaData, PreviewState, Rect } from "../model/grid-models";
import { MoveType } from "../model/move-type";

export default class GridService {

    // is this needed?
    static computePositions(boxes: GridItem[], gridData: GridMetaData, prevGridData: GridMetaData): GridItem[] {
        // const reflowdBoxes = boxes.map((box) => {
        //     const oldCellSize = prevGridData.cellSize;
        //     const newCellSize = gridData.cellSize;

        //     const newX = Math.round((box.col * oldCellSize) / newCellSize);
        //     const newY = Math.round((box.row * oldCellSize) / newCellSize);

        //     return {
        //         ...box,
        //         position: {x: newX, y: newY}
        //     }

        // })

        return boxes
    }    
    
    static computeMove(id: string, boxes: GridItem[], moveBox: GridItem, gridData: GridMetaData, delta: Coordinates, addGap: boolean) : GridItem {
        const dxCells = Math.round(delta.x / gridData.colWidth);
        const dyCells = Math.round(delta.y / gridData.colHeight);

        let targetCol = moveBox.col + dxCells;
        let targetRow = moveBox.row + dyCells;

        // This is fishy!
        const maxCol = gridData.columns - moveBox.colSpan;
        if (maxCol >= 0) {
            targetCol = Math.max(0, Math.min(maxCol, targetCol));
        } else {
            targetCol = 0;
        }

        const maxRow = gridData.height / gridData.colHeight - moveBox.rowSpan;
        if (maxRow >= 0) {
            targetRow = Math.max(0, Math.min(maxRow, targetRow));
        } else {
            targetRow = 0;
        }

        return {...moveBox, col: targetCol, row: targetRow };
    }

    static hasCollison(moveId: string, candidate: Rect, boxes: GridItem[], gridData: GridMetaData): boolean {
        boxes.some((item) => {
            if (item.id === moveId) 
                return true;
        
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
        return !(
            a.right <= b.left || 
            a.left >= b.right || 
            a.bottom <= b.top || 
            a.top >= b.bottom    
        );
    }

    static computeResize(moveBox: GridItem, gridData: GridMetaData, delta: Coordinates): GridItem {
        const deltaCols = Math.round(delta.x / gridData.colWidth);
        const deltaRows = Math.round(delta.y / gridData.colHeight);
        const newCols = Math.max(1, moveBox.colSpan + deltaCols);
        const newRows = Math.max(1, moveBox.rowSpan + deltaRows);
        return { ...moveBox, colSpan: newCols, rowSpan: newRows };
    }

    static computeShadow(id: string, boxes: GridItem[], moveBox: GridItem, gridData: GridMetaData, delta: Coordinates, moveType: MoveType): PreviewState | undefined {
        var shadowBox: GridItem | null = null;
        
        if(moveType === MoveType.move)
            shadowBox = this.computeMove(id, boxes, moveBox, gridData, delta, false)
        
        if(moveType === MoveType.resize)
            shadowBox = this.computeResize(moveBox, gridData, delta)

        if(shadowBox) {
            return {id: id, col: shadowBox.col, row: shadowBox.row, colSpan: shadowBox.colSpan, rowSpan: shadowBox.rowSpan}
        }

        return undefined;
    }
}