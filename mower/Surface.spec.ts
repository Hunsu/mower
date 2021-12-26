import {Surface} from "./Surface";
import {Position} from "./Position";

describe('Surface', () => {
    let surface: Surface;
    beforeEach(() => {
        surface = new Surface(new Position(0, 0,), new Position(5, 5))
    })

    it('should create a surface with provided positions', () => {
        expect(surface.lowerLeft.x).toBe(0)
        expect(surface.lowerLeft.y).toBe(0)

        expect(surface.upperRight.x).toBe(5)
        expect(surface.upperRight.y).toBe(5)
    })

    it('should throw an error when creating surface when positions are not corrects', () => {
        expect(() => new Surface(new Position(0, 0), new Position(-1, 3)))
            .toThrowError("Wrong positions are provided")
        expect(() => new Surface(new Position(0, 0), new Position(1, -3)))
            .toThrowError("Wrong positions are provided")
    })

    it('should indicate if a given position is inside the surface', () => {
        expect(surface.isInside(new Position(2, 3))).toBe(true)
        expect(surface.isInside(new Position(0, 0))).toBe(true)
        expect(surface.isInside(new Position(5, 5))).toBe(true)
        expect(surface.isInside(new Position(1, 0))).toBe(true)
        expect(surface.isInside(new Position(0, 4))).toBe(true)
        expect(surface.isInside(new Position(5, 3))).toBe(true)
        expect(surface.isInside(new Position(2, 5))).toBe(true)
    })
    it('should indicate if a given position is outside the surface', () => {
        expect(surface.isInside(new Position(-1, 3))).toBe(false)
        expect(surface.isInside(new Position(1, 6))).toBe(false)
        expect(surface.isInside(new Position(5, 9))).toBe(false)
        expect(surface.isInside(new Position(-1, -1))).toBe(false)
        expect(surface.isInside(new Position(0, 10))).toBe(false)
        expect(surface.isInside(new Position(8, 5))).toBe(false)
        expect(surface.isInside(new Position(11, 0))).toBe(false)
    })
});