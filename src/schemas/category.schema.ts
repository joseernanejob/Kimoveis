import { z } from "zod";

const category = z.object({
  id: z.number().positive(),
  name: z.string().max(45).min(0),
});

const createCategory = category.omit({ id: true, realEstate: true });
const read = category.array();

export { category, createCategory, read };
