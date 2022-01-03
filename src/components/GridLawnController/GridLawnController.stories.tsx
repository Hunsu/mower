import { ComponentMeta, ComponentStory } from "@storybook/react";
import {Direction} from "../../Position";
import GridLawnController from "./GridLawnController";

export default {
    title: 'GridLawnController',
    component: GridLawnController,
} as ComponentMeta<typeof GridLawnController>;

const Template: ComponentStory<typeof GridLawnController> = (args) => <div style={{display: 'flex'}}><GridLawnController {...args} /></div>;

export const Controller = Template.bind({});
Controller.args = {
};