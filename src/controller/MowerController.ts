import fs from 'fs'
import es from 'event-stream'
import {Position, Surface} from "../lawn";
import {parseCommands, parseCoordinates, parseCoordinatesWithDirection} from "../parser";
import {Mower} from "../mower/Mower";

const createMowerFromLine = (id, line, origin: Position) => {
    return new Mower(id, parseCoordinatesWithDirection(line, origin))
}

export class MowerController {
    private _fileInstructionPath;
    private _surfaceToMow: Surface;
    private mowers: Array<Mower> = []

    constructor(fileInstructionPath: string) {
        if (!fs.existsSync(fileInstructionPath)) {
            throw new Error(`File ${fileInstructionPath} does not exist`)
        }
        this._fileInstructionPath = fileInstructionPath;
    }

    public start(): Promise<void> {
        return new Promise((resolve, reject) => {
            let lineNumber = -1;
            fs.createReadStream(this._fileInstructionPath)
                .pipe(es.split())
                .pipe(es.mapSync(async line => {
                    lineNumber++
                    let lowerLeftPosition = new Position(0, 0);
                    if (lineNumber === 0) {
                        this._surfaceToMow = new Surface(lowerLeftPosition, parseCoordinates(line))
                    } else if (lineNumber % 2 === 1) {
                        this.mowers.push(createMowerFromLine(this.mowers.length.toString(), line, lowerLeftPosition))
                    } else {
                        const mower = this.mowers[this.mowers.length - 1];
                        mower.setSurfaceToMow(this._surfaceToMow)
                        await mower.processCommands(parseCommands(line))
                    }
                }))
                .on('error', (e) => {
                    reject(e)
                })
                .on('end', () => {
                    resolve()
                })
        })
    }
}