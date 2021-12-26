import fs from 'fs'
import es from 'event-stream'
import {Surface} from "../Surface";
import {Position} from "../position";
import {parseCommands, parseCoordinates, parseCoordinatesWithDirection} from "../parser";
import {Mower} from "../Mower";

const createMowerFromLine = (id, line) => {
    return new Mower(id, parseCoordinatesWithDirection(line))
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
                if (lineNumber === 0) {
                    this._surfaceToMow = new Surface(new Position(0, 0), parseCoordinates(line))
                } else if (lineNumber % 2 === 1) {
                    this.mowers.push(createMowerFromLine(this.mowers.length.toString(), line))
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