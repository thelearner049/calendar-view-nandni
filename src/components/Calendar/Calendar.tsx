import {
  differenceInDays,
  endOfMonth,
  startOfMonth,
  sub,
  add,
  format,
  setDate,
  isSameMonth,
} from "date-fns";

import Cell from "./Cell";
import { useState } from "react";
import Modal from "../primitives/Modal";
import EventModal from "./EventModal";
import { useEventManager, type EventType } from "../../hooks/useEventManager";
import { colorClassMap } from "../../utils/colorClassMap";
import MobileCalendar from "./MobileCalendar";

const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Props {
  value?: Date;
  onChange?: (value: Date) => void;
  eventManager: ReturnType<typeof useEventManager>;
}

const Calendar: React.FC<Props> = ({
  value = new Date(),
  onChange,
  eventManager,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  const { addEvent, editEvent, deleteEvent, getEventsByDate } = eventManager;

  // filled cells
  const startDate = startOfMonth(value);
  const endDate = endOfMonth(value);
  const numOfDays = differenceInDays(endDate, startDate) + 1;

  // empty cells
  const prefixDays = startDate.getDay();
  const suffixDays = 6 - endDate.getDay();

  // month change
  const prevMonth = onChange
    ? () => onChange(sub(value, { months: 1 }))
    : undefined;
  const nextMonth = onChange
    ? () => onChange(add(value, { months: 1 }))
    : undefined;

  // year change
  const prevYear = onChange
    ? () => onChange(sub(value, { years: 1 }))
    : undefined;
  const nextYear = onChange
    ? () => onChange(add(value, { years: 1 }))
    : undefined;

  const handleClickedDate = (day: number) => {
    setSelectedEvent(null);
    const clickedDate = setDate(value, day);
    setSelectedDate(clickedDate);
    setOpen(true);
  };

  const handleEditClick = (event: EventType) => {
    setSelectedDate(new Date(event.start));
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  return (
    <>
      {/* Mobile View */}
      <div className="block md:hidden">
        <MobileCalendar
          value={value}
          onChange={onChange}
          events={eventManager.events}
          onEventClick={handleEditClick}
          onDateClick={handleClickedDate}
        />
      </div>

      {/* Desktop/Tablet View - Grid format */}
      <div className="hidden md:block border-t border-l w-full rounded-lg overflow-hidden bg-white shadow-sm">
        <div className="grid grid-cols-7 items-center justify-center text-center">
          <Cell onClick={prevYear}>{"<<"}</Cell>
          <Cell onClick={prevMonth}>{"<"}</Cell>
          <Cell className="col-span-3 font-extrabold text-xl md:text-2xl sticky top-0 bg-white z-10">
            {format(value, "LLLL yyyy")}
          </Cell>
          <Cell onClick={nextMonth}>{">"}</Cell>
          <Cell onClick={nextYear}>{">>"}</Cell>

          {/* Days name mapping */}
          {dayOfWeek.map((day) => (
            <Cell
              key={day}
              className="text-sm md:text-lg font-bold bg-blue-200 font-mono sticky z-10"
            >
              {day}
            </Cell>
          ))}

          {/* Empty and Filled Cells mapping */}
          {Array.from({ length: prefixDays }).map((_, index) => (
            <Cell key={index} className="min-h-20 md:min-h-[100px]" />
          ))}

          {Array.from({ length: numOfDays }).map((_, index) => {
            const date = index + 1;
            const isToday =
              date === new Date().getDate() && isSameMonth(value, new Date());
            const cellDate = setDate(value, date);
            const eventsForcell = getEventsByDate(cellDate);
            return (
              <Cell
                isActive={isToday}
                onClick={() => {
                  handleClickedDate(date);
                }}
                className="text-xs md:text-sm min-h-20 md:min-h-[100px]"
                key={date}
              >
                <div className="flex flex-col gap-1 w-full h-full">
                  <span className="font-medium text-base md:text-lg">
                    {date}
                  </span>
                  {/* Render events inside the cell */}
                  <div className="flex flex-col gap-1 overflow-y-auto max-h-[60px] md:max-h-20">
                    {eventsForcell.slice(0, 3).map((ev) => (
                      <div
                        key={ev.id}
                        className={`text-[9px] md:text-2.5 px-0.5 py-0.5 w-full rounded flex flex-col items-center text-white cursor-pointer hover:opacity-80 ${
                          colorClassMap[ev.color] || "bg-gray-400"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(ev);
                        }}
                      >
                        <span className="truncate w-full text-center">
                          {ev.title}
                        </span>
                      </div>
                    ))}
                    {eventsForcell.length > 3 && (
                      <div className="text-[9px] text-gray-500 text-center">
                        +{eventsForcell.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              </Cell>
            );
          })}

          {Array.from({ length: suffixDays }).map((_, index) => (
            <Cell key={index} className="min-h-20 md:min-h-[100px]" />
          ))}
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
    </>
  );
};

export default Calendar;
