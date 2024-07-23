"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient;
const prismaClientSingleton = () => {
    return new client_1.PrismaClient();
};
exports.prismaClient = (_a = globalThis.prismaGlobal) !== null && _a !== void 0 ? _a : prismaClientSingleton();
if (process.env.NODE_ENV !== 'production')
    globalThis.prismaGlobal = exports.prismaClient;
