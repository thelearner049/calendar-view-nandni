import { format, parseISO, isSameMonth,  } from "date-fns";
import type { EventType } from "../../hooks/useEventManager";
import { colorClassMap } from "../../utils/colorClassMap";

interface Props {
  currentDate: Date;
  events: EventType[];
  onEventClick: (event: EventType) => void;
}

const EventSidebar: React.FC<Props> = ({ currentDate, events, onEventClick }) => {
  // Get events for the current month
//   const monthStart = startOfMonth(currentDate);
//   const monthEnd = endOfMonth(currentDate);

  const monthEvents = events
    .filter((event) => {
      const eventDate = parseISO(event.start);
      return isSameMonth(eventDate, currentDate);
    })
    .sort((a, b) => parseISO(a.start).getTime() - parseISO(b.start).getTime());

  // Group events by category
  const eventsByCategory = monthEvents.reduce((acc, event) => {
    if (!acc[event.category]) {
      acc[event.category] = [];
    }
    acc[event.category].push(event);
    return acc;
  }, {} as Record<string, EventType[]>);

  return (
    <div className="bg-white rounded-lg shadow-sm border h-fit sticky top-4">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold">
          Events in {format(currentDate, "MMMM yyyy")}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {monthEvents.length} {monthEvents.length === 1 ? "event" : "events"} this month
        </p>
      </div>

      <div className="p-4 max-h-[600px] overflow-y-auto">
        {monthEvents.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No events this month</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(eventsByCategory).map(([category, categoryEvents]) => (
              <div key={category}>
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                  {category} ({categoryEvents.length})
                </h3>
                <div className="space-y-2">
                  {categoryEvents.map((event) => {
                    const bgColor = colorClassMap[event.color] || "bg-gray-400";
                    return (
                      <div
                        key={event.id}
                        className={`${bgColor} text-white rounded-lg p-3 cursor-pointer hover:opacity-90 transition-opacity`}
                        onClick={() => onEventClick(event)}
                      >
                        <div className="font-semibold text-sm">{event.title}</div>
                        <div className="text-xs opacity-90 mt-1">
                          {format(parseISO(event.start), "MMM d, h:mm a")}
                        </div>
                        {event.description && (
                          <div className="text-xs opacity-80 mt-1 line-clamp-2">
                            {event.description}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="p-4 border-t">
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
          Categories
        </h3>
        <div className="space-y-1">
          {["Meeting", "Work", "Personal", "Reminder"].map((cat) => (
            <div key={cat} className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>{cat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventSidebar;