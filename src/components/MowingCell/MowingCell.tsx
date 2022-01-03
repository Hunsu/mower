import {Direction} from "../../Position";
import styled, { keyframes } from "styled-components"

interface MowingCellProps {
    direction: Direction
}

const shrink = keyframes`
    from {
      flex: 1;
    }
    to {
      flex: 0
    }
`

const grow = keyframes`
  from {
    flex: 0;
  }
  to {
    flex: 1
  }
`

const MowedPart = styled.div<MowingCellProps>`
  background-color: green;
  filter: brightness(85%);
  animation-name: ${grow};
  animation-duration: 2s;
  flex: 1;
`

const NonMowedPart = styled.div<MowingCellProps>`
  background-color: green;
  filter: brightness(50%);
  animation-name: ${shrink};
  animation-duration: 2s;
`

const MowingCellWrapper = styled.div<MowingCellProps>`
  ${({ direction }) => (direction == Direction.N) && `
    flex-direction: column-reverse;
  `}
  ${({ direction }) => (direction == Direction.S) && `
    flex-direction: column;
  `}
  ${({ direction }) => (direction == Direction.W) && `
    flex-direction: row-reverse;
  `}
  width: 150px;
  height: 150px;
  display: flex;
`

export const MowingCell = ({ direction }) => {
    return <MowingCellWrapper direction={direction}>
            <MowedPart direction={direction}/>
            <NonMowedPart direction={direction}/>
    </MowingCellWrapper>
}