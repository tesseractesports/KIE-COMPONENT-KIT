import { writable } from "svelte/store";

export const THEMES = {
    DEFAULT: {
        name: "Default",
        key: "DEFAULT",
        colors: {
            background: "#ffffff",
            foreground: "#000000",
            primary: "#ff0000",
            secondary: "#ff5f00",
            tertiary: "#ff0000",
            quaternary: "#859900",
        },
    },
    SOLARIZED_DARK: {
        name: "Solarized Dark",
        key: "SOLARIZED_DARK",
        colors: {
            background: "#002b36",
            foreground: "#839496",
            primary: "#268bd2",
            secondary: "#b58900",
            tertiary: "#cb4b16",
        },
    },
    VINTAGE: {
        name: "Vintage",
        key: "VINTAGE",
        colors: {
            background: "#000000",
            foreground: "#ffffff",
            primary: "#0087be",
            secondary: "#ff5f00",
            tertiary: "#ff0000",
            quaternary: "#859900",
        },
    },
    CUSTOM: {
        name: "Custom",
        key: "CUSTOM",
        colors: {},
    },
}

export const THEME_LIST = Object.values(THEMES).map(t => ({name: t.name, value: t.key}));

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