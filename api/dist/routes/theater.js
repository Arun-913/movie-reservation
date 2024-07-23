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
Object.defineProperty(exports, "__esModule", { value: true });
exports.theaterRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const zod_1 = require("../types/zod");
exports.theaterRouter = (0, express_1.Router)();
exports.theaterRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let name = req.body.name.toLowerCase(), location = req.body.location.toLowerCase();
    try {
        zod_1.TheaterPostSchema.parse({ name, location });
        const response = yield db_1.prismaClient.theater.create({
            data: {
                name,
                location
            }
        });
        return res.json(response);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}));
exports.theaterRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db_1.prismaClient.theater.findMany();
        return res.json(response);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}));
exports.theaterRouter.get('/name/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.params.name;
    try {
        const response = yield db_1.prismaClient.theater.findFirst({
            where: {
                name
            }
        });
        return res.json(response);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}));
