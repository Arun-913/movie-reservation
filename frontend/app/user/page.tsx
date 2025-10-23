import { getServerSession } from "next-auth"

export default async function Home(){
    const session = await getServerSession();
    return <div>
        User Page <br />
        {JSON.stringify(session)}
    </div>
}