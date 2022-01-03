import {ControlCommand, Mower} from "./Mower";
import {Direction, PositionWithOrientation, Position, Surface} from "../lawn";
import {parseCommands} from "../parser";
import eventEmitter from "../events/event-emitter";

describe('Mower processing commands', () => {
    let mower: Mower;
    beforeEach(() => {
        mower = new Mower('1', new PositionWithOrientation(new Position(0, 0), Direction.N))
    })

    it('should create a mower at the right position and direction', () => {
        expect(mower.positionWithOrientation.position.x).toBe(0)
        expect(mower.positionWithOrientation.position.y).toBe(0)
        expect(mower.positionWithOrientation.direction).toBe(Direction.N)
    })

    it('should throw error if mower is not positioned inside surface to mow', () => {
        expect(() => mower.setSurfaceToMow(new Surface(new Position(1, 1), new Position(6, 5))))
            .toThrowError('The mower should be positioned inside the surface to mow')
    })

    it('should set the surface to mow if the mower is positioned inside that surface', () => {
        expect(() => mower.setSurfaceToMow(new Surface(new Position(-1, -1), new Position(3, 3))))
            .not.toThrowError('The mower should be positioned inside the surface to mow')
    })
    it('should rotate 90° to the left when received R command', () => {
        mower.processCommand(ControlCommand.R)
        expect(mower.positionWithOrientation.direction).toBe(Direction.E)

        mower.processCommand(ControlCommand.R)
        expect(mower.positionWithOrientation.direction).toBe(Direction.S)

        mower.processCommand(ControlCommand.R)
        expect(mower.positionWithOrientation.direction).toBe(Direction.W)

        mower.processCommand(ControlCommand.R)
        expect(mower.positionWithOrientation.direction).toBe(Direction.N)
    })
    it('should rotate 90° to the right when received L command', () => {
        mower.processCommand(ControlCommand.L)
        expect(mower.positionWithOrientation.direction).toBe(Direction.W)

        mower.processCommand(ControlCommand.L)
        expect(mower.positionWithOrientation.direction).toBe(Direction.S)

        mower.processCommand(ControlCommand.L)
        expect(mower.positionWithOrientation.direction).toBe(Direction.E)

        mower.processCommand(ControlCommand.L)
        expect(mower.positionWithOrientation.direction).toBe(Direction.N)
    })
    it.each`
        direction       | x  | y
        ${Direction.N}  | ${0}  | ${1}
        ${Direction.E}  | ${1}  | ${0}
        ${Direction.S}  | ${0}  | ${-1}
        ${Direction.W}  | ${-1} | ${0}
    `

    ('should move to ($x, $y) when received F command and direction is $direction',
        ({direction, x, y}) => {
            mower = new Mower('1', new PositionWithOrientation(new Position(0, 0), direction))
            mower.setSurfaceToMow(new Surface(new Position(-2, -2), new Position(2, 2)))
            mower.processCommand(ControlCommand.F)

            expect(mower.positionWithOrientation.position.x).toBe(x)
            expect(mower.positionWithOrientation.position.y).toBe(y)
        })

    it.each`
        direction       | x     | y
        ${Direction.N}  | ${1}  | ${3}
        ${Direction.E}  | ${3}  | ${2}
        ${Direction.S}  | ${-1} | ${-3}
        ${Direction.W}  | ${-3} | ${0}
    `
    ('should stay at ($x, $y) when received F command and direction is $direction',
        ({direction, x, y}) => {
            mower = new Mower('1', new PositionWithOrientation(new Position(x, y), direction))
            mower.setSurfaceToMow(new Surface(new Position(-3, -3), new Position(3, 3)))
            mower.processCommand(ControlCommand.F)

            expect(mower.positionWithOrientation.position.x).toBe(x)
            expect(mower.positionWithOrientation.position.y).toBe(y)
        })

    it.each`
        startX  | startY  | startDirection  | commands        | x     | y     | direction
        ${1}    | ${2}    | ${Direction.N}  | ${'LFLFLFLFF'}  | ${1}  | ${3}  | ${Direction.N}
        ${3}    | ${3}    | ${Direction.E}  | ${'FFRFFRFRRF'} | ${5}  | ${1}  | ${Direction.E}
    `
    ('should process a list of commands', ({
        startX, startY, startDirection, commands, x, y, direction
                                           }) => {
        mower = new Mower('1', new PositionWithOrientation(new Position(startX, startY), startDirection))
        mower.setSurfaceToMow(new Surface(new Position(0, 0), new Position(5, 5)))
        mower.processCommands(parseCommands(commands))
        expect(mower.positionWithOrientation.position.x).toBe(x)
        expect(mower.positionWithOrientation.position.y).toBe(y)
        expect(mower.positionWithOrientation.direction).toBe(direction)
    })
})

describe('Mower emitting events', () => {
    let mower;
    beforeEach(() => {
        jest.spyOn(eventEmitter, 'emitStartProcessingEvent')
        jest.spyOn(eventEmitter, 'emitCommandEvent')
        jest.spyOn(eventEmitter, 'emitMoveEvent')
        jest.spyOn(eventEmitter, 'emitRotateEvent')
        jest.spyOn(eventEmitter, 'emitEndProcessingEvent')
        mower = new Mower('1', new PositionWithOrientation(new Position(0,0), Direction.N))
        mower.setSurfaceToMow(new Surface(new Position(0,0), new Position(5,5)))
    })

    it('should emit start processing event', () => {
        mower.processCommands([ControlCommand.L])
        expect(eventEmitter.emitStartProcessingEvent).toHaveBeenCalled()
    });
    it('should emit command event', () => {
        mower.processCommands([ControlCommand.L])
        expect(eventEmitter.emitCommandEvent).toHaveBeenCalled()
    });
    it('should emit rotate event', () => {
        mower.processCommands([ControlCommand.L])
        expect(eventEmitter.emitRotateEvent).toHaveBeenCalled()
    });
    it('should emit move event', () => {
        mower.processCommands([ControlCommand.F])
        expect(eventEmitter.emitMoveEvent).toHaveBeenCalled()
    });
    it('should emit end processing event', () => {
        mower.processCommands([ControlCommand.L])
        expect(eventEmitter.emitEndProcessingEvent).toHaveBeenCalled()
    });
});