import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";
import { Switch } from "./Switch";

export default {
  component: Switch,
  argType:{
    setState: { control: { disable: true } },
  },
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (args) => {
  const [state, setState] = useState();
  return <Switch state={state} setState={setState} {...args} />;
};

export const MySwitch = Template.bind({});

MySwitch.args = {};
