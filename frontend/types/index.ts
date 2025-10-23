
export interface MoviesType {
    id: string;
    title: string;
    genre: string;
    duration: number;
    release_date: Date;
    metadata: {
        imageUrl: string,
        bgImageUrl: string,
        dimensions: string[],
        languages: string[],
        description: string,
        casters: {
            names: string[],
            urls: string[],
        },
        crews: {
            names: string[],
            urls: string[],
        },
    }
}

export interface ScheduledMovieType {
    id: string,
    movie_id: string,
    theater_id: string,
    show_time: Date,
    slot: number,
    created_at: Date,
    theater: {
        id: string,
        name: string,
        location: string,
        created_at: string,
    }
}