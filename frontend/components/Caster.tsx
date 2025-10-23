interface CastersProps {
    casters: {
        names: string[],
        urls: string[],
    }
}

export const Casters: React.FC<CastersProps> = ({ casters }) =>{

    return <div className="mx-20">
        <hr />
        <div className="font-bold text-2xl my-12">Cast</div>
        <div className="flex justify-start">
            {casters.names.map((name, index) =>{
                return <div key={index} className="w-32 mb-12 mx-4">
                    <img src={casters.urls[index]} alt="" className="rounded-full h-32"  />
                    <div className="text-center">{casters.names[index]}</div>
                </div>
            })}
        </div>
    </div>
}