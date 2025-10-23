import { prismaClient } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;
        
        if (!id || typeof id !== "string") {
            return res.status(400).json({ error: "Invalid ID parameter" });
        }

        const movie = await prismaClient.movie.findFirst({
            where: {
                id: id
            }
        });

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        return res.status(200).json(movie);
    } catch (error) {
        console.error("Error fetching movie:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
