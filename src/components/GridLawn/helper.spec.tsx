import {isCurrentCell, isVisited} from "./helper";

describe('GridLawn isCurrentCell',  () => {
    
    it.each`
        nbRow   | nbCol | row   | col   | cellIndex | result
        ${5}    | ${5}  | ${0}  | ${0}  | ${0}      | ${true}     
        ${5}    | ${5}  | ${4}  | ${4}  | ${24}     | ${true}     
        ${5}    | ${5}  | ${4}  | ${2}  | ${22}     | ${true}     
        ${6}    | ${3}  | ${1}  | ${0}  | ${3}      | ${true}     
        ${3}    | ${2}  | ${2}  | ${0}  | ${5}      | ${false}     
        ${2}    | ${3}  | ${1}  | ${2}  | ${4}      | ${false}     
    `  ('should return $result for cell ($row, $col} for grid of $nbRow x $nbCol and index $cellIndex', ({nbRow, nbCol, row, col, cellIndex, result}) => {
        expect(isCurrentCell(nbRow, nbCol, {rowIndex: row, colIndex: col}, cellIndex))
            .toEqual(result)
    });

    it('should throw an error if cell index is outside grid', () => {
        expect(() => isCurrentCell(5,5, {rowIndex: 0, colIndex: 0}, 25))
            .toThrowError("25 is outside of grid of 5 * 5")
    });

    it('should throw an error if cell is outside grid', () => {
        expect(() => isCurrentCell(5,5, {rowIndex:5, colIndex: 3}, 10))
            .toThrowError("Visited cell (5, 3) is outside of grid of 5 * 5")
    });

});

describe('GridLawn isVisited',  () => {

    it.each`
        nbRow   | nbCol | visitedCells   | cellIndex | result
        ${5}    | ${5}  | ${[]}          | ${0}      | ${false}     
        ${5}    | ${5}  | ${undefined}   | ${0}      | ${false}     
        ${5}    | ${5}  | ${null}        | ${0}      | ${false}     
        ${5}    | ${5}  | ${[{rowIndex: 0, colIndex: 0}]}          | ${0}      | ${true}     
    `  ('should return $result for index $cellIndex and a grid of $nbRow x $nbCol and visitedCells $visitedCells', ({nbRow, nbCol, visitedCells, cellIndex, result}) => {
        expect(isVisited(nbRow, nbCol, visitedCells, cellIndex))
            .toEqual(result)
    });
});