"use client"
import { useRouter } from "next/navigation";

export const MovieCard = ({ imageUrl, movieName, genre, id }: {imageUrl: string, movieName: string, genre: string, id:string }) =>{
    const router = useRouter();
    const name = movieName.replaceAll(' ', '_');

    return (
        <div 
            className="cursor-pointer"
            onClick={() => router.push(`movies/${name}/${id}`)}
        >
            <img className="w-56 rounded-lg" src={imageUrl} alt="" />
            <div className="font-semibold text-lg ">{movieName}</div>
            <div className="font-normal text-sm text-slate-500">{genre}</div>
        </div>
    );
}