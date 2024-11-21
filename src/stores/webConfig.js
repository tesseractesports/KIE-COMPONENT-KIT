// src/stores/tournamentStore.ts
import { writable } from 'svelte/store';

const defaultTournamentData = {
    banner: {
        title: "IQOO BMPS 2024",
        description: "The biggest mobile gaming tournament of 2024",
        logo: "/placeholder/logo.png",
        background: "/placeholder/banner-bg.jpg",
        largeBackground: false,
        largeBackgroundUrl: "",
        liveChannerUrl: "https://youtube.com/live/example"
    },
    info: {
        overview: {
            isEnabled: true,
            videoTitle: "Tournament Overview",
            videoUrl: "https://youtube.com/watch?v=example",
            videoThumbnail: "/placeholder/thumbnail.jpg",
            aboutTournament: "IQOO BMPS 2024 is the premier mobile gaming tournament featuring top teams from across the region competing for glory and prizes.",
            startDate: "2024-03-01",
            endDate: "2024-04-30",
            totalTeams: "24",
            location: "Mumbai, India"
        },
        format: {
            isEnabled: true,
            rounds: [
                {
                    roundName: "Qualifiers",
                    roundDescription: "Open qualifiers where top 32 teams will advance",
                    startDate: "2024-03-01",
                    endDate: "2024-03-15"
                },
                {
                    roundName: "League Stage",
                    roundDescription: "Round robin format with 4 groups",
                    startDate: "2024-03-20",
                    endDate: "2024-04-10"
                },
                {
                    roundName: "Finals",
                    roundDescription: "Top 16 teams battle for championship",
                    startDate: "2024-04-25",
                    endDate: "2024-04-30"
                }
            ]
        },
        schedule: {
            isEnabled: true
        },
        teams: {
            isEnabled: true
        },
        leaderboard: {
            isEnabled: true
        },
        videos: {
            isEnabled: true,
            videos: [
                {
                    videoTitle: "Day 1 Highlights",
                    videoUrl: "https://youtube.com/watch?v=day1",
                    videoThumbnail: "/placeholder/day1.jpg"
                },
                {
                    videoTitle: "Day 2 Highlights",
                    videoUrl: "https://youtube.com/watch?v=day2",
                    videoThumbnail: "/placeholder/day2.jpg"
                }
            ]
        },
        support: false
    },
    prizePool: {
        totalPrize: "₹50,00,000",
        rightCharacter: "/placeholder/character.png",
        background: "/placeholder/prize-bg.jpg",
        prizeDetails: [
            {
                positionTitle: "1st Place",
                positionPrize: "₹20,00,000"
            },
            {
                positionTitle: "2nd Place",
                positionPrize: "₹10,00,000"
            },
            {
                positionTitle: "3rd Place",
                positionPrize: "₹5,00,000"
            }
        ],
        specialRewards: [
            {
                positionTitle: "MVP of the Tournament",
                positionPrize: "₹1,00,000"
            },
            {
                positionTitle: "Best Fragger",
                positionPrize: "₹50,000"
            }
        ]
    },
    highlights: [
        {
            videoTitle: "Tournament Teaser",
            videoUrl: "https://youtube.com/watch?v=teaser",
            videoThumbnail: "/placeholder/teaser.jpg"
        },
        {
            videoTitle: "Opening Ceremony",
            videoUrl: "https://youtube.com/watch?v=opening",
            videoThumbnail: "/placeholder/opening.jpg"
        }
    ],
    theme: {
        name: "Default",
        key: "DEFAULT",
        colors: {
            background: "#ffffff",
            foreground: "#000000",
            primary: "#ff0000",
            secondary: "#ff5f00",
            tertiary: "#ff0000",
            quaternary: "#859900"
        }
    }
};

function createTournamentStore() {
    const { subscribe, set, update } = writable(defaultTournamentData);

    return {
        subscribe,
        // Reset to default values
        reset: () => set(defaultTournamentData),
        // Update entire form
        setForm: (data) => set(data),
        // Update specific section
        updateSection: (section, data) => {
            update(store => ({
                ...store,
                [section]: { ...store[section], ...data }
            }));
        },
        // Add new round to format
        addRound: () => {
            update(store => ({
                ...store,
                info: {
                    ...store.info,
                    format: {
                        ...store.info.format,
                        rounds: [
                            ...store.info.format.rounds,
                            {
                                roundName: "",
                                roundDescription: "",
                                startDate: "",
                                endDate: ""
                            }
                        ]
                    }
                }
            }));
        },
        // Add new video
        addVideo: () => {
            update(store => ({
                ...store,
                info: {
                    ...store.info,
                    videos: {
                        ...store.info.videos,
                        videos: [
                            ...store.info.videos.videos,
                            {
                                videoTitle: "",
                                videoUrl: "",
                                videoThumbnail: ""
                            }
                        ]
                    }
                }
            }));
        },
        // Add new prize detail
        addPrizeDetail: () => {
            update(store => ({
                ...store,
                prizePool: {
                    ...store.prizePool,
                    prizeDetails: [
                        ...store.prizePool.prizeDetails,
                        {
                            positionTitle: "",
                            positionPrize: ""
                        }
                    ]
                }
            }));
        },
        // Add new special reward
        addSpecialReward: () => {
            update(store => ({
                ...store,
                prizePool: {
                    ...store.prizePool,
                    specialRewards: [
                        ...store.prizePool.specialRewards,
                        {
                            positionTitle: "",
                            positionPrize: ""
                        }
                    ]
                }
            }));
        },
        // Add new highlight
        addHighlight: () => {
            update(store => ({
                ...store,
                highlights: [
                    ...store.highlights,
                    {
                        videoTitle: "",
                        videoUrl: "",
                        videoThumbnail: ""
                    }
                ]
            }));
        }
    };
}

export const tournamentStore = createTournamentStore();