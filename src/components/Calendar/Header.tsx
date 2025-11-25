// import { IoMoon } from "react-icons/io5";

// interface Props {
//   value?: Date;
//   setCurrentDate?: (value: Date) => void;
// }

// const Header: React.FC<Props> = ({ setCurrentDate }) => {
//   const handleSetToday = setCurrentDate
//     ? () => setCurrentDate(new Date())
//     : undefined;

//   return (
//     <div className="w-[1000px] border h-14 flex items-center p-4 justify-between rounded-md ">
//       {/* Today */}
//       <div
//         className="rounded-sm px-3 py-1 bg-blue-500 text-white font-semibold shadow-md active:bg-blue-300 cursor-pointer hover:bg-blue-400"
//         onClick={handleSetToday}
//       >
//         Today
//       </div>

//       {/* month-week toggle*/}
//       <div className="border border-gray-300 w-40 flex justify-evenly rounded-sm py-1 cursor-pointer">
//         <button className=" active:shadow-md rounded-sm px-3 py-1 active:bg-gray-100 cursor-pointer hover:bg-gray-100 bg-gray-100">
//           Month
//         </button>
//         <button className="active:shadow-md rounded-sm px-3 py-1 active:bg-gray-100 cursor-pointer hover:bg-gray-100">
//           Week
//         </button>
//       </div>
//       {/* day-night toggle */}
//       <div className="border px-3 py-1 rounded-sm text-xl cursor-pointer hover:bg-gray-50">
//         <IoMoon />
//       </div>
//     </div>
//   );
// };

// export default Header;

import { IoMoon } from "react-icons/io5";

type ViewType = "month" | "week";

interface Props {
  value?: Date;
  setCurrentDate?: (value: Date) => void;
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
}

const Header: React.FC<Props> = ({
  setCurrentDate,
  currentView,
  setCurrentView,
}) => {
  const handleSetToday = setCurrentDate
    ? () => setCurrentDate(new Date())
    : undefined;

  return (
    <div className="w-[865px] border h-14 flex items-center p-4 justify-between rounded-md ">
      {/* Today */}
      <div
        className="rounded-sm px-3 py-1 bg-blue-500 text-white font-semibold shadow-md active:bg-blue-300 cursor-pointer hover:bg-blue-400"
        onClick={handleSetToday}
      >
        Today
      </div>

      {/* month-week toggle*/}
      <div className="border border-gray-300 w-40 flex justify-evenly rounded-sm py-1 cursor-pointer">
        <button
          onClick={() => setCurrentView("month")}
          className={`active:shadow-md rounded-sm px-3 py-1 cursor-pointer hover:bg-gray-100 transition-colors ${
            currentView === "month" ? "bg-gray-100 font-semibold" : ""
          }`}
        >
          Month
        </button>
        <button
          onClick={() => setCurrentView("week")}
          className={`active:shadow-md rounded-sm px-3 py-1 cursor-pointer hover:bg-gray-100 transition-colors ${
            currentView === "week" ? "bg-gray-100 font-semibold" : ""
          }`}
        >
          Week
        </button>
      </div>

      {/* day-night toggle */}
      <div className="border px-3 py-1 rounded-sm text-xl cursor-pointer hover:bg-gray-50">
        <IoMoon />
      </div>
    </div>
  );
};

export default Header;
