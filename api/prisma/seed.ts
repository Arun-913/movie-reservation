import { PrismaClient } from "@prisma/client";
import { prismaClient } from "../src/db";

const primsaClient = new PrismaClient();


async function seedUsers(){
    try {
        prismaClient.user.upsert({
            where: {
                id: 1,
            },
            create: {
                id: 1,
                username: "Test User 1",
                email: 'testuser1@gmail.com',
                password: 'random123'
            },
            update: {},
        })
    
        primsaClient.user.upsert({
            where: {
                id: 2,
            },
            create: {
                id: 2,
                username: "Test User 2",
                email: 'testuser2@gmail.com',
                password: 'random123'
            },
            update: {},
        })
    } catch (error) {
        console.error('Error seeding users: ', error);
        throw error;
    }
}

async function seedTheaters() {
    const theaters = [
        {
            name: 'INOX',
            location: 'Raghuleela Mall, Vashi',
        },
        {
            name: 'Fun Cinemas',
            location: 'K Star Mall, Chembur',
        },
        {
            name: 'Movietime Cubic Mall',
            location: 'Chembur',
        },
        {
            name: 'Chitra Cinema',
            location: 'Dadar(Newly Renovated)',
        },
        {
            name: 'Gold Cinema',
            location: 'Dadar(E)',
        },
        {
            name: 'INOX',
            location: 'Nakshatra Mall, Dadar(W)',
        },
        {
            name: 'INOX',
            location: 'Neelyog, Ghatkopar(E)',
        },
        {
            name: 'INOX',
            location: 'R-City, Ghatkopar',
        },
        {
            name: 'PVR',
            location: 'Odeon Mall, Ghatkopar',
        },
        {
            name: 'Rajhans Cinemas',
            location: 'Helix 3, Ghatkopar',
        },
        {
            name: 'Movietime Star City',
            location: 'Matunga(W)',
        },
        {
            name: 'INOX',
            location: 'Megaplex, Inorbit Mall, Malad',
        },
        {
            name: 'Bharat Cineplex',
            location: 'Kurla(W)',
        },
        {
            name: 'PVR',
            location: 'Market City, Kurla(Premiere)'
        }
    ];

    try {
        const existingTheaters = await primsaClient.theater.findMany();
        if(existingTheaters.length > 0){
            console.error('DB is already seeded with theater.');
            return;
        }

        await primsaClient.theater.createMany({ data: theaters });
    } catch (error) {
        console.error('Error seeding theaters:', error);
        throw error;
    }
}

async function seedMovies() {
    const movies = [
        {
            title: 'The UP Files',
            genre: 'Drama, Political',
            duration: 130,
            release_date: new Date("2024-07-26"),
            metadata: {
                imageUrl: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@like_202006280402.png,lx-24,ly-617,w-29,l-end:l-text,ie-NS4xSyBMaWtlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00391654-axsmyzamge-portrait.jpg",
                bgImageUrl: "https://assets-in.bmscdn.com/discovery-catalog/events/et00391654-rqlytjvlbv-landscape.jpg",
                dimensions: ["2D", "3D"],
                languages: ["Hindi", "English"],
                description: "Inspired by true events, Abhay Singh gets elected as the chief minister of UP and gets to work while facing issues within the state.",
                casters: {
                    names: ["Manoj Joshi", "Manjari Fadnis", "Ali Asagar", "Ashok Samarth", "Milind Gunaji"],
                    urls: ["https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/manoj-joshi-3394-1710657044.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/manjari-fadnis-1096197-1648207508.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/ali-asgar-6234-24-03-2017-12-31-06.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/ashok-samarth-245-1705478059.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/milind-gunaji-3352-24-03-2017-12-34-06.jpg"]
                },
                crews: {
                    names: ["Neeraj Sahai", "Kuldeep Umaraosingh", "Dilip Sen", "Ganesh Acharya"],
                    urls: ["https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/neeraj-sahai-2035404-1710661046.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/kuldeep-umraosingh-ostwal-2035475-1710828101.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/dilip-sen-7063-13-10-2017-18-08-42.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/ganesh-acharya-706-24-03-2017-17-34-34.jpg"]
                }
            }
        },
        {
            title: 'Stree 2: Sarkate Ka Aatank',
            genre: 'Comedy, Horror',
            duration: 149,
            release_date: new Date("2024-08-15"),
            metadata: {
                imageUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/stree-2-et00364249-1721725490.jpg",
                bgImageUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/stree-2-et00364249-1721725490.jpg",
                dimensions: ["2D"],
                languages: ["Hindi"],
                description: "After the events of Stree, the town of Chanderi is being haunted again. This time, women are mysteriously abducted by a terrifying headless entity. Once again, it`s up to Bicky and his friends to save their town and loved ones.",
                casters: {
                    names: ["Shraddha Kapoor", "Rajkummar Rao", "Pankaj Tripathi", "Aparshakti Khurana", "Abhishek Banerjee", "Tamannaah Bhatia"],
                    urls: ["https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/shraddha-kapoor-23323-1676723901.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/rajkummar-rao-1043890-20-12-2017-03-34-28.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/pankaj-tripathi-29809-23-03-2017-02-54-29.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/aparshakti-khurana-1077032-1705845871.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/abhishek-banerjee-1084840-08-08-2017-16-16-01.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/tamannaah-bhatia-16842-20-12-2017-04-21-12.jpg"]
                },
                crews: {
                    names: ["Amar Kaushik", "Dinesh Vijan", "Jyoti Deshpande", "Maddock Films", "Jio Studios", "Niren Bhatt"],
                    urls: ["https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/amar-kaushik-iein008750-24-03-2017-14-02-49.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/dinesh-vijan-1070169-02-05-2017-10-33-25.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/jyoti-deshpande-2029268-1724071065.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/maddock-films-2038889-1721728602.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/jio-studios-2023260-1721728788.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/niren-bhatt-1047757-24-03-2017-14-17-17.jpg"]
                }
            }
        },
        {
            title: 'Alien: Romulus',
            genre: 'Horror, Sci-Fri, Thriller',
            duration: 121,
            release_date: new Date("2024-08-23"),
            metadata: {
                imageUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/alien-romulus-et00392124-1711009372.jpg",
                bgImageUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/alien-romulus-et00392124-1711009372.jpg",
                dimensions: ["2D", "IMAX 2D", "MX4D", "4DX", "ICE", "2D SCREEN X"],
                languages: ["English", "Hindi", "Telugu", "Tamil"],
                description: "While scavenging the deep ends of a derelict space station, a group of young space colonizers face the most terrifying life form in the universe.",
                casters: {
                    names: ["Cailee Spaeny", "David Jonsson", "Isabela Merced", "Archie Renaux", "Aileen Wu"],
                    urls: ["https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/cailee-spaeny-2011347-18-01-2021-01-59-03.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/david-jonsson-2035530-1710995740.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/isabela-merced-2035531-1710995838.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/archie-renaux-2035532-1710995950.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/aileen-wu-2035533-1710996067.jpg"]
                },
                crews: {
                    names: ["Fede Alvarez", "Ridley Scott", "Walter Hill", "Rodo Sayagues", "Benjamin Wallfisch"],
                    urls: ["https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/fede-alvarez-29168-24-03-2017-16-00-55.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/ridley-scott-1878-13-09-2017-02-23-16.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/walter-hill-34384-06-04-2021-15-32-34.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/rodo-sayagues-1068309-09-07-2021-04-46-33.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/benjamin-wallfisch-1085226-14-08-2017-14-38-06.jpg"]
                }
            }
        },
        {
            title: 'Vedaa',
            genre: 'Action, Drama',
            duration: 151,
            release_date: new Date("2024-08-15"),
            metadata: {
                imageUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/vedaa-et00386426-1723550870.jpg",
                bgImageUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/vedaa-et00386426-1723550870.jpg",
                dimensions: ["2D"],
                languages: ["Hindi", "Telugu", "Tamil"],
                description: "It is the story of a young woman who fought back, steered, and championed by the one man she believed was her saviour, who became her weapon. It is the story of a man who found himself while helping Vedaa find justice.",
                casters: {
                    names: ["John Abraham", "Sharvari Wagh", "Abhishek Banerjee", "Tamannaah Bhatia"],
                    urls: ["https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/john-abraham-1017-1688367351.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/sharvari-wagh-2007921-1707291905.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/abhishek-banerjee-1084840-08-08-2017-16-16-01.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/tamannaah-bhatia-16842-20-12-2017-04-21-12.jpg"]
                },
                crews: {
                    names: ["Nikkhil Advani", "Zee Studios", "Monisha Advani", "Madhu Bhojwani", "John Abraham", "Aseem Arora"],
                    urls: ["https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/nikkhil-advani-1599-24-03-2017-12-39-34.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/zee-studios-1090737-11-06-2018-04-13-39.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/monisha-advani-2029095-1688215417.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/madhu-bhojwani-2029096-1688215574.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/john-abraham-1017-1688367351.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/aseem-arora-7585-13-09-2017-12-10-34.jpg"]
                }
            }
        },
        {
            title: 'Deadpool & Wolverine',
            genre: 'Action, Adventures, Comedy',
            duration: 127,
            release_date: new Date("2024-07-26"),
            metadata: {
                imageUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/deadpool-and-wolverine-et00341295-1718018322.jpg",
                bgImageUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/deadpool-and-wolverine-et00341295-1718018322.jpg",
                dimensions: ["2D", "2D SCREEN X", "3D", "MX4D 3D", "3D", "IMAX 2D"],
                languages: ["English", "Hindi", "Telugu", "Tamil"],
                description: "Wolverine is recovering from his injuries when he meets the loudmouth, Deadpool. They team up to defeat a common enemy.",
                casters: {
                    names: ["Ryan Reynolds", "Hugh Jackman", "Morena Baccarin", "Matthew Macfadyen", "Karan Soni", "Leslie Uggams", "Rob Delaney"],
                    urls: ["https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/ryan-reynolds-1955-14-08-2020-02-54-15.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/hugh-jackman-835-24-03-2017-17-59-39.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/morena-baccarin-1052433-01-12-2020-01-25-06.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/matthew-macfadyen-4766-22-10-2018-12-49-54.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/karan-soni-1058251-24-03-2017-16-18-57.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/leslie-uggams-1060642-24-03-2017-16-20-34.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/rob-delaney-1092791-16-05-2018-09-51-39.jpg"]
                },
                crews: {
                    names: ["Shawn Levy", "Ryan Reynolds", "Kevin Feige", "Paul Wernick", "Rhett Reese", "George Richmond"],
                    urls: ["https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/shawn-levy-2117-24-03-2017-12-45-15.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/ryan-reynolds-1955-14-08-2020-02-54-15.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/kevin-feige-1092082-18-04-2018-14-44-54.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/paul-wernick-15610-24-03-2017-15-54-54.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/rhett-reese-15609-24-03-2017-15-54-55.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/george-richmond-iein012212-18-09-2017-17-16-47.jpg"]
                }
            }
        },
        {
            title: 'Harold and the Purple Crayon',
            genre: 'Action, Adventures, Fantasy',
            duration: 90,
            release_date: new Date("2024-08-23"),
            metadata: {
                imageUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/harold-and-the-purple-crayon-et00392669-1711450218.jpg",
                bgImageUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/harold-and-the-purple-crayon-et00392669-1711450218.jpg",
                dimensions: ["2D", "MX4D"],
                languages: ["English"],
                description: "Inside his book, adventurous Harold can make anything come to life simply by drawing it. After he grows up and draws himself off the book's pages and into the physical world, Harold finds that he has a lot to learn",
                casters: {
                    names: ["Zachary Levi", "Lil Rel Howery", "Benjamin Bottani", "Jemaine Clement", "Tanya Reynolds", "Alfred Molina", "Zooey Deschanel"],
                    urls: ["https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/zachary-levi-21093-01-04-2019-12-06-13.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/lil-rel-howery-1093657-27-06-2018-11-48-31.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/benjamin-bottani-2035688-1711452718.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/jemaine-clement-18472-24-03-2017-12-37-33.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/tanya-reynolds-2035687-1711452350.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/alfred-molina-117-24-03-2017-12-45-23.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/zooey-deschanel-2564-24-03-2017-12-39-25.jpg"]
                },
                crews: {
                    names: ["Carlos Saldanha", "John Davis", "Gabriel Beristain"],
                    urls: ["https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/carlos-saldanha-390-24-03-2017-15-43-21.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/john-davis-iein095703-12-12-2017-00-17-17.jpg", "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/gabriel-beristain-iein071227-03-03-2021-18-11-11.jpg"]
                }
            }
        }
    ];

    try {
        const existingMovies = await primsaClient.movie.findMany();
        if(existingMovies.length > 0){
            console.error('DB is already seeded with movies.');
            return;
        }

        await primsaClient.movie.createMany({ data: movies });
    } catch (error) {
        console.error('Error seeding movies:', error);
        throw error;
    }
}

async function seedMovieSchedule() {
    try {
        const movies = await primsaClient.movie.findMany({
            select: {
                id: true,
            }
        });

        const theaters = await primsaClient.theater.findMany({
            select: {
                id: true,
            }
        });

        for(let i=0; i<movies.length; i++){
            for(let j=0; j<theaters.length; j++){
                for(let slot=1; slot<5; slot++){
                    await primsaClient.movieSchedule.create({
                        data: {
                            movie_id: movies[i].id,
                            theater_id: theaters[j].id,
                            show_time: new Date("2024-08-25"),
                            slot,
                        }
                    });
                }
            }
        }
    } catch (error) {
        console.error('Error seeding movie schedules:', error);
        throw error;
    }
}

async function seedSeats() {
    try {
        const movieSchedules = await primsaClient.movieSchedule.findMany({
            select: {
                id: true,
                theater_id: true,
            }
        });
        
        for(let i=0; i<movieSchedules.length; i++){
            for(let j=0; j<30; j++){
                let random = Math.floor(Math.random() * 100) + 1;
                const seat_number = random % 10;
                random /= 10;
                const row_number = random % 10;
                await primsaClient.seat.create({
                    data: {
                        theater_id: movieSchedules[i].theater_id,
                        schedule_id: movieSchedules[i].id,
                        row_number,
                        seat_number,
                        date: new Date()
                    }
                })
            }
        }
    } catch (error) {
        console.error('Error seeding movie seats:', error);
        throw error;
    }
}

async function seedDatabase() {
    try {
        await seedUsers();
        await seedTheaters();
        await seedMovies();
        await seedMovieSchedule();
        await seedSeats();
    } catch (error) {
        console.error('Error seeding database:', error);
        throw error;
    } finally {
        await primsaClient.$disconnect();
    }
}

seedDatabase().catch((error) =>{
    console.error('An unexpected error occurred during seeding:', error);
    process.exit(1);
})