import styled from "styled-components"
import {isCurrentCell, isVisited} from './helper'
import {MowingCell} from "../MowingCell/MowingCell";
import {Direction} from "../../Position";

export interface Cell {
    rowIndex: number,
    colIndex: number
}

export interface CurrentCell {
    cell: Cell,
    direction: Direction
}

interface GridProps {
    nbCol: number,
    nbRow: number,
}

interface GridItemProps {
}

interface GridLawnProps {
    nbCol: number,
    nbRow: number,
    currentCell: CurrentCell
    visitedCells: Cell[]
}

const GridItem = styled.div<GridItemProps>`
  width: 150px;
  height: 150px;
  background-color: green;
  border: black solid 1px;
  filter: brightness(50%);
`

const CurrentGridItem = styled(MowingCell)`
  border: #0070f3 solid 2px;
`

const VisitedCell = styled(GridItem)`
  filter: brightness(85%);
`

const GridWrapper = styled.div<GridProps>`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.nbCol}, 1fr)`};
`



const GridLawn = ({nbRow, nbCol, currentCell, visitedCells}: GridLawnProps) => {
    return <GridWrapper nbCol={nbCol} nbRow={nbRow}>
        {
            new Array(nbRow * nbCol)
                .fill(undefined)
                .map((e, index) => {
                    const isVisitedCell = isVisited(nbRow, nbCol, visitedCells, index)
                    if (isVisitedCell) {
                        return <VisitedCell key={index}/>
                    }
                    const isIndexOfCurrentCell = isCurrentCell(nbRow, nbCol, currentCell.cell, index)
                    return isIndexOfCurrentCell ? <CurrentGridItem key={index} direction={currentCell.direction}/> : <GridItem key={index} />
                })
        }
    </GridWrapper>
}

export default GridLawn