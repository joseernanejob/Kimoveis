import { z } from "zod";
import { createAddress, address } from "./address.schema";
import { scheduleReturn } from "./schedule.schema";

const realEstate = z.object({
  id: z.number().positive(),
  sold: z.boolean().default(() => false),
  value: z.union([z.number(), z.string()]),
  size: z.number().positive(),
  createdAt: z.string(),
  updatedAt: z.string(),
  address: address,
  categoryId: z.number().positive(),
});

const createRealEstate = realEstate
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    address: createAddress,
  });

const returnRealEstateSchedule = realEstate.omit({ categoryId: true }).extend({
  schedules: scheduleReturn.array(),
});

const realEstateReturn = realEstate.omit({ categoryId: true });
const read = realEstateReturn.array();

export {
  realEstate,
  createRealEstate,
  read,
  returnRealEstateSchedule,
  realEstateReturn,
};
