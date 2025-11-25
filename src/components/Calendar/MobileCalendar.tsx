import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
} from "date-fns";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import type { EventType } from "../../hooks/useEventManager";
import { colorClassMap } from "../../utils/colorClassMap";

interface Props {
  value: Date;
  onChange?: (value: Date) => void;
  events: EventType[];
  onEventClick: (event: EventType) => void;
  onDateClick: (day: number) => void;
}

const MobileCalendar: React.FC<Props> = ({
  value,
  onChange,
  events,
  onEventClick,
  onDateClick,
}) => {
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());

  const monthStart = startOfMonth(value);
  const monthEnd = endOfMonth(value);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handlePrevMonth = () => {
    onChange?.(subMonths(value, 1));
  };

  const handleNextMonth = () => {
    onChange?.(addMonths(value, 1));
  };

  const toggleDate = (dateStr: string) => {
    setExpandedDates((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(dateStr)) {
        newSet.delete(dateStr);
      } else {
        newSet.add(dateStr);
      }
      return newSet;
    });
  };

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => isSameDay(parseISO(event.start), date));
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm">
      {/* Month Navigation */}
      <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          ←
        </button>
        <h2 className="text-lg font-bold">{format(value, "MMMM yyyy")}</h2>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          →
        </button>
      </div>

      {/* Day List */}
      <div className="divide-y">
        {daysInMonth.map((date) => {
          const dateStr = format(date, "yyyy-MM-dd");
          const isExpanded = expandedDates.has(dateStr);
          const dayEvents = getEventsForDate(date);
          const isToday = isSameDay(date, new Date());

          return (
            <div key={dateStr} className="border-b last:border-b-0">
              {/* Date Header */}
              <div
                className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 ${
                  isToday ? "bg-blue-50" : ""
                }`}
                onClick={() => toggleDate(dateStr)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`text-center ${isToday ? "text-blue-600" : ""}`}
                  >
                    <div className="text-xs font-semibold uppercase">
                      {format(date, "EEE")}
                    </div>
                    <div className="text-2xl font-bold">
                      {format(date, "d")}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">
                      {dayEvents.length}{" "}
                      {dayEvents.length === 1 ? "event" : "events"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDateClick(date.getDate());
                    }}
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                    title="Add event"
                  >
                    <Plus size={16} />
                  </button>
                  {isExpanded ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
              </div>

              {/* Expanded Events */}
              {isExpanded && (
                <div className="px-4 pb-4 space-y-2 bg-gray-50">
                  {dayEvents.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No events for this day
                    </p>
                  ) : (
                    dayEvents.map((event) => {
                      const bgColor =
                        colorClassMap[event.color] || "bg-gray-400";
                      return (
                        <div
                          key={event.id}
                          className={`${bgColor} text-white rounded-lg p-3 cursor-pointer hover:opacity-90`}
                          onClick={() => onEventClick(event)}
                        >
                          <div className="font-semibold">{event.title}</div>
                          <div className="text-sm opacity-90 mt-1">
                            {format(parseISO(event.start), "h:mm a")} -{" "}
                            {format(parseISO(event.end), "h:mm a")}
                          </div>
                          {event.description && (
                            <div className="text-xs opacity-80 mt-1">
                              {event.description}
                            </div>
                          )}
                          <div className="text-xs opacity-80 mt-1 capitalize">
                            {event.category}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobileCalendar;
