import { useState } from 'react';

export type EventType = {
  id: string; // unique ID
  title: string;
  description: string;
  start: string;
  end: string;
  color: string;
  category: string;
};

export const useEventManager = () => {
  const [events, setEvents] = useState<EventType[]>([]);

  const addEvent = (event: Omit<EventType, 'id'>) => {
    const newEvent = { ...event, id: crypto.randomUUID() };
    setEvents((prev) => [...prev, newEvent]);
  };

  const editEvent = (id: string, updated: Partial<EventType>) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === id ? { ...event, ...updated } : event))
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const getEventsByDate = (date: Date) => {
    return events.filter(
      (event) => new Date(event.start).toDateString() === date.toDateString()
    );
  };

  return { events, addEvent, editEvent, deleteEvent, getEventsByDate };
};