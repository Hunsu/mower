import {parseCommands} from "./parser";
import {ControlCommand} from "../Mower";

describe('parser', () => {
    it('should parse empty string to an empty array of commands', () => {
        expect(parseCommands("")).toEqual([])
    })
    it('should throw an error of the string contains unknown command', () => {
        expect(() => parseCommands('LRFO'))
            .toThrowError('Unknown command "O" at position 4')
    })
    it('should correctly parse correct commands', () => {
        expect(parseCommands("LFRF")).toEqual([
            ControlCommand.L,
            ControlCommand.F,
            ControlCommand.R,
            ControlCommand.F
            ]
        )
    });
});