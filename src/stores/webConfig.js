// src/stores/WebConfig.js
import { writable, get } from 'svelte/store';
import { ThemeConfig, THEMES } from './ThemeConfig';

let currentTheme = ThemeConfig;
function getPlaceholder(width, height, type = 'primary') {
    currentTheme = get(ThemeConfig) || THEMES.DEFAULT;
    const bgColor = currentTheme.colors.background.replace('#', '');
    const color = currentTheme.colors[type].replace('#', '');
    return `https://via.placeholder.com/${width}x${height}/${color}/${bgColor}`;
}

const defaultConfig = {
    banner: {
        title: "Title Here",
        description: "Welcome to the tournament. ",
        logo: getPlaceholder(240, 240, 'primary'),
        background: getPlaceholder(1080, 380, 'primary'),
        largeBackground: false,
        largeBackgroundUrl: getPlaceholder(1920, 480, 'primary'),
        liveChannerUrl: ""
    },
    info: {
        overview: {
            isEnabled: true,
            videoTitle: "Tournament Overview",
            videoUrl: "",
            videoThumbnail: getPlaceholder(1280, 720, 'secondary'),
            aboutTournament: "Add detailed information about your tournament here. Include key highlights and what makes this tournament special.",
            startDate: "",
            endDate: "",
            totalTeams: "",
            location: "Location to be announced"
        },
        format: {
            isEnabled: true,
            rounds: [
                {
                    roundName: "Qualification Round",
                    roundDescription: "Initial round description and format details",
                    startDate: "2-12-23",
                    endDate: "4-12-24"
                },
            ]
        },
        schedule: {
            isEnabled: true
        },
        teams: {
            isEnabled: true,
            teams: [
                {
                    name: "Team Name",
                    logo: getPlaceholder(160, 160, 'tertiary'),
                    players: [
                        {
                            name: "Player Name",
                            avatar: getPlaceholder(120, 120, 'tertiary')
                        }
                    ]
                }
            ]
        },
        leaderboard: {
            isEnabled: true,
            filterOptions: {
                Round: ["Round 1"],
                Day: ["Day 1"],
                Group: ["Group A"]
            },
            head: [
                "Rank",
                "Team",
                "Group",
                "Matches",
                "Points",
                "Status"
            ],
            rows: [
                {
                    startingRank: 1,
                    team: {
                        name: "Team Name",
                        logo: getPlaceholder(80, 80, 'tertiary')
                    },
                    group: "Group A",
                    matches: 0,
                    points: 0,
                    status: "Qualified"
                }
            ]
        },
        videos: {
            isEnabled: true,
            videos: [
                {
                    videoTitle: "Tournament Announcement",
                    videoUrl: "",
                    videoThumbnail: getPlaceholder(640, 360, 'secondary'),
                    description: "Official tournament announcement and details",
                    duration: "",
                    uploadDate: ""
                },
                {
                    videoTitle: "Tournament Format",
                    videoUrl: "",
                    videoThumbnail: getPlaceholder(640, 360, 'secondary'),
                    description: "Learn about the tournament structure and format",
                    duration: "",
                    uploadDate: ""
                }
            ]
        },
        support: false
    },
    prizePool: {
        totalPrize: "Prize pool to be announced",
        rightCharacter: getPlaceholder(600, 800, 'quaternary'),
        background: getPlaceholder(1920, 800, 'primary'),
        prizeDetails: [
            {
                positionTitle: "First Place",
                positionPrize: "TBA",
                icon: getPlaceholder(100, 100, 'primary')
            },
            {
                positionTitle: "Second Place",
                positionPrize: "TBA",
                icon: getPlaceholder(100, 100, 'secondary')
            }
        ],
        specialRewards: [
            {
                positionTitle: "Special Award",
                positionPrize: "TBA",
                icon: getPlaceholder(100, 100, 'tertiary')
            }
        ]
    },
    highlights: [
        {
            videoTitle: "Tournament Highlights",
            videoUrl: "",
            videoThumbnail: getPlaceholder(640, 360, 'secondary')
        },
        {
            videoTitle: "Final Match Highlights",
            videoUrl: "",
            videoThumbnail: getPlaceholder(640, 360, 'secondary')
        },
        {
            videoTitle: "Player of the Tournament",
            videoUrl: "",
            videoThumbnail: getPlaceholder(640, 360, 'secondary')
        }
    ],
    registerNowSection : {
        title: "sample heading",
        description: "Blend your style and experience on a global, competitive stage. You have 13 rounds to attack and defend your side using sharp gunplay and tactical abilities. ",
        background:getPlaceholder(640, 360, 'secondary'),
        isPrivate:false,
        privatePageUrl:"",
    },
    theme: currentTheme
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