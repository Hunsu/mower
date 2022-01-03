import {useEffect, useState} from "react"
import {Direction, Position, PositionWithOrientation} from "../../Position";
import GridLawn from "../GridLawn";
import {Mower} from "../../mower/Mower";
import {Surface} from "../../lawn/Surface";
import {parseCommands} from "../../parser";
import eventEmitter from "../../events/event-emitter";

const GridLawnController = () => {
    const [currentCell, setCurrentCell] = useState({
        cell: {rowIndex: -4, colIndex: 0},
        direction: Direction.E
    });
    let initialPosition = new PositionWithOrientation(new Position(0, -4), Direction.E)
    const [visitedCells, ] = useState([])
    let positions = [new PositionWithOrientation(new Position(0, -4), Direction.E)]
    let current = 0;
    useEffect(() => {
        (async () => {
            const mower = new Mower("1", initialPosition)
            mower.setSurfaceToMow(new Surface(new Position(0, -4), new Position(4, 0)))
            eventEmitter.onRotate((id: string, previousDirection, nextDirection) => {
                const position = positions[positions.length - 1].position
                positions.push(new PositionWithOrientation(new Position(position.x, position.y), nextDirection))
            })

            eventEmitter.onMove(async (id: string, previousPosition, nextPosition) => {
                const direction = positions[positions.length - 1].direction
                positions.push(new PositionWithOrientation(new Position(nextPosition.x, nextPosition.y), direction))
            })
            const timerID = setInterval(() => {
                if (current < positions.length) {
                    const position = positions[current];
                    if (current > 0) {
                        visitedCells.push(
                            {
                                colIndex: positions[current -1].position.x,
                                rowIndex: positions[current -1].position.y,
                            }
                        )
                    }
                    setCurrentCell({
                        cell: {
                            colIndex: position.position.x,
                            rowIndex: position.position.y,
                        },
                        direction: position.direction
                    })
                    current++
                }
            }, 1000);
            await mower.processCommands(parseCommands("FFLFRFF"))
            return function cleanup() {
                clearInterval(timerID);
            };
        })()
    }, [])

    return <GridLawn nbRow={7} nbCol={4} currentCell={currentCell} visitedCells={visitedCells}/>
}

export default GridLawnController;