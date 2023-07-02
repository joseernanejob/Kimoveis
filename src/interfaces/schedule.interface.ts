import { z } from "zod";
import { scheduleSchema } from "../schemas";

type Schedule = z.infer<typeof scheduleSchema.schedules>;

type CreateSchedule = z.infer<typeof scheduleSchema.create>;

export { Schedule, CreateSchedule };
