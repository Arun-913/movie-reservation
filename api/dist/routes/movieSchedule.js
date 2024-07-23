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
exports.movieSchedule = void 0;
const express_1 = require("express");
const db_1 = require("../db");
exports.movieSchedule = (0, express_1.Router)();
exports.movieSchedule.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movie_id, theater_id, slot } = req.body;
    const show_time = typeof req.body.show_time !== undefined ? new Date(req.body.show_time) : req.body.show_time;
    try {
        const response = yield db_1.prismaClient.movieSchedule.create({
            data: {
                movie_id,
                theater_id,
                show_time,
                slot,
            }
        });
        return res.json(response);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}));
exports.movieSchedule.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db_1.prismaClient.movie.findMany();
        return res.json(response);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}));
exports.movieSchedule.get('/title/:title', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.params.title;
    try {
        const response = yield db_1.prismaClient.movie.findFirst({
            where: {
                title
            }
        });
        return res.json(response);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}));
