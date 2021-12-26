import {Position} from "./Position";

export enum Direction {
    N,
    E,
    W,
    S
}

export class PositionWithOrientation {
    private _position: Position;
    private _direction: Direction;

    constructor(position: Position, direction: Direction) {
        this._position = position;
        this._direction = direction;
    }

    public get position() {
        return this._position
    }

    public get direction() {
        return this._direction
    }

    public set position(position) {
        this._position = position
    }

    public set direction(direction: Direction) {
        this._direction = direction
    }
}