"use client"
import React from 'react';
import { PrimaryButton } from '@/components/buttons/PrimaryButton';
import { MoviesType } from '@/types';
import { useRouter } from 'next/navigation';

interface HeroMovieProps {
    movie: MoviesType
}

export const HeroMovie: React.FC<HeroMovieProps> = ({ movie }) => {
    const duration = movie.duration;
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    const router = useRouter();
    const name = movie.title.replaceAll(' ', '_');

    return (
        <div className="relative">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat shadow-inner"
                style={{ backgroundImage: `url(${movie.metadata.bgImageUrl})` }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="relative z-10 mx-20 py-10 flex text-white">
                <img className="w-56 rounded-lg shadow-2xl" src={movie.metadata.imageUrl} alt={movie.title} />
                <div className='flex justify-start items-center w-4/5'>
                    <div className='mx-10 min-w-full'>
                        <div className='font-bold text-4xl'>{movie.title}</div>
                        <div className='my-4'>
                            {movie.metadata.dimensions.map(d => (
                                <span key={d} className='bg-slate-300 text-black w-auto p-2 mx-2 rounded'>{d}</span>
                            ))}
                            {movie.metadata.languages.map(lag => (
                                <span key={lag} className='bg-slate-300 text-black w-auto p-2 mx-2 rounded'>{lag}</span>
                            ))}
                        </div>
                        <div className='my-2'>{hours}h {minutes}m</div>
                        <div className='my-2'>{movie.genre}</div>
                        <PrimaryButton 
                            size="big"
                            onClick={() => router.push(`/buytickets/${name}/${movie.id}`)}
                        >Book tickets</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
