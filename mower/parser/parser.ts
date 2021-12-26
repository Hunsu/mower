import {ControlCommand} from "../Mower";

export const parseCommands =
    (commands: string): Array<ControlCommand> => {
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
                    throw new Error(`Unknown command "${commands.charAt(i)}" at position ${i+1}`)
            }
        }
        return controlCommands
    }