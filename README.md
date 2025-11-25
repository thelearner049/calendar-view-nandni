# Calendar View Component

A fully responsive calendar application built with React, Typescript, and Tailwind CSS. Features month and weak views with event management capabilities.

## Lice Demo

[url]

## Installation

```bash
npm install
npm run dev
```

## Architecture

This project follows component-based architecture with shared state management:

• App.tsx - Main application wrapper managing global state
• Header.tsx - Header contains Today navigation and view switching
• Calendar.tsx - Month view component with grid layout 
• WeekView.tsx - Week view component with time based scheduling
• MobileCalendar.tsx - Mobile-optimized list view with expandable days
• EventSidebar.tsx - Desktop sidebar showing categorized events
• EventModal.tsx - Reusable modal for creating and editing events
• useEeventManager.ts - Custom hook for centralized event state management

## Features

### Core Funcationalities
✅ Month View - Month view displays 42-cell grid correctly
✅ Week view - displays time slots correctly
✅ Event Management - Create , Edit and Delete events
✅ Event Details - Title, Description, Start/end time, Color, and Category
✅ Desktop/Tablet - Full 7-col grid with event sidebar
✅ Mobile - List view with expandable days

### User Experience
✅ Today Navigation - Quick jump to current date
✅ View Switching - Toggle between month-week view
✅ Smooth Animation - Transition for modals and intercations


## Project Structure

```
src/
├── components/
│   ├── Calendar/
│   │   ├── Calendar.tsx          # Month view component
│   │   ├── WeekView.tsx          # Week view component
│   │   ├── MobileCalendar.tsx    # Mobile list view
│   │   ├── EventSidebar.tsx      # Desktop event sidebar
│   │   ├── EventModal.tsx        # Event creation/edit modal
│   │   ├── Header.tsx            # Navigation header
│   │   └── Cell.tsx              # Calendar cell component
│   └── primitives/
│       ├── Modal.tsx             # Reusable modal wrapper
├── hooks/
│   └── useEventManager.ts        # Event state management hook
├── utils/
│   └── colorClassMap.ts          # Color mapping utility
├── App.tsx                       # Main application component
└── main.tsx                      # Application entry point
```

## Technologies

### Core
• React 18
• TypeScript
• Vite

### Styling
• Tailwind CSS
• Responsive Design

### Utilities
• date-fns
• lucid-react icon library
• clsx

## Future Enhancements
- Drag and dropt events between dates
- Event search and filtering
- Dark mode support
- Event reminders and notifications

## Author

Nandni Atray
thelearner049@gmail.com

## Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ using React, TypeScript, Tailwind CSS and ☕.