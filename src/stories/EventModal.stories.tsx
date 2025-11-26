import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import EventModal from "../components/Calendar/EventModal";
import Modal from "../components/primitives/Modal";
import "../index.css";

const meta: Meta<typeof EventModal> = {
  title: "Calendar/EventModal",
  component: EventModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EventModal>;

export const CreateEvent: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <Modal open={open} onClose={() => setOpen(false)}>
        <EventModal
          date={new Date(2024, 10, 25)}
          onSave={(event) => console.log("Save:", event)}
          onClose={() => setOpen(false)}
        />
      </Modal>
    );
  },
};

export const EditEvent: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <Modal open={open} onClose={() => setOpen(false)}>
        <EventModal
          date={new Date(2024, 10, 25)}
          event={{
            id: "1",
            title: "Team Meeting",
            description: "Weekly sync",
            start: "2024-11-25T10:00",
            end: "2024-11-25T11:00",
            color: "#3357FF",
            category: "Meeting",
          }}
          onUpdate={(id, updated) => console.log("Update:", id, updated)}
          onDelete={(id) => console.log("Delete:", id)}
          onClose={() => setOpen(false)}
        />
      </Modal>
    );
  },
};