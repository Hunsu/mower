import {ControlCommand} from "../mower/Mower";
import {Direction, Position, PositionWithOrientation} from "../lawn";

export const parseCommands =
    (commands: string): Array<ControlCommand> => {
        if (commands === null || commands === undefined) {
            throw new Error(`Incorrect value was provided: ${commands}`)
        }
        const controlCommands = []
        for (let i = 0; i < commands.length; i++) {
            switch (commands.charAt(i)) {
                case 'F':
                    controlCommands.push(ControlCommand.F)
                    break
                case 'L':
                    controlCommands.push(ControlCommand.L)
                    break
                case 'R':
                    controlCommands.push(ControlCommand.R)
                    break;
                default:
                    throw new Error(`Unknown command "${commands.charAt(i)}" at position ${i + 1}`)
            }
        }
        return controlCommands
    }

const isNumber = (value: string): boolean => {
    return ((value != null) &&
        (value !== '') &&
        !isNaN(Number(value.toString())));
}

export const parseCoordinates = (line: string): Position => {
    if (!line) {
        throw new Error(`Incorrect value was provided: ${line}`)
    }
    const coordinates = line.split(" ")
    if (coordinates.length !== 2) {
        throw new Error(`Incorrect value was provided: ${line}`)
    }
    if (!isNumber(coordinates[0]) || !isNumber(coordinates[1])) {
        throw new Error(`Incorrect value was provided: ${line}`)
    }
    return new Position(Number(coordinates[0]), Number(coordinates[1]))
}

const parseOrientation = (value: string): Direction => {
    switch (value) {
        case 'N':
            return Direction.N
        case 'E':
            return Direction.E
        case 'S':
            return Direction.S
        case 'W':
            return Direction.W
        default:
            throw new Error(`Incorrect value was provided: ${value}`)
    }
}

export const translatePosition = (position: Position, origin: Position) => {
    return new Position(position.x + origin.x, position.y + origin.y)
}

export const parseCoordinatesWithDirection = (value: string, origin: Position): PositionWithOrientation => {
    if (!value) {
        throw new Error(`Incorrect value was provided: ${value}`)
    }
    const values = value.split(" ")
    if (values.length !== 3) {
        throw new Error(`Incorrect value was provided: ${value}`)
    }
    try {
        const position = parseCoordinates(`${values[0]} ${values[1]}`)
        const translatedPosition = translatePosition(position, origin)
        const direction = parseOrientation(values[2])
        return new PositionWithOrientation(translatedPosition, direction)
    } catch (e) {
        throw new Error(`Incorrect value was provided: ${value}`)
    }
}