import {parseCommands, parseCoordinates, parseCoordinatesWithDirection} from "./parser";
import {ControlCommand} from "../Mower";
import {Direction, Position, PositionWithOrientation} from "../position";

describe('parseCommands', () => {
    it('should throw error if value is null', () => {
        expect(() => parseCommands(null))
            .toThrowError(`Incorrect value was provided: null`)
    });
    it('should throw error if value is null', () => {
        expect(() => parseCommands(undefined))
            .toThrowError(`Incorrect value was provided: undefined`)
    });
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

describe('parseCoordinates', () => {
    it('should throw error if value is null', () => {
        expect(() => parseCoordinates(null))
            .toThrowError(`Incorrect value was provided: null`)
    });
    it('should throw an error if value is empty', () => {
        expect(() => parseCoordinates(""))
            .toThrowError(`Incorrect value was provided: `)
    });
    it('should throw an error if value contains more than two elements separated by a space', () => {
        expect(() => parseCoordinates("5 5 6"))
            .toThrowError(`Incorrect value was provided: 5 5 6`)
    });
    it('should throw an error if value contains only one element', () => {
        expect(() => parseCoordinates("5"))
            .toThrowError(`Incorrect value was provided: 5`)
    });

    it('should throw an error if value is not coordinates', () => {
        expect(() => parseCoordinates("A 5"))
            .toThrowError(`Incorrect value was provided: A 5`)
    });
    it('should correctly parse coordinates', () => {
        expect(parseCoordinates('5 5'))
            .toEqual(new Position(5,5))
    });
});

describe('parseCoordinatesWithOrientation', () => {
    it('should throw an error if value is null', () => {
        expect(() => parseCoordinatesWithDirection(null))
            .toThrowError(`Incorrect value was provided: null`)
    });
    it('should throw an error if value is undefined', () => {
        expect(() => parseCoordinatesWithDirection(undefined))
            .toThrowError(`Incorrect value was provided: undefined`)
    });

    it('should throw an error if value is empty', () => {
        expect(() => parseCoordinatesWithDirection(""))
            .toThrowError(`Incorrect value was provided: `)
    });
    it('should throw an error if value does not contains three elements separated by a space', () => {
        expect(() => parseCoordinatesWithDirection("5 5"))
            .toThrowError(`Incorrect value was provided: 5 5`)
    });
    it('should throw an error if value does not valid coordinates', () => {
        expect(() => parseCoordinatesWithDirection("5 A N"))
            .toThrowError(`Incorrect value was provided: 5 A N`)
    });
    it('should throw an error if value does not valid direction', () => {
        expect(() => parseCoordinatesWithDirection("5 5 A"))
            .toThrowError(`Incorrect value was provided: 5 5 A`)
    });
    it.each`
        direction
        ${Direction.N}
        ${Direction.E}
        ${Direction.S}
        ${Direction.W}
    `
    ('should correctly parse coordinates with direction', ({direction}) => {
        expect(parseCoordinatesWithDirection(`1 8 ${Direction[direction]}`))
            .toEqual(new PositionWithOrientation(new Position(1,8), direction))
    });
});