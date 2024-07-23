"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const dayjs_1 = __importDefault(require("dayjs"));
const db_1 = require("./db");
const main = () => {
    setInterval(() => {
        const now = (0, dayjs_1.default)();
        const futureDate = now.add(1, 'minute');
        const minute = futureDate.minute();
        const hour = futureDate.hour();
        const dayOfMonth = futureDate.date();
        const month = futureDate.month() + 1;
        const dayOfWeek = futureDate.day();
        const cronExpression = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
        console.log(`Scheduled task to run at: ${cronExpression}`);
        node_cron_1.default.schedule(cronExpression, () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("here");
            try {
                const now = (0, dayjs_1.default)().toISOString();
                const res = yield db_1.prismaClient.lockedSeat.findMany({
                    where: {}
                });
                const deletedReservations = yield db_1.prismaClient.lockedSeat.deleteMany({
                    where: {
                        deleteAt: {
                            lt: now,
                        },
                    },
                });
                console.log(`Deleted ${deletedReservations.count} expired reservations`);
            }
            catch (error) {
                console.error('Error deleting expired reservations:', error);
            }
        }));
    }, 5 * 60 * 1000);
};
main();
