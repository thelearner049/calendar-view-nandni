import {
  startOfWeek,
  addDays,
  format,
  isSameDay,
  parseISO,
  setHours,
  setMinutes,
  getHours,
  getMinutes,
} from "date-fns";
import { useState } from "react";
import Modal from "../primitives/Modal";
import EventModal from "./EventModal";
import { useEventManager, type EventType } from "../../hooks/useEventManager";
import { colorClassMap } from "../../utils/colorClassMap";

interface Props {
  value?: Date;
  onChange?: (value: Date) => void;
  eventManager: ReturnType<typeof useEventManager>;
}

const WeekView: React.FC<Props> = ({ value = new Date(), eventManager }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  const { addEvent, editEvent, deleteEvent, events } = eventManager;

  // week boundaries
  const weekStart = startOfWeek(value, { weekStartsOn: 0 }); // Sunday

  // For generating days of the week
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Hours in a day
  const startHour = 1;
  const endHour = 24;
  const hours = Array.from(
    { length: endHour - startHour + 1 },
    (_, i) => startHour + i
  );

  // Handle time slot click
  const handleTimeSlotClick = (day: Date, hour: number) => {
    setSelectedEvent(null);
    const clickedDateTime = setHours(setMinutes(day, 0), hour);
    setSelectedDate(clickedDateTime);
    setOpen(true);
  };

  // Handle event click
  const handleEditClick = (event: EventType) => {
    setSelectedDate(new Date(event.start));
    setSelectedEvent(event);
    setOpen(true);
  };

  // Reset modal state
  const handleCloseModal = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  // Get events for a specific day
  const getEventsForDay = (day: Date) => {
    return events.filter((event) => isSameDay(parseISO(event.start), day));
  };

  // Calculate event position and span
  const getEventStyle = (event: EventType) => {
    const start = parseISO(event.start);
    const end = parseISO(event.end);

    const eventStartHour = getHours(start);
    const eventStartMinute = getMinutes(start);
    const eventEndHour = getHours(end);
    const eventEndMinute = getMinutes(end);

    // Position relative to the first hour displayed
    const top = (eventStartHour - startHour + eventStartMinute / 60) * 60;
    const duration =
      eventEndHour +
      eventEndMinute / 60 -
      (eventStartHour + eventStartMinute / 60);
    const height = Math.max(duration * 60, 30); // Minimum 30px height

    return { top: `${top}px`, height: `${height}px` };
  };

  return (
    <div className="w-full">
      {/* Week view grid */}
      <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
        {/* Day headers */}
        <div className="grid grid-cols-8 border-b bg-gray-50 sticky top-0 z-10">
          <div className="p-2 border-r min-w-27 md:w-16"></div>
          {weekDays.map((day, index) => {
            const isToday = isSameDay(day, new Date());
            return (
              <div
                key={index}
                className={`p-2 text-center border-r last:border-r-0 ${
                  isToday ? "bg-blue-100" : ""
                }`}
              >
                <div className="font-semibold text-sm md:text-xs font-mono text-gray-600">
                  {format(day, "EEE")}
                </div>
                <div
                  className={`text-base md:text-lg font-bold mt-1 ${
                    isToday ? "text-blue-600" : "text-gray-900"
                  }`}
                >
                  {format(day, "d")}
                </div>
              </div>
            );
          })}
        </div>

        {/* Time slots and events */}
        <div className=" overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-h-[500px] md:max-h-[600px]">
          <div className="grid grid-cols-8 ">
            {/* Time column */}
            <div className="border-r min-w-27 md:w-16">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="h-[60px] border-b flex items-start justify-end pr-1 md:pr-2 pt-1 text-[10px] md:text-xs text-gray-500"
                >
                  {format(setHours(new Date(), hour), "ha")}
                </div>
              ))}
            </div>

            {/* Day columns */}
            {weekDays.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="border-r last:border-r-0 relative "
              >
                {/* Time slots */}
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="h-[60px] border-b hover:bg-blue-50 cursor-pointer transition-colors"
                    onClick={() => handleTimeSlotClick(day, hour)}
                  />
                ))}

                {/* Events overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {getEventsForDay(day).map((event) => {
                    const style = getEventStyle(event);
                    const bgColor = colorClassMap[event.color] || "bg-gray-400";
                    return (
                      <div
                        key={event.id}
                        className={`absolute left-0.5 md:left-1 right-0.5 md:right-1 rounded px-1 md:px-2 py-0.5 md:py-1 text-white text-[9px] md:text-xs overflow-hidden pointer-events-auto cursor-pointer ${bgColor} hover:opacity-90 shadow-sm`}
                        style={{ top: style.top, height: style.height }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(event);
                        }}
                      >
                        <div className="font-semibold truncate">
                          {event.title}
                        </div>
                        <div className="text-[8px] md:text-[10px] opacity-90 truncate hidden md:block">
                          {format(parseISO(event.start), "h:mm a")}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Wrapper */}
      <Modal open={open} onClose={handleCloseModal}>
        {selectedDate && open && (
          <EventModal
            key={
              selectedEvent
                ? `edit-${selectedEvent.id}`
                : `create-${selectedDate.getTime()}`
            }
            date={selectedDate}
            {...(selectedEvent
              ? {
                  event: selectedEvent,
                  onUpdate: (id: string, updated: Partial<EventType>) => {
                    editEvent(id, updated);
                    handleCloseModal();
                  },
                  onDelete: (id: string) => {
                    deleteEvent(id);
                    handleCloseModal();
                  },
                }
              : {
                  onSave: (payload: Omit<EventType, "id">) => {
                    addEvent(payload);
                    handleCloseModal();
                  },
                })}
            onClose={handleCloseModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default WeekView;
