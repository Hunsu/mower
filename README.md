This project is an implementation of an automatic lawn mower designed to mow rectangular surfaces.

# Requirements

The position of the mower can be represented by coordinates (x,y) and by a letter giving the
cardinal direction (N,E,W,S). The lawn is divided into a grid to simplify the navigation.

For example, a mower position can be « 0, 0, N », it means that this mower is located at the
lower-left corner of the lawn, and it is oriented North.

The mower is controlled by sending it a sequence of letters. Possible letters are « R », « L »
and « F ». « R » and « L » make the mower rotate of 90° respectively to the right or to the
left, without moving. « F » means that the mower is moving forward on the cell in front of it,
without changing its orientation.
If the position after the move is outside the lawn, then the mower do not move, it keeps its
orientation and process the next command.

The cell directly at North of the position (x, y) has for coordinates (x, y+1).

An input file following these rules is given to program the mower:
- The first line is the coordinates of the upper-right corner of the lawn, coordinates of
lower-left corner are supposed to be (0,0)
- Next lines of the file drive all mowers. There are two lines for each mower:

    - First line give the initial position and orientation of the mower. Position and orientation
are given by 2 numbers and a letter, separated by a space
    - Second line is a sequence of instruction driving the mower across the lawn. Instructions
are a sequence of letters without space.

Each mower moves sequentially, it means that the second mower moves only after the first
one execute all its instructions.

When the mower has executed all its instructions, it outputs its position and orientation.

# Example
The program take a file with following content: 
```
5 5
1 2 N
LFLFLFLFF
3 3 E
FFRFFRFRRF
```

and the expected output will be:
```
1 3 N
5 1 E
```

# Design
We will use an OOD for the solution. From the description we see there two main objects : the mower and the surface to mow. The mower has a position and an orientation, and it processes commands. A surface is defined by the position of its lower left corner and upper right corner.  

We will need to implement a parser for the input file. The position of the mower is relative to the lawn lower left position, but it could be better to use a commun origin for all the positions. So we need to translate the mow position. Let's say the origin is the same one as for the lawn which facilitate the translation as the lawn.

From the description we see that there are more than one mower. So we will implement a controller that coordinates all the mowers.

For the output we can just instantiate a mower and make it process the commands and at the end, asks it for its position. As we are using NodeJS, let's make use of events. Processing commands could be an async task and the mower emits different events. We can then implement a listener that listen for those events to do some logic.

# How to run
Before running the program you should first run `npm install` at the root directory.

To run the program you can execute `npm run start`, the file `data/instructions.txt` will be used as an input. You pass another file by running the command `ts-node main.ts myfile`.