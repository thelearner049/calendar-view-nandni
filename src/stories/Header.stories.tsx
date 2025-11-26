import type { Meta as HeaderMeta, StoryObj as HeaderStory } from "@storybook/react-vite";
import Header from "../components/Calendar/Header";
import { useState } from "react";

const headerMeta: HeaderMeta<typeof Header> = {
  title: "Calendar/Header",
  component: Header,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default headerMeta;
type HeaderStoryType = HeaderStory<typeof Header>;

export const MonthView: HeaderStoryType = {
  render: () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState<"month" | "week">("month");

    return (
      <div className="w-full max-w-4xl">
        <Header
          value={currentDate}
          setCurrentDate={setCurrentDate}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
      </div>
    );
  },
};

export const WeekView: HeaderStoryType = {
  render: () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState<"month" | "week">("week");

    return (
      <div className="w-full max-w-4xl">
        <Header
          value={currentDate}
          setCurrentDate={setCurrentDate}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
      </div>
    );
  },
};

export const MobileHeader: HeaderStoryType = {
  parameters: {
    viewport: {
      defaultViewport: "mobile",
    },
  },
  render: () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState<"month" | "week">("month");

    return (
      <div className="w-full">
        <Header
          value={currentDate}
          setCurrentDate={setCurrentDate}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
      </div>
    );
  },
};