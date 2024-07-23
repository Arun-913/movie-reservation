import cron from 'node-cron';
import dayjs from 'dayjs';
import { prismaClient } from "./db";

const main = (): void => {
    setInterval(()=>{
        const now = dayjs();
        
        const futureDate = now.add(1, 'minute');
    
        const minute = futureDate.minute();
        const hour = futureDate.hour();
        const dayOfMonth = futureDate.date();
        const month = futureDate.month() + 1;
        const dayOfWeek = futureDate.day();
    
        const cronExpression = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
        
        console.log(`Scheduled task to run at: ${cronExpression}`);
        
        cron.schedule(cronExpression, async () => {
            console.log("here");
            try {
                const now = dayjs().toISOString();
        
                const res = await prismaClient.lockedSeat.findMany({
                    where: {}
                });
        
                const deletedReservations = await prismaClient.lockedSeat.deleteMany({
                    where: {
                        deleteAt: {
                            lt: now,
                        },
                    },
                });
        
                
                console.log(`Deleted ${deletedReservations.count} expired reservations`);
            } catch (error) {
                console.error('Error deleting expired reservations:', error);
            }
        });
    }, 5 * 60 * 1000);
};

main();
