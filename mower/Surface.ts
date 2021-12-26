import {Position} from "./Position";

export class Surface {
    private readonly _upperRight: Position;
    private readonly _lowerLeft: Position;

    constructor(lowerLeft: Position, upperRight: Position) {
        if (upperRight.x < lowerLeft.x || upperRight.y < lowerLeft.y) {
            throw new Error("Wrong positions are provided")
        }
        this._lowerLeft = lowerLeft;
        this._upperRight = upperRight;
    }

    public get upperRight() {
        return this._upperRight
    }

    public get lowerLeft() {
        return this._lowerLeft
    }

    isInside(position: Position) {
        return position.x >= this.lowerLeft.x &&
            position.x <= this.upperRight.x &&
            position.y >= this.lowerLeft.y &&
            position.y <= this.upperRight.y;
    }
}