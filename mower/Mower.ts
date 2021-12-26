import {Surface} from "./Surface";
import {Direction, PositionWithOrientation} from "./position";
import {Position} from "./Position";

export enum ControlCommand {
    R, L, F
}

type DirectionCommand = ControlCommand.R | ControlCommand.L

export class Mower {
    private _surfaceToMaw: Surface;
    private readonly _positionWithOrientation: PositionWithOrientation;
    private readonly _id: string;

    constructor(id, positionWithOrientation: PositionWithOrientation) {
        this._id = id
        this._positionWithOrientation = positionWithOrientation;
    }

    public get positionWithOrientation() {
        return this._positionWithOrientation
    }

    public setSurfaceToMow(surfaceToMow: Surface) {
        if (!surfaceToMow.isInside(this._positionWithOrientation.position)) {
            throw new Error('The mower should be positioned inside the surface to mow')
        }
        this._surfaceToMaw = surfaceToMow;
    }

    changeOrientation(command: DirectionCommand) {
        if (command === ControlCommand.R) {
            this.rotateRight();
        } else {
            this.rotateLeft();
        }
    }

    private rotateLeft() {
        switch (this.positionWithOrientation.direction) {
            case Direction.N:
                this.positionWithOrientation.direction = Direction.W
                break
            case Direction.E:
                this.positionWithOrientation.direction = Direction.N
                break
            case Direction.S:
                this.positionWithOrientation.direction = Direction.E
                break
            case Direction.W:
                this.positionWithOrientation.direction = Direction.S
                break
        }
    }

    private rotateRight() {
        switch (this.positionWithOrientation.direction) {
            case Direction.N:
                this.positionWithOrientation.direction = Direction.E
                break
            case Direction.E:
                this.positionWithOrientation.direction = Direction.S
                break
            case Direction.S:
                this.positionWithOrientation.direction = Direction.W
                break
            case Direction.W:
                this.positionWithOrientation.direction = Direction.N
                break
        }
    }

    moveForwardIfPossible() {
        let nextPosition: Position;
        switch (this.positionWithOrientation.direction) {
            case Direction.N:
                nextPosition = new Position(
                    this.positionWithOrientation.position.x, this.positionWithOrientation.position.y + 1)
                break
            case Direction.S:
                nextPosition = new Position(
                    this.positionWithOrientation.position.x, this.positionWithOrientation.position.y - 1)
                break
            case Direction.W:
                nextPosition = new Position(
                    this.positionWithOrientation.position.x - 1, this.positionWithOrientation.position.y)
                break
            case Direction.E:
                nextPosition = new Position(
                    this.positionWithOrientation.position.x + 1, this.positionWithOrientation.position.y)
                break
        }
        const canMoveForward = this._surfaceToMaw.isInside(nextPosition)
        if (canMoveForward) {
            this.positionWithOrientation.position = nextPosition;
        } else {
            console.log("Can't move outside surface to mow")
        }
    }

    public processCommand(command: ControlCommand) {
        switch (command) {
            case ControlCommand.R:
            case ControlCommand.L:
                this.changeOrientation(command)
                break
            case ControlCommand.F:
                this.moveForwardIfPossible()
        }
    }

    public processCommands(commands: Array<ControlCommand>) {
        commands.forEach(command => this.processCommand(command))
    }
}