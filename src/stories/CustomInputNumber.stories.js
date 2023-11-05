import { CustomInputNumber } from "./CustomInputNumber";

export default {
  title: "Example/CustomInputNumber",
  component: CustomInputNumber,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    min: { control: { type: "number", min: 0, step: 1 } },
    max: { control: { type: "number", min: 0, step: 1 } },
    step: { control: { type: "number", min: 1, step: 1 } },
    name: { control: "text" },
    value: { control: { type: "number", min: 0, step: 1 } },
    onChange: { control: { type: "function" } },
    onBlur: { control: { type: "function" } },
    disabled: { control: "boolean" },
  },
};

export const Preview = {
  args: {
    min: 0,
    max: 10,
    step: 1,
    name: "Example",
    value: 0,
    onChange: (event) =>
      console.log({
        event: "onChange",
        "Event.target.name": event.target.name,
        "Event.target.value": event.target.value,
      }),
    onBlur: (event) =>
      console.log({
        event: "onBlur",
        "Event.target.name": event.target.name,
        "Event.target.value": event.target.value,
      }),
    disabled: false,
  },
};
