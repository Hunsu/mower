import {Cell} from "./GridLawn";

export const isCurrentCell = (nbRow: number, nbCol: number, currentCell: Cell, cellIndex: number): boolean => {
    if (cellIndex > nbRow * nbCol -1) {
        throw Error(`${cellIndex} is outside of grid of ${nbRow} * ${nbCol}`)
    }
    const currentCellIndex = Math.abs(currentCell.rowIndex) * nbCol + Math.abs(currentCell.colIndex)
    if (currentCellIndex > nbRow * nbCol -1) {
        throw Error(`Visited cell (${currentCell.rowIndex}, ${currentCell.colIndex}) is outside of grid of ${nbRow} * ${nbCol}`)
    }
    return cellIndex === currentCellIndex;
}

export const isVisited = (nbRow: number, nbCol: number, visitedCells: Cell[], cellIndex: number): boolean => {
    if (!visitedCells) {
        return false;
    }
    for(let cell of visitedCells) {
        const index = Math.abs(cell.rowIndex) * nbCol + Math.abs(cell.colIndex)
        if (cellIndex === index) {
            return true
        }
    }
    return false
}