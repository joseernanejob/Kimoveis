import { z } from "zod";

const address = z.object({
  id: z.number().positive(),
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.string().max(7).optional(),
  city: z.string().max(20),
  state: z.string().max(2),
});

const createAddress = address.omit({ id: true });

export { createAddress, address };
