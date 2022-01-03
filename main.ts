import {ControlCommand, Mower} from "./src/mower/Mower";
import {Direction, PositionWithOrientation} from "./src/Position";
import {Position} from "./src/Position";
import {Surface} from "./src/lawn/Surface";
import eventEmitter from "./src/events/event-emitter";
import {MowerController} from "./src/controller/MowerController";

const mower = new Mower("1", new PositionWithOrientation(new Position(1,2), Direction.N))
const surface = new Surface(new Position(0,0), new Position(5,5))
mower.setSurfaceToMow(surface)

let output
let previousPositionWithOrientation = new PositionWithOrientation(new Position(1,2), Direction.N)
eventEmitter.onCommand((id: string, command: ControlCommand) => {
    // output += ` -> ${ControlCommand[command]}`
})

eventEmitter.onRotate((id: string, previousDirection, nextDirection ) => {
    // output += ` -> (${previousPositionWithOrientation.position.x}, ${previousPositionWithOrientation.position.y}, ${Direction[nextDirection]})`
    previousPositionWithOrientation.direction = nextDirection
})

eventEmitter.onMove((id: string, previousPosition, nextPosition ) => {
    // output += ` -> (${nextPosition.x}, ${nextPosition.y}, ${Direction[previousPositionWithOrientation.direction]})`
    output = `${nextPosition.x} ${nextPosition.y} ${Direction[previousPositionWithOrientation.direction]}`
    previousPositionWithOrientation.position = new Position(nextPosition.x, nextPosition.y)
})

eventEmitter.onEndProcessing(() => {
    console.log(output)
})
eventEmitter.onStartProcessing((id, positionWithOrientation) => {
    previousPositionWithOrientation = new PositionWithOrientation(
        new Position(positionWithOrientation.position.x, positionWithOrientation.position.y),
        positionWithOrientation.direction
    )
    // output = `Mower(${id}): `
    // output += `(${positionWithOrientation.position.x}, ${positionWithOrientation.position.y}, ${Direction[positionWithOrientation.direction]})`
    output = ''
})

const main = async () => {
    const file = process.argv[2]
    if (!file) {
        throw new Error("You should provide an instruction file")
    }
    const mowerController = new MowerController(process.argv[2])
    await mowerController.start()
}

main()