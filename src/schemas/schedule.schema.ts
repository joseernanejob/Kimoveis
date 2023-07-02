import { string, z } from "zod";
import { realEstate } from "./realEstate.schema";
import { user } from "./user.schema";

const schedules = z.object({
  id: z.number().positive(),
  date: string(),
  hour: string(),
  realEstateId: z.number(),
  user: user,
});

const create = schedules.omit({ id: true, user: true });

export { schedules, create };
