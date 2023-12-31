import { z } from "zod";
import { realEstateSchema } from "../schemas";

type RealEstate = z.infer<typeof realEstateSchema.realEstate>;

type CreateRealEstate = z.infer<typeof realEstateSchema.createRealEstate>;

type ReadRealEstate = z.infer<typeof realEstateSchema.read>;

type ReturnRealEstateSchedule = z.infer<
  typeof realEstateSchema.returnRealEstateSchedule
>;

type ReturnRealEstate = z.infer<typeof realEstateSchema.realEstateReturn>;

export {
  RealEstate,
  CreateRealEstate,
  ReadRealEstate,
  ReturnRealEstateSchedule,
  ReturnRealEstate,
};
