import {MowerController} from "./MowerController";

import Crypto from 'crypto';
import {tmpdir} from 'os';
import Path from 'path';
import fs from "fs";
import eventEmitter from "../events/event-emitter";
import {Direction, Position, PositionWithOrientation} from "../lawn";

const tmpFile = (): string => {
    return Path.join
    (tmpdir(), `MowerController.instructions.${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.txt`);
}

describe('Mower controller', () => {
    it('should throw an error when provided file does not exists', () => {
        expect(() => new MowerController('/i-dont-not-exist.txt'))
            .toThrowError("File /i-dont-not-exist.txt does not exist")
    });
    it('should create a mower controller when instruction file does exist', () => {
        const filePath = tmpFile()
        fs.writeFileSync(filePath, "")
        expect(new MowerController(filePath)).toBeDefined()
    });
    it('should process instructions', async () => {
        jest.spyOn(eventEmitter, 'emitEndProcessingEvent')
        jest.spyOn(eventEmitter, 'emitStartProcessingEvent')
        const filePath = tmpFile()
        fs.writeFileSync(filePath, `5 5\n1 2 N\nLFLFLFLFF\n3 3 E\nFFRFFRFRRF`)
        const mowerController = new MowerController(filePath)

        await mowerController.start()

        expect(eventEmitter.emitStartProcessingEvent)
            .toHaveBeenNthCalledWith(1, '0', new PositionWithOrientation(
                new Position(1,2), Direction.N
            ))
        expect(eventEmitter.emitEndProcessingEvent).toHaveBeenNthCalledWith(1, '0')
        expect(eventEmitter.emitStartProcessingEvent)
            .toHaveBeenNthCalledWith(2, '1', new PositionWithOrientation(
                new Position(3,3), Direction.E
            ))
        expect(eventEmitter.emitEndProcessingEvent).toHaveBeenNthCalledWith(2, '1')
    });
});