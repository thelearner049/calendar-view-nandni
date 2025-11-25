// import { useEffect, useState, useMemo } from "react";
// import "./EventModal.css";
// import { format, parseISO } from "date-fns";
// import type { EventType } from "../../hooks/useEventManager";

// const toDateInputValue = (d: Date) => format(d, "yyyy-MM-dd");

// const splitIso = (iso: string) => {
//   const dateObj = parseISO(iso);
//   return {
//     date: format(dateObj, "yyyy-MM-dd"),
//     time: format(dateObj, "HH:mm"),
//   };
// };

// interface Props {
//   date: Date;
//   event?: EventType;
//   onSave?: (event: Omit<EventType, "id">) => void;
//   onUpdate?: (id: string, updated: Partial<EventType>) => void;
//   onDelete?: (id: string) => void;
//   onClose: () => void;
// }

// const EventModal: React.FC<Props> = ({
//   date,
//   event,
//   onClose,
//   onDelete,
//   onSave,
//   onUpdate,
// }) => {
//   //Form States
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [startTime, setStartTime] = useState("00:00");
//   const [endTime, setEndTime] = useState("00:00");
//   const [color, setColor] = useState("");
//   const [category, setCategory] = useState("Choose category");

//   const colorOptions = [
//     "#FF5733",
//     "#33FF57",
//     "#3357FF",
//     "#FF33A1",
//     "#A133FF",
//     "#33FFF6",
//     "#FFC133",
//     "#8DFF33",
//     "#FF3380",
//     "#33FFB5",
//   ];

//   const isEditing = useMemo(() => !!event, [event]);

//   //For Creating Event
//   useEffect(() => {
//     if (!isEditing && date) {
//       const d = toDateInputValue(date);
//       setStartDate(d);
//       setEndDate(d);
//       setStartTime("09:00");
//       setEndTime("10:00");
//       setColor("#FF5733");
//       setCategory("Meeting");
//     }
//   }, [date, isEditing]);

//   // For Editing Event

//   useEffect(() => {
//     if (isEditing && event) {
//       setTitle(event.title);
//       setDescription(event.description);
//       const s = splitIso(event.start);
//       const e = splitIso(event.end);
//       setStartDate(s.date);
//       setEndDate(e.date);
//       setStartTime(s.time);
//       setEndTime(e.time);
//       setColor(event.color);
//       setCategory(event.category);
//     }
//   }, [event, isEditing]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const eventData = {
//       title,
//       description,
//       start: `${startDate}T${startTime}`,
//       end: `${endDate}T${endTime}`,
//       color,
//       category,
//     };
//     if (isEditing && event && onUpdate) {
//       onUpdate(event.id, eventData);
//       return;
//     }

//     if (!isEditing && onSave) {
//       onSave(eventData);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-4">
//       <div className="flex justify-between">
//         <div className="flex flex-col items-start">
//           <h2 className="text-2xl font-bold r-2">Create Event</h2>
//           <p className="text-xs text-gray-500 r-2">
//             {isEditing ? "Edit this Event" : "Add a new event to your calendar"}
//           </p>
//         </div>
//         <button
//           type="button"
//           className="rounded-full px-4 py-1 border-2 text-sm hover:text-gray-700"
//           onClick={() => onClose()}
//         >
//           ✖
//         </button>
//       </div>
//       <div className="flex flex-col items-start">
//         <label htmlFor="title" className="items-start font-semibold">
//           Event Title *
//         </label>
//         <input
//           id="title"
//           type="text"
//           placeholder="e.g., Team Standup"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//       </div>
//       <div className="flex flex-col items-start">
//         <label htmlFor="description " className="items-start font-semibold">
//           Description
//         </label>
//         <textarea
//           placeholder="Enter your description..."
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full border px-3 py-2 rounded"
//         />
//       </div>
//       <div className="grid grid-cols-2 gap-4 text-left">
//         <div>
//           <label htmlFor="startDate" className="items-start font-semibold">
//             Start Date*
//           </label>
//           <input
//             id="startDate"
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             className="w-full border px-2 py-1 rounded-lg"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="startTime" className="items-start font-semibold">
//             Start Time*
//           </label>
//           <input
//             id="startTime"
//             type="time"
//             value={startTime}
//             onChange={(e) => setStartTime(e.target.value)}
//             className="w-full border px-2 py-1 rounded-lg"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="endDate" className="items-start font-semibold">
//             End Date*
//           </label>
//           <input
//             id="endDate"
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             className="w-full border px-2 py-1 rounded-lg"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="endTime" className="items-start font-semibold">
//             End Time*
//           </label>
//           <input
//             id="endTime"
//             type="time"
//             value={endTime}
//             onChange={(e) => setEndTime(e.target.value)}
//             className="w-full border px-2 py-1 rounded-lg"
//             required
//           />
//         </div>
//       </div>
//       <div className="flex flex-col items-start">
//         <label className="block mb-1 font-semibold">Choose Color</label>
//         <div className="flex gap-2 flex-wrap">
//           {colorOptions.map((c, i) => (
//             <button
//               key={c}
//               type="button"
//               onClick={() => setColor(c)}
//               className={`w-6 h-6 rounded-full border-2 ${
//                 color === c ? "border-black" : "border-transparent"
//               } c${i}`}
//               title={c}
//               aria-label={`Select color ${c}`}
//             />
//           ))}
//         </div>
//       </div>
//       <div className="flex flex-col items-start">
//         <label htmlFor="category" className="items-start font-semibold">
//           Category
//         </label>
//         <select
//           name="category"
//           id="category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="w-full border px-2 py-1 rounded-lg"
//         >
//           <option value="Meeting">Meeting</option>
//           <option value="Work">Work</option>
//           <option value="Personal">Personal</option>
//           <option value="Reminder">Reminder</option>
//         </select>
//       </div>
//       <div className="flex items-center gap-2">
//         <button
//           type="submit"
//           className="rounded-md px-3 py-2 bg-blue-500 text-white font-semibold shadow-md active:bg-blue-300 cursor-pointer hover:bg-blue-400"
//         >
//           {isEditing ? "Update Event" : "Save Event"}
//         </button>
//         {isEditing && event && (
//           <button
//             type="button"
//             className="rounded-md px-3 py-2 bg-red-500 text-white font-semibold shadow-md active:bg-red-300 cursor-pointer hover:bg-red-400"
//             onClick={() => onDelete?.(event.id)}
//           >
//             Delete
//           </button>
//         )}
//       </div>
//     </form>
//   );
// };

// export default EventModal;

import { useEffect, useState, useMemo } from "react";
import "./EventModal.css";
import { format, parseISO } from "date-fns";
import type { EventType } from "../../hooks/useEventManager";

const toDateInputValue = (d: Date) => format(d, "yyyy-MM-dd");

const splitIso = (iso: string) => {
  const dateObj = parseISO(iso);
  return {
    date: format(dateObj, "yyyy-MM-dd"),
    time: format(dateObj, "HH:mm"),
  };
};

interface Props {
  date: Date;
  event?: EventType;
  onSave?: (event: Omit<EventType, "id">) => void;
  onUpdate?: (id: string, updated: Partial<EventType>) => void;
  onDelete?: (id: string) => void;
  onClose: () => void;
}

const EventModal: React.FC<Props> = ({
  date,
  event,
  onClose,
  onDelete,
  onSave,
  onUpdate,
}) => {
  //Form States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [color, setColor] = useState("");
  const [category, setCategory] = useState("Choose category");

  const colorOptions = [
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

  const isEditing = useMemo(() => !!event, [event]);

  //For Creating Event
  useEffect(() => {
    if (!isEditing && date) {
      const d = toDateInputValue(date);
      setStartDate(d);
      setEndDate(d);
      setStartTime("09:00");
      setEndTime("10:00");
      setColor("#FF5733");
      setCategory("Meeting");
    }
  }, [date, isEditing]);

  // For Editing Event

  useEffect(() => {
    if (isEditing && event) {
      setTitle(event.title);
      setDescription(event.description);
      const s = splitIso(event.start);
      const e = splitIso(event.end);
      setStartDate(s.date);
      setEndDate(e.date);
      setStartTime(s.time);
      setEndTime(e.time);
      setColor(event.color);
      setCategory(event.category);
    }
  }, [event, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eventData = {
      title,
      description,
      start: `${startDate}T${startTime}`,
      end: `${endDate}T${endTime}`,
      color,
      category,
    };
    if (isEditing && event && onUpdate) {
      onUpdate(event.id, eventData);
      return;
    }

    if (!isEditing && onSave) {
      onSave(eventData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
      <div className="flex justify-between items-start">
        <div className="flex flex-col items-start">
          <h2 className="text-xl md:text-2xl font-bold">
            {isEditing ? "Edit Event" : "Create Event"}
          </h2>
          <p className="text-xs text-gray-500">
            {isEditing ? "Edit this Event" : "Add a new event to your calendar"}
          </p>
        </div>
        <button
          type="button"
          className="rounded-full px-3 py-1 border-2 text-sm hover:text-gray-700"
          onClick={() => onClose()}
        >
          ✖
        </button>
      </div>

      <div className="flex flex-col items-start">
        <label
          htmlFor="title"
          className="items-start font-semibold text-sm md:text-base"
        >
          Event Title *
        </label>
        <input
          id="title"
          type="text"
          placeholder="e.g., Team Standup"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded text-sm md:text-base"
          required
        />
      </div>

      <div className="flex flex-col items-start">
        <label
          htmlFor="description"
          className="items-start font-semibold text-sm md:text-base"
        >
          Description
        </label>
        <textarea
          placeholder="Enter your description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded text-sm md:text-base min-h-[60px]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-left">
        <div>
          <label
            htmlFor="startDate"
            className="items-start font-semibold text-sm md:text-base"
          >
            Start Date*
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border px-2 py-1 rounded-lg text-sm md:text-base"
            required
          />
        </div>
        <div>
          <label
            htmlFor="startTime"
            className="items-start font-semibold text-sm md:text-base"
          >
            Start Time*
          </label>
          <input
            id="startTime"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border px-2 py-1 rounded-lg text-sm md:text-base"
            required
          />
        </div>
        <div>
          <label
            htmlFor="endDate"
            className="items-start font-semibold text-sm md:text-base"
          >
            End Date*
          </label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border px-2 py-1 rounded-lg text-sm md:text-base"
            required
          />
        </div>
        <div>
          <label
            htmlFor="endTime"
            className="items-start font-semibold text-sm md:text-base"
          >
            End Time*
          </label>
          <input
            id="endTime"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full border px-2 py-1 rounded-lg text-sm md:text-base"
            required
          />
        </div>
      </div>

      <div className="flex flex-col items-start">
        <label className="block mb-1 font-semibold text-sm md:text-base">
          Choose Color
        </label>
        <div className="flex gap-2 flex-wrap">
          {colorOptions.map((c, i) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 ${
                color === c ? "border-black" : "border-transparent"
              } c${i}`}
              title={c}
              aria-label={`Select color ${c}`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-start">
        <label
          htmlFor="category"
          className="items-start font-semibold text-sm md:text-base"
        >
          Category
        </label>
        <select
          name="category"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-2 py-1 rounded-lg text-sm md:text-base"
        >
          <option value="Meeting">Meeting</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Reminder">Reminder</option>
        </select>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
        <button
          type="submit"
          className="rounded-md px-3 py-2 bg-blue-500 text-white font-semibold shadow-md active:bg-blue-300 cursor-pointer hover:bg-blue-400 text-sm md:text-base"
        >
          {isEditing ? "Update Event" : "Save Event"}
        </button>
        {isEditing && event && (
          <button
            type="button"
            className="rounded-md px-3 py-2 bg-red-500 text-white font-semibold shadow-md active:bg-red-300 cursor-pointer hover:bg-red-400 text-sm md:text-base"
            onClick={() => onDelete?.(event.id)}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default EventModal;
