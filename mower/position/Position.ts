export class Position {
    private readonly _y: number;
    private readonly _x: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public get x() {
        return this._x;
    }

    public get y() {
        return this._y;
    }
}