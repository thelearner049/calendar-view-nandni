import { useState } from "react";
import { format } from "date-fns";
import Calendar from "./components/Calendar/Calendar";
import WeekView from "./components/Calendar/WeekView";
import Header from "./components/Calendar/Header";
import EventSidebar from "./components/Calendar/EventSidebar";
import { useEventManager } from "./hooks/useEventManager";

type ViewType = "month" | "week";

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<ViewType>("month");
  
  // Event management 
  const eventManager = useEventManager();

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="mt-4 md:mt-8 lg:mt-16 px-2 md:px-4 lg:px-0">
        <div className="max-w-[1200px] mx-auto">
          <Header
            value={currentDate}
            setCurrentDate={setCurrentDate}
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
          
          <div className="flex flex-col lg:flex-row gap-4 mt-4">
            {/* Main Calendar Area */}
            <div className="flex-1">
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

            {/* Desktop Sidebar - Hidden on mobile/tablet */}
            <div className="hidden lg:block w-80">
              <EventSidebar 
                currentDate={currentDate}
                events={eventManager.events}
                onEventClick={(event) => {
                  setCurrentDate(new Date(event.start));
                }}
              />
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm md:text-base text-gray-600">
              Selected Date: {format(currentDate, "dd LLLL yyyy")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
