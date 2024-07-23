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
exports.movieRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const zod_1 = require("../types/zod");
exports.movieRouter = (0, express_1.Router)();
exports.movieRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { title, metadata, genre, duration, release_date, end_date } = req.body;
    title = title.toLowerCase(), genre = genre.toLowerCase();
    const r = typeof release_date !== undefined ? new Date(release_date) : release_date;
    const e = typeof end_date !== undefined ? new Date(end_date) : end_date;
    try {
        zod_1.MoviePostZodSchema.parse({ title, metadata, genre, duration, r, e });
        const response = yield db_1.prismaClient.movie.create({
            data: {
                title,
                metadata,
                genre,
                duration,
                release_date,
                end_date
            }
        });
        return res.json(response);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}));
exports.movieRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db_1.prismaClient.movie.findMany();
        return res.json(response);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}));
exports.movieRouter.get('/title/:title', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
