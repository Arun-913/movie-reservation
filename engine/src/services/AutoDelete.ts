import cron from 'node-cron';
import dayjs from 'dayjs';
import { prismaClient } from "../db";

const scheduleDeletionTask = (): void => {
  const now = dayjs();
  const futureDate = now.add(1, 'minute');

  const minute = futureDate.minute();
  const hour = futureDate.hour();
  const dayOfMonth = futureDate.date();
  const month = futureDate.month() + 1; // dayjs months are 0-indexed
  const dayOfWeek = futureDate.day();

  const cronExpression = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
  
  console.log(`Scheduled task to run at: ${cronExpression}`);

  cron.schedule(cronExpression, async () => {
    try {
      const now = dayjs().toISOString();

      const res = await prismaClient.lockedSeat.findMany({
        where: {}
      });
      console.log(res);

      const deletedReservations = await prismaClient.lockedSeat.deleteMany({
        where: {
          deleteAt: {
            lt: now,
          },
        },
      });

      console.log(deletedReservations);
    
      console.log(`Deleted ${deletedReservations.count} expired reservations`);
    } catch (error) {
      console.error('Error deleting expired reservations:', error);
    }
  });
};

// Schedule the deletion task
scheduleDeletionTask();
