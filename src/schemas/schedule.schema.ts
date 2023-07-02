import { z } from "zod";
import { realEstate } from "./realEstate.schema";
import { user } from "./user.schema";

const schedules = z.object({
  id: z.number().positive(),
  date: z.string(),
  hour: z.string(),
  realEstate: realEstate,
  user: user,
});

const create = schedules
  .omit({ id: true, user: true, realEstate: true })
  .extend({
    realEstateId: z.number(),
  });

const scheduleReturn = schedules.omit({
  realEstate: true,
});

export { schedules, create, scheduleReturn };
