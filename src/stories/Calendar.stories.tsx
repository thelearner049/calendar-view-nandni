import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Calendar from "../components/Calendar/Calendar";
import WeekView from "../components/Calendar/WeekView";
import MobileCalendar from "../components/Calendar/MobileCalendar";
import Header from "../components/Calendar/Header";
import EventSidebar from "../components/Calendar/EventSidebar";
import type { EventType } from "../hooks/useEventManager";
import "../index.css";

// Crearing mock event manager for stories
const createMockEventManager = (initialEvents: EventType[] = []) => {
  return {
    events: initialEvents,
    addEvent: (event: Omit<EventType, "id">) => {
      console.log("Add event:", event);
    },
    editEvent: (id: string, updated: Partial<EventType>) => {
      console.log("Edit event:", id, updated);
    },
    deleteEvent: (id: string) => {
      console.log("Delete event:", id);
    },
    getEventsByDate: (date: Date) => {
      return initialEvents.filter(
        (event) => new Date(event.start).toDateString() === date.toDateString()
      );
    },
  };
};

// Sample events for stories
const sampleEvents: EventType[] = [
  {
    id: "1",
    title: "Team Meeting",
    description: "Weekly sync with the team",
    start: "2024-11-25T10:00",
    end: "2024-11-25T11:00",
    color: "#3357FF",
    category: "Meeting",
  },
  {
    id: "2",
    title: "Project Deadline",
    description: "Submit final deliverables",
    start: "2024-11-27T17:00",
    end: "2024-11-27T18:00",
    color: "#FF5733",
    category: "Work",
  },
  {
    id: "3",
    title: "Lunch Break",
    description: "Team lunch at downtown",
    start: "2024-11-26T12:00",
    end: "2024-11-26T13:00",
    color: "#33FF57",
    category: "Personal",
  },
  {
    id: "4",
    title: "Code Review",
    description: "Review PR #234",
    start: "2024-11-25T14:00",
    end: "2024-11-25T15:00",
    color: "#A133FF",
    category: "Work",
  },
  {
    id: "5",
    title: "Doctor Appointment",
    description: "Annual checkup",
    start: "2024-11-28T09:00",
    end: "2024-11-28T10:00",
    color: "#FF33A1",
    category: "Personal",
  },
];

// For generating many events for stress testing
const generateManyEvents = (count: number): EventType[] => {
  const events: EventType[] = [];
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#A133FF",
    "#33FFF6",
    "#FFC133",
    "#8DFF33",
    "#FF3380",
    "#33FFB5",
  ];
  const categories = ["Meeting", "Work", "Personal", "Reminder"];
  const titles = [
    "Team Standup",
    "Client Call",
    "Project Review",
    "Training Session",
    "1-on-1 Meeting",
    "Workshop",
    "Planning Session",
    "Demo Day",
    "Retrospective",
    "Sprint Planning",
  ];

  for (let i = 0; i < count; i++) {
    const day = (i % 28) + 1;
    const hour = 9 + (i % 10);
    events.push({
      id: `event-${i}`,
      title: titles[i % titles.length],
      description: `Event description ${i + 1}`,
      start: `2024-11-${day.toString().padStart(2, "0")}T${hour
        .toString()
        .padStart(2, "0")}:00`,
      end: `2024-11-${day.toString().padStart(2, "0")}T${(hour + 1)
        .toString()
        .padStart(2, "0")}:00`,
      color: colors[i % colors.length],
      category: categories[i % categories.length],
    });
  }

  return events;
};

const meta: Meta<typeof Calendar> = {
  title: "Calendar/Month View",
  component: Calendar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A fully responsive calendar component with month and week views, event management, and mobile optimization.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

// Story 1: Default - Current month with sample events
export const Default: Story = {
  render: () => {
    const [currentDate, setCurrentDate] = useState(new Date(2024, 10, 25));
    const eventManager = createMockEventManager(sampleEvents);

    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-2xl font-bold mb-4">Default Calendar View</h1>
          <p className="text-gray-600 mb-4">
            Current month with sample events showing typical usage
          </p>
          <Calendar
            value={currentDate}
            onChange={setCurrentDate}
            eventManager={eventManager}
          />
        </div>
      </div>
    );
  },
};

// Story 2: Empty State - Calendar with no events
export const EmptyState: Story = {
  render: () => {
    const [currentDate, setCurrentDate] = useState(new Date(2024, 10, 25));
    const eventManager = createMockEventManager([]);

    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-2xl font-bold mb-4">Empty Calendar</h1>
          <p className="text-gray-600 mb-4">
            Calendar with no events - clean slate for new users
          </p>
          <Calendar
            value={currentDate}
            onChange={setCurrentDate}
            eventManager={eventManager}
          />
        </div>
      </div>
    );
  },
};

// Story 3: Week View - Week view demonstration
export const WeekViewDemo: Story = {
  render: () => {
    const [currentDate, setCurrentDate] = useState(new Date(2024, 10, 25));
    const eventManager = createMockEventManager(sampleEvents);

    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-2xl font-bold mb-4">Week View</h1>
          <p className="text-gray-600 mb-4">
            Time-based weekly schedule showing events in their time slots (6 AM
            - 10 PM)
          </p>
          <WeekView
            value={currentDate}
            onChange={setCurrentDate}
            eventManager={eventManager}
          />
        </div>
      </div>
    );
  },
};

// Story 4: With Many Events - Month with 20+ events
export const WithManyEvents: Story = {
  render: () => {
    const [currentDate, setCurrentDate] = useState(new Date(2024, 10, 25));
    const manyEvents = generateManyEvents(25);
    const eventManager = createMockEventManager(manyEvents);

    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-2xl font-bold mb-4">Calendar with Many Events</h1>
          <p className="text-gray-600 mb-4">
            Stress test: {manyEvents.length} events showing how the calendar
            handles high event density
          </p>
          <Calendar
            value={currentDate}
            onChange={setCurrentDate}
            eventManager={eventManager}
          />
        </div>
      </div>
    );
  },
};

// Story 5: Interactive Demo - Fully functional event management
export const InteractiveDemo: Story = {
  render: () => {
    const [currentDate, setCurrentDate] = useState(new Date(2024, 10, 25));
    const [currentView, setCurrentView] = useState<"month" | "week">("month");
    const [events, setEvents] = useState<EventType[]>(sampleEvents);

    const eventManager = {
      events,
      addEvent: (event: Omit<EventType, "id">) => {
        const newEvent = { ...event, id: crypto.randomUUID() };
        setEvents((prev) => [...prev, newEvent]);
      },
      editEvent: (id: string, updated: Partial<EventType>) => {
        setEvents((prev) =>
          prev.map((event) =>
            event.id === id ? { ...event, ...updated } : event
          )
        );
      },
      deleteEvent: (id: string) => {
        setEvents((prev) => prev.filter((event) => event.id !== id));
      },
      getEventsByDate: (date: Date) => {
        return events.filter(
          (event) =>
            new Date(event.start).toDateString() === date.toDateString()
        );
      },
    };

    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-2xl font-bold mb-4">Interactive Calendar Demo</h1>
          <p className="text-gray-600 mb-4">
            Fully functional calendar - click dates to add events, click events
            to edit or delete
          </p>

          <div className="flex gap-4">
            <div className="flex-1">
              <Header
                value={currentDate}
                setCurrentDate={setCurrentDate}
                currentView={currentView}
                setCurrentView={setCurrentView}
              />

              <div className="mt-4">
                {currentView === "month" ? (
                  <Calendar
                    value={currentDate}
                    onChange={setCurrentDate}
                    eventManager={eventManager}
                  />
                ) : (
                  <WeekView
                    value={currentDate}
                    onChange={setCurrentDate}
                    eventManager={eventManager}
                  />
                )}
              </div>
            </div>

            <div className="hidden lg:block w-80">
              <EventSidebar
                currentDate={currentDate}
                events={events}
                onEventClick={(event) => {
                  setCurrentDate(new Date(event.start));
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Story 6: Mobile View - Responsive layout demonstration
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile",
    },
  },
  render: () => {
    const [currentDate, setCurrentDate] = useState(new Date(2024, 10, 25));
    const [events, setEvents] = useState<EventType[]>(sampleEvents);

    const eventManager = {
      events,
      addEvent: (event: Omit<EventType, "id">) => {
        const newEvent = { ...event, id: crypto.randomUUID() };
        setEvents((prev) => [...prev, newEvent]);
      },
      editEvent: (id: string, updated: Partial<EventType>) => {
        setEvents((prev) =>
          prev.map((event) =>
            event.id === id ? { ...event, ...updated } : event
          )
        );
      },
      deleteEvent: (id: string) => {
        setEvents((prev) => prev.filter((event) => event.id !== id));
      },
      getEventsByDate: (date: Date) => {
        return events.filter(
          (event) =>
            new Date(event.start).toDateString() === date.toDateString()
        );
      },
    };

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <h1 className="text-xl font-bold mb-2">Mobile Calendar View</h1>
        <p className="text-sm text-gray-600 mb-4">
          List view optimized for mobile devices with expandable days
        </p>
        <MobileCalendar
          value={currentDate}
          onChange={setCurrentDate}
          events={eventManager.events}
          onEventClick={(event) => {
            console.log("Event clicked:", event);
          }}
          onDateClick={(day) => {
            console.log("Date clicked:", day);
          }}
        />
      </div>
    );
  },
};
