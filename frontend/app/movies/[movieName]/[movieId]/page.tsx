"use client"
import React, { use, useEffect, useState } from 'react';
import { HeroMovie } from '@/components/HeroMovie';
import { Casters } from '@/components/Caster';
import { MovieDescription } from '@/components/MovieDescription';
import { Crews } from '@/components/Crews';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { MoviesType } from '@/types';

export default function MovieDetails() {
    const [movie, setMovie] = useState<MoviesType | null>(null);
    const params = useParams();
    
    useEffect(() =>{
        async function fetchMovie(){
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/movie/id/${params.movieId}`)
                setMovie(response.data);                
            } catch (error) {
                console.error("Error in Fetching Movie Details");
            }
        }

        fetchMovie();
    }, [])

    if(!movie){
        return <div>Loading...</div>
    }
    
    return <div>
        <HeroMovie movie={movie}/>
        <MovieDescription description={movie.metadata.description} />
        <Casters casters={movie.metadata.casters} />
        <Crews crews={movie.metadata.crews} />
    </div>
}
