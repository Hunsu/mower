import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import GridLawn from './GridLawn';
import {Direction} from "../../Position";

export default {
    title: 'GridLawn',
    component: GridLawn,
} as ComponentMeta<typeof GridLawn>;

const Template: ComponentStory<typeof GridLawn> = (args) => <div style={{display: 'flex'}}><GridLawn {...args} /></div>;

export const GridLawnWithNoVisitedCells = Template.bind({});
GridLawnWithNoVisitedCells.args = {
    visitedCells: [],
    nbCol: 5,
    nbRow: 5,
    currentCell: {cell: {rowIndex: 2, colIndex: 2}, direction: Direction.N}
};

export const GridLawnWithVisitedCells = Template.bind({});
GridLawnWithVisitedCells.args = {
    visitedCells: [{
        rowIndex: 0, colIndex: 0
    }],
    nbCol: 5,
    nbRow: 5,
    currentCell: {cell: {rowIndex: 2, colIndex: 2}, direction: Direction.N}

};
