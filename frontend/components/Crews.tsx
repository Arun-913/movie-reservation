interface CrewsProps {
    crews: {
        names: string[],
        urls: string[],
    }
}

export const Crews: React.FC<CrewsProps> = ({ crews }) =>{

    return <div className="mx-20">
        <hr />
        <div className="font-bold text-2xl my-12">Crew</div>
        <div className="flex justify-start">
            {crews.names.map((name, index) =>{
                return <div key={index} className="w-32 mb-12 mx-4">
                    <img src={crews.urls[index]} alt="" className="rounded-full h-32"  />
                    <div className="text-center">{crews.names[index]}</div>
                </div>
            })}
        </div>
    </div>
}