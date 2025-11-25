import { z } from "zod";

// Calendar Event Schema
export const calendarEventSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().max(500, "Description must be less than 500 characters").optional(),
  startDate: z.date(),
  endDate: z.date(),
  color: z.string().optional(),
  category: z.string().optional(),
});

export const insertCalendarEventSchema = calendarEventSchema.omit({ id: true });

export type CalendarEvent = z.infer<typeof calendarEventSchema>;
export type InsertCalendarEvent = z.infer<typeof insertCalendarEventSchema>;

// View types
export type CalendarView = 'month' | 'week';
