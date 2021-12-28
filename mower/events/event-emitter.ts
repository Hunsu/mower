import EventEmitter from "events";
import {ControlCommand} from "../Mower";
import {Direction, PositionWithOrientation} from "../position";
import {Position} from "../position";

type CommandListener = (id: string, command: ControlCommand) => void
type RotateListener = (id: string, previousDirection: Direction, nextDirection: Direction) => void
type MoveListener = (id: string, previousPosition: Position, nextPosition: Position) => void
type EndProcessingListener = (id: string) => void
type StartProcessingListener = (id: string, positionWithOrientation: PositionWithOrientation ) => void

class MowerEventEmitter extends EventEmitter {

    public onRotate(listener: RotateListener): this {
        return super.on('rotate', listener)
    }

    public onMove(listener: MoveListener): this {
        return super.on('move', listener)
    }

    public onCommand(listener: CommandListener): this {
        return super.on('command', listener)
    }

    public onEndProcessing(listener: EndProcessingListener): this {
        return super.on('end-processing', listener)
    }

    public onStartProcessing(listener: StartProcessingListener): this {
        return super.on('start-processing', listener)
    }

    public emitCommandEvent(id: string, command: ControlCommand): boolean {
        return super.emit('command', id, command);
    }

    public emitRotateEvent(id: string, previousDirection: Direction, nextDirection: Direction): boolean {
        return super.emit('rotate', id, previousDirection, nextDirection);
    }

    public emitMoveEvent(id: string, previousPosition: Position, nextPosition: Position): boolean {
        return super.emit('move', id, previousPosition, nextPosition);
    }

    public emitEndProcessingEvent(id: string): boolean {
        return super.emit('end-processing', id);
    }

    emitStartProcessingEvent(id: string, positionWithOrientation: PositionWithOrientation) {
        return super.emit('start-processing', id, positionWithOrientation)
    }
}

export default new MowerEventEmitter()