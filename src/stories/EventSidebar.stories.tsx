import type { Meta as SidebarMeta, StoryObj as SidebarStory } from "@storybook/react-vite";
import EventSidebar from "../components/Calendar/EventSidebar";
import type { EventType } from "../hooks/useEventManager";

const sidebarEvents: EventType[] = [
  {
    id: "1",
    title: "Team Meeting",
    description: "Weekly sync",
    start: "2024-11-25T10:00",
    end: "2024-11-25T11:00",
    color: "#3357FF",
    category: "Meeting",
  },
  {
    id: "2",
    title: "Project Review",
    description: "Q4 review",
    start: "2024-11-26T14:00",
    end: "2024-11-26T16:00",
    color: "#FF5733",
    category: "Work",
  },
  {
    id: "3",
    title: "Lunch Break",
    description: "Team lunch",
    start: "2024-11-27T12:00",
    end: "2024-11-27T13:00",
    color: "#33FF57",
    category: "Personal",
  },
];

const sidebarMeta: SidebarMeta<typeof EventSidebar> = {
  title: "Calendar/EventSidebar",
  component: EventSidebar,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default sidebarMeta;
type SidebarStoryType = SidebarStory<typeof EventSidebar>;

export const WithEvents: SidebarStoryType = {
  render: () => (
    <div className="w-80">
      <EventSidebar
        currentDate={new Date(2024, 10, 25)}
        events={sidebarEvents}
        onEventClick={(event) => console.log("Clicked:", event)}
      />
    </div>
  ),
};

export const EmptySidebar: SidebarStoryType = {
  render: () => (
    <div className="w-80">
      <EventSidebar
        currentDate={new Date(2024, 10, 25)}
        events={[]}
        onEventClick={(event) => console.log("Clicked:", event)}
      />
    </div>
  ),
};