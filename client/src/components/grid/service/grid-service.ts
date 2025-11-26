import { Coordinates } from "@dnd-kit/utilities";
import { GridItem, GridMetaData, PreviewState, Rect } from "../model/grid-models";
import { MoveType } from "../model/move-type";

export default class GridService {

    static computePositions(boxes: GridItem[], gridData: GridMetaData, prevGridData: GridMetaData): GridItem[] {
        const reflowdBoxes = boxes.map((box) => {
            const { x, y } = box.position;
            
            const oldCellSize = prevGridData.cellSize;
            const newCellSize = gridData.cellSize;

            const newX = Math.round((x * oldCellSize) / newCellSize);
            const newY = Math.round((y * oldCellSize) / newCellSize);
        

            return {
                ...box,
                position: {x: newX, y: newY}
            }

        })

        return reflowdBoxes
    }    
    
    static computeMove(id: string, boxes: GridItem[], moveBox: GridItem, gridData: GridMetaData, delta: Coordinates, addGap: boolean) : GridItem {
        const nextX = moveBox.position.x + delta.x;
        const nextY = moveBox.position.y + delta.y;

        const snappedX = Math.round(nextX / gridData.cellSize) * gridData.cellSize;
        const snappedY = Math.round(nextY / gridData.cellSize) * gridData.cellSize;

        const maxX = gridData.width - moveBox.box.cols * gridData.cellSize;
        const maxY = gridData.height - moveBox.box.rows * gridData.cellSize;

        var targetX = Math.min(Math.max(0, snappedX), maxX);
        var targetY = Math.min(Math.max(0, snappedY), maxY);

        const widthPx = (moveBox.box.cols * gridData.cellSize);
        const heightPx = (moveBox.box.rows * gridData.cellSize);

        const candidate: Rect = {
            left: targetX,
            top: targetY,
            right: targetX + widthPx,
            bottom: targetY + heightPx,
        };
        
        const hasCollision = this.hasCollison(id, candidate, boxes, gridData)
        
        if (hasCollision) {
            return moveBox;
        }
        
        if(addGap) {
            targetX = targetX + gridData.gap
            targetY = targetY + gridData.gap
        }
        

        return {...moveBox, position: { x: targetX, y: targetY }};
    }

    static hasCollison(moveId: string, candidate: Rect, boxes: GridItem[], gridData: GridMetaData): boolean {
        boxes.some((item) => {
            if (item.id === moveId) 
                return true;
        
            const other: Rect = {
                left: item.position.x,
                top: item.position.y,
                right: item.position.x + item.box.cols * gridData.cellSize,
                bottom: item.position.y + item.box.rows * gridData.cellSize,
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

    static computeResize(moveBox: GridItem, gridData: GridMetaData, delta: Coordinates) {
        const deltaCols = Math.round(delta.x / gridData.cellSize);
        const deltaRows = Math.round(delta.y / gridData.cellSize);

        const newCols = Math.max(1, moveBox.box.cols + deltaCols);
        const newRows = Math.max(1, moveBox.box.rows + deltaRows);

        return { ...moveBox, box: { cols: newCols, rows: newRows }};
    }

    static computeShadow(id: string, boxes: GridItem[], moveBox: GridItem, gridData: GridMetaData, delta: Coordinates, moveType: MoveType): PreviewState | undefined {
        var shadowBox: GridItem | null = null;
        
        if(moveType === MoveType.move)
            shadowBox = this.computeMove(id, boxes, moveBox, gridData, delta, false)
        
        if(moveType === MoveType.resize)
            shadowBox = this.computeResize(moveBox, gridData, delta)

        if(shadowBox) {
            var width = shadowBox.box.cols * gridData.cellSize
            var height = shadowBox.box.rows * gridData.cellSize
            return {id: id, x: shadowBox.position.x, y: shadowBox.position.y, width: width, height: height}
        }

        return undefined;
    }
}