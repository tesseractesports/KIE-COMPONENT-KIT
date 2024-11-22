import { writable } from "svelte/store";

export const THEMES = {
    DEFAULT: {
        name: "Default",
        key: "DEFAULT",
        colors: {
            background: "#111111",
            foreground: "#FFFFFF",
            primary: "#FFB800",      // Bright gold for primary actions
            secondary: "#FF4B4B",    // Energetic red for highlights
            tertiary: "#00C5FF",     // Electric blue for accents
            quaternary: "#44D62C"    // Vibrant green for success states
        }
    },
    ESPORTS_DARK: {
        name: "Esports Dark",
        key: "ESPORTS_DARK",
        colors: {
            background: "#0A0A0A",
            foreground: "#FFFFFF",
            primary: "#00FF87",      // Neon green for primary elements
            secondary: "#FF2D92",    // Hot pink for emphasis
            tertiary: "#2DE2E6",     // Cyan for accents
            quaternary: "#713EFF"    // Purple for special elements
        }
    },
    CHAMPIONSHIP: {
        name: "Championship",
        key: "CHAMPIONSHIP",
        colors: {
            background: "#0D1117",
            foreground: "#FFFFFF",
            primary: "#FAD02C",      // Rich gold for champions
            secondary: "#E31837",    // Deep red for competition
            tertiary: "#1E90FF",     // Bright blue for progress
            quaternary: "#9747FF"    // Royal purple for premium
        }
    },
    CYBER: {
        name: "Cyber",
        key: "CYBER",
        colors: {
            background: "#000000",
            foreground: "#FFFFFF",
            primary: "#00FFD1",      // Cyber mint
            secondary: "#FF003C",    // Neon red
            tertiary: "#3D00FF",     // Electric purple
            quaternary: "#00FF94"    // Matrix green
        }
    },
    PRO_LEAGUE: {
        name: "Pro League",
        key: "PRO_LEAGUE",
        colors: {
            background: "#1A1A1A",
            foreground: "#FFFFFF",
            primary: "#F7C948",      // Premium gold
            secondary: "#EC4E39",    // Competition red
            tertiary: "#4895EF",     // Action blue
            quaternary: "#3DDC97"    // Success green
        }
    },
    MIDNIGHT: {
        name: "Midnight",
        key: "MIDNIGHT",
        colors: {
            background: "#0F172A",
            foreground: "#FFFFFF",
            primary: "#38BDF8",      // Sky blue
            secondary: "#FB7185",    // Coral
            tertiary: "#34D399",     // Emerald
            quaternary: "#A78BFA"    // Lavender
        }
    },
    CUSTOM: {
        name: "Custom",
        key: "CUSTOM",
        colors: {
            background: "#111111",
            foreground: "#FFFFFF",
            primary: "#FFB800",
            secondary: "#FF4B4B",
            tertiary: "#00C5FF",
            quaternary: "#44D62C"
        }
    }
};

// Export a list of themes for UI selection
// export const THEME_LIST = Object.values(THEMES).map(theme => ({
//     name: theme.name,
//     value: theme.key
// }));
export const THEME_LIST = Object.values(THEMES).map(t => ({name: t.name, value: t.key}));


// Create an array of color variables for documentation and usage
export const THEME_COLORS = [
    {
        name: 'background',
        description: 'Main background color for the application',
        usage: 'Page backgrounds, card backgrounds'
    },
    {
        name: 'foreground',
        description: 'Primary text color',
        usage: 'Main text, headings'
    },
    {
        name: 'primary',
        description: 'Primary brand color',
        usage: 'Main CTAs, important highlights, brand elements'
    },
    {
        name: 'secondary',
        description: 'Secondary accent color',
        usage: 'Secondary buttons, accents, notifications'
    },
    {
        name: 'tertiary',
        description: 'Third level accent color',
        usage: 'Additional accents, status indicators'
    },
    {
        name: 'quaternary',
        description: 'Fourth level accent color',
        usage: 'Special states, success indicators, achievements'
    }
];

// CSS Variable generation helper
export const generateThemeCSS = (theme) => {
    return `
        :root {
            --theme-background: ${theme.colors.background};
            --theme-foreground: ${theme.colors.foreground};
            --theme-primary: ${theme.colors.primary};
            --theme-secondary: ${theme.colors.secondary};
            --theme-tertiary: ${theme.colors.tertiary};
            --theme-quaternary: ${theme.colors.quaternary};
        }
    `;
};


const CreateThemeConfig = function (config) {
    const { subscribe, set, update } = writable(config);

    return {
        subscribe,
        set: (key) => {
            let theme = Object.values(THEMES).find(t => t.key == key);
            if(theme){
                update(u => theme);
            }else{
                console.error("Invalid theme name");
            }
        },
    };
};

export const ThemeConfig = CreateThemeConfig(THEMES.DEFAULT);