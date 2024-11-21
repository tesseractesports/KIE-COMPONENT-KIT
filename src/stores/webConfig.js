// src/stores/WebConfig.js
import { writable, get } from 'svelte/store';

const defaultConfig = {
    banner: {
        title: "IQOO BMPS 2024",
        description: "Welcome to India's Biggest Battlegrounds Mobile India Pro Series",
        logo: "https://dev-kie-tmp-docs.s3.ap-south-1.amazonaws.com/tournament-page-assets/bgmi-logo.png",
        background: "https://dev-kie-tmp-docs.s3.ap-south-1.amazonaws.com/tournament-page-assets/bgmi-banner.jpg",
        largeBackground: true,
        largeBackgroundUrl: "https://dev-kie-tmp-docs.s3.ap-south-1.amazonaws.com/tournament-page-assets/bgmi-large-banner.jpg",
        liveChannerUrl: "https://www.youtube.com/BATTLEGROUNDSMOBILEIN"
    },
    info: {
        overview: {
            isEnabled: true,
            videoTitle: "BMPS 2024 Official Trailer",
            videoUrl: "https://www.youtube.com/watch?v=example-trailer",
            videoThumbnail: "https://dev-kie-tmp-docs.s3.ap-south-1.amazonaws.com/tournament-page-assets/bgmi-trailer-thumb.jpg",
            aboutTournament: "BATTLEGROUNDS MOBILE INDIA PRO SERIES (BMPS) 2024 is India's premier BGMI tournament, featuring the top 24 teams competing for glory and a massive prize pool. Experience intense battles, strategic gameplay, and spectacular showdowns as teams fight to be crowned champions.",
            startDate: "2024-03-15",
            endDate: "2024-04-30",
            totalTeams: "24",
            location: "Mumbai, India"
        },
        format: {
            isEnabled: true,
            rounds: [
                {
                    roundName: "League Play Week 1",
                    roundDescription: "24 teams compete in round-robin format across 4 groups",
                    startDate: "2024-03-15",
                    endDate: "2024-03-20"
                },
                {
                    roundName: "League Play Week 2",
                    roundDescription: "Top 16 teams advance to intensive battle rounds",
                    startDate: "2024-03-22",
                    endDate: "2024-03-27"
                },
                {
                    roundName: "Grand Finals",
                    roundDescription: "Top 8 teams battle for the championship",
                    startDate: "2024-03-29",
                    endDate: "2024-03-31"
                }
            ]
        },
        schedule: { isEnabled: true },
        teams: { isEnabled: true },
        leaderboard: { isEnabled: true },
        videos: {
            isEnabled: true,
            videos: [
                {
                    videoTitle: "BMPS 2024 Team Introductions",
                    videoUrl: "https://www.youtube.com/watch?v=team-intro",
                    videoThumbnail: "https://dev-kie-tmp-docs.s3.ap-south-1.amazonaws.com/tournament-page-assets/bgmi-teams-thumb.jpg"
                },
                {
                    videoTitle: "Tournament Format Explained",
                    videoUrl: "https://www.youtube.com/watch?v=format-explain",
                    videoThumbnail: "https://dev-kie-tmp-docs.s3.ap-south-1.amazonaws.com/tournament-page-assets/bgmi-format-thumb.jpg"
                }
            ]
        },
        support: true
    },
    prizePool: {
        totalPrize: "₹2,00,00,000",
        rightCharacter: "https://dev-kie-tmp-docs.s3.ap-south-1.amazonaws.com/tournament-page-assets/bgmi-character.png",
        background: "https://dev-kie-tmp-docs.s3.ap-south-1.amazonaws.com/tournament-page-assets/prize-pool-bg.jpg",
        prizeDetails: [
            {
                positionTitle: "Champions",
                positionPrize: "₹75,00,000"
            },
            {
                positionTitle: "1st Runners Up",
                positionPrize: "₹35,00,000"
            },
            {
                positionTitle: "2nd Runners Up",
                positionPrize: "₹20,00,000"
            },
            {
                positionTitle: "4th Place",
                positionPrize: "₹15,00,000"
            }
        ],
        specialRewards: [
            {
                positionTitle: "Tournament MVP",
                positionPrize: "₹10,00,000"
            },
            {
                positionTitle: "Best Fragger",
                positionPrize: "₹5,00,000"
            },
            {
                positionTitle: "Fan Favorite Team",
                positionPrize: "₹5,00,000"
            }
        ]
    },
    highlights: [
        {
            videoTitle: "BMPS 2024 Opening Ceremony",
            videoUrl: "https://www.youtube.com/watch?v=opening-ceremony",
            videoThumbnail: "https://dev-kie-tmp-docs.s3.ap-south-1.amazonaws.com/tournament-page-assets/opening-ceremony-thumb.jpg"
        },
        {
            videoTitle: "Day 1 Highlights",
            videoUrl: "https://www.youtube.com/watch?v=day1-highlights",
            videoThumbnail: "https://dev-kie-tmp-docs.s3.ap-south-1.amazonaws.com/tournament-page-assets/day1-highlights-thumb.jpg"
        },
        {
            videoTitle: "Top 10 Plays",
            videoUrl: "https://www.youtube.com/watch?v=top-plays",
            videoThumbnail: "https://dev-kie-tmp-docs.s3.ap-south-1.amazonaws.com/tournament-page-assets/top-plays-thumb.jpg"
        }
    ],
    theme: {
        name: "BGMI Dark",
        key: "BGMI_DARK",
        colors: {
            background: "#0A0A0A",
            foreground: "#FFFFFF",
            primary: "#FFB800",
            secondary: "#FF4B4B",
            tertiary: "#00C5FF",
            quaternary: "#44D62C"
        }
    }
};

export const CONFIG_PATHS = {
    ROUNDS: 'info.format.rounds',
    VIDEOS: 'info.videos.videos',
    PRIZE_DETAILS: 'prizePool.prizeDetails',
    SPECIAL_REWARDS: 'prizePool.specialRewards',
    HIGHLIGHTS: 'highlights'
};

export const CONFIG_TEMPLATES = {
    [CONFIG_PATHS.ROUNDS]: {
        roundName: "New Round",
        roundDescription: "",
        startDate: "",
        endDate: ""
    },
    [CONFIG_PATHS.VIDEOS]: {
        videoTitle: "New Video",
        videoUrl: "",
        videoThumbnail: ""
    },
    [CONFIG_PATHS.PRIZE_DETAILS]: {
        positionTitle: "New Position",
        positionPrize: "₹0"
    },
    [CONFIG_PATHS.SPECIAL_REWARDS]: {
        positionTitle: "New Reward",
        positionPrize: "₹0"
    },
    [CONFIG_PATHS.HIGHLIGHTS]: {
        videoTitle: "New Highlight",
        videoUrl: "",
        videoThumbnail: ""
    }
};

export const CONFIG_SECTIONS = {
    BANNER: 'banner',
    INFO: 'info',
    PRIZE_POOL: 'prizePool',
    HIGHLIGHTS: 'highlights',
    THEME: 'theme'
};

function createWebConfig() {
    const store = writable(defaultConfig);
    
    const { subscribe, set, update } = store;

    return {
        subscribe,
        set,
        update,
        updateFromApi: (apiData) => {
            try {
                let config;
                if (!apiData) {
                    config = defaultConfig;
                } else if (typeof apiData.websiteConfig === 'string') {
                    config = JSON.parse(apiData.websiteConfig);
                } else {
                    config = apiData.websiteConfig || defaultConfig;
                }
                
                set({ ...defaultConfig, ...config });
            } catch (error) {
                console.error('Error parsing config:', error);
                set(defaultConfig);
            }
        },
        reset: () => set(defaultConfig),
        updateSection: (path, value) => {
            update(store => {
                const newStore = { ...store };
                const pathArray = path.split('.');
                let current = newStore;

                for (let i = 0; i < pathArray.length - 1; i++) {
                    current = current[pathArray[i]];
                }

                current[pathArray[pathArray.length - 1]] = value;
                return newStore;
            });
        },
        addArrayItem: (path) => {
            update(store => {
                const newStore = { ...store };
                const pathArray = path.split('.');
                let current = newStore;

                for (let i = 0; i < pathArray.length - 1; i++) {
                    current = current[pathArray[i]];
                }

                const arrayKey = pathArray[pathArray.length - 1];
                const template = CONFIG_TEMPLATES[path] || {};
                
                if (Array.isArray(current[arrayKey])) {
                    current[arrayKey].push({ ...template });
                }

                return newStore;
            });
        },
        removeArrayItem: (path, index) => {
            update(store => {
                const newStore = { ...store };
                const pathArray = path.split('.');
                let current = newStore;

                for (let i = 0; i < pathArray.length - 1; i++) {
                    current = current[pathArray[i]];
                }

                const arrayKey = pathArray[pathArray.length - 1];
                if (Array.isArray(current[arrayKey])) {
                    current[arrayKey].splice(index, 1);
                }

                return newStore;
            });
        },
        getCurrentConfig: () => get(store)  // Using Svelte's get helper
    };
}

export const webConfig = createWebConfig();