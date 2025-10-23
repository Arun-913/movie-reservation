import { prismaClient } from "@/db";
import { MovieCard } from "./MovieCard";
import { MoviesType } from "@/types";

export const Hero = async () => {
    const rawMovies = await prismaClient.movie.findMany({
        take: 5  
    });
    console.log(rawMovies.length)

    const movies: MoviesType[] = rawMovies.map(movie => ({
        ...movie,
        genre: movie.genre || "Unknown Genre",
        release_date: movie.release_date || new Date(),
        metadata: movie.metadata as MoviesType["metadata"],
    }));

    return (
        <div className="px-20 pt-5 pb-10">
            {/* <div className="font-bold text-2xl">Recommended Movies</div> */}
            <div className="flex justify-between overflow-x-auto">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        imageUrl={movie.metadata.imageUrl}
                        movieName={movie.title}
                        genre={movie.genre}
                        id={movie.id}
                    />
                ))}
            </div>
        </div>
    );
};
