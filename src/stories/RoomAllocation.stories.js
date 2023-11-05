import { RoomAllocation } from "./RoomAllocation";

export default {
  title: "Example/RoomAllocation",
  component: RoomAllocation,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    guest: { control: { type: "number", min: 0, step: 1 } },
    room: { control: { type: "number", min: 0, step: 1 } },
    onChange: { control: { type: "function" } },
  },
};

export const Preview = {
  args: {
    guest: 10,
    room: 3,
    onChange: (result) => console.log(result),
  },
};
