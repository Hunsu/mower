import { ComponentMeta, ComponentStory } from "@storybook/react";
import {MowingCell} from "./MowingCell";
import {Direction} from "../../Position";

export default {
    title: 'MowingCell',
    component: MowingCell,
} as ComponentMeta<typeof MowingCell>;

const Template: ComponentStory<typeof MowingCell> = (args) => <MowingCell {...args} />;

export const NorthToSouth = Template.bind({});
NorthToSouth.args = {
    direction: Direction.S
};

export const SouthToNorth = Template.bind({});
SouthToNorth.args = {
    direction: Direction.N
};

export const EastToWest = Template.bind({});
EastToWest.args = {
    direction: Direction.W
};

export const WestToEast = Template.bind({});
WestToEast.args = {
    direction: Direction.E
};