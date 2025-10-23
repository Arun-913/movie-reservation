import { Hero } from "@/components/Hero";
import { HeorBanner } from "@/components/HeroBanner";


export default function Home() {
    const imageUrl = "https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg";

    return <div>
        <Hero />
        <HeorBanner imageUrl="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120/stream-leadin-web-collection-202210241242.png"/>
        <Hero />
    </div>
}