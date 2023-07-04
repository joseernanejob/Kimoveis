import { Request, Response, NextFunction } from "express";
import { scheduleRepository, userRepository } from "../repositories";
import AppError from "../error";

const verifyDate = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<void> => {
  const { date, realEstateId, hour } = req.body;
  const userId = resp.locals.decoded.sub;
  const user = await userRepository.findOneBy({ id: Number(userId) });
  if (!user) throw new AppError("User not Found", 404);
  resp.locals = { ...resp.locals, user };

  const scheduleUser = await scheduleRepository
    .createQueryBuilder("s")
    .leftJoin("s.user", "u")
    .where("u.id = :id", { id: user.id })
    .andWhere("s.date = :date", { date })
    .andWhere("s.hour = :hour", { hour })
    .getOne();

  if (scheduleUser)
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );

  const scheduleDate = await scheduleRepository
    .createQueryBuilder("s")
    .leftJoin("s.realEstate", "re")
    .where("re.id = :id", { id: realEstateId })
    .andWhere("s.date = :date", { date })
    .andWhere("s.hour = :hour", { hour })
    .getOne();

  if (scheduleDate)
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );

  const [hours, minutes] = hour.split(":").map(Number);

  if (hours < 8 || hours > 18 || (hours == 18 && minutes > 0))
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);

  const newDate = new Date(date);
  if (newDate.getDay() == 0 || newDate.getDay() == 6)
    throw new AppError("Invalid date, work days are monday to friday", 400);

  return next();
};

export { verifyDate };
