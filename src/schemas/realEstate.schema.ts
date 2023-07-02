import { z } from "zod";
import { createAddress, address } from "./address.schema";

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

const read = createRealEstate.array();

export { realEstate, createRealEstate, read };
