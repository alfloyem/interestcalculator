// theme.js
//  - Defines multiple color themes
//  - Exposes applyTheme() and selectAndApplyRandomTheme() for use in main.js
//  - Handles updating CSS variables for accent colors based on light/dark mode

const themes = [
    {
        name: 'Ocean Blue',
        accent: '#3B82F6',
        accentHover: '#2563EB',
        accentDisabled: '#93C5FD',
        accentDisabledDark: '#2563EB',
        resultGradientFrom: '#3B82F6',
        resultGradientTo: '#1D4ED8',
        chartLineColor: '#3B82F6',
        chartFillColor: 'rgba(59, 130, 246, 0.1)',
    },
    {
        name: 'Sky Blue',
        accent: '#60A5FA',
        accentHover: '#3B82F6',
        accentDisabled: '#BFDBFE',
        accentDisabledDark: '#3B82F6',
        resultGradientFrom: '#60A5FA',
        resultGradientTo: '#2563EB',
        chartLineColor: '#60A5FA',
        chartFillColor: 'rgba(96, 165, 250, 0.1)',
    },
    {
        name: 'Forest Green',
        accent: '#10B981',
        accentHover: '#059669',
        accentDisabled: '#6EE7B7',
        accentDisabledDark: '#059669',
        resultGradientFrom: '#10B981',
        resultGradientTo: '#047857',
        chartLineColor: '#10B981',
        chartFillColor: 'rgba(16, 185, 129, 0.1)',
    },
    {
        name: 'Mint Green',
        accent: '#34D399',
        accentHover: '#10B981',
        accentDisabled: '#A7F3D0',
        accentDisabledDark: '#10B981',
        resultGradientFrom: '#34D399',
        resultGradientTo: '#059669',
        chartLineColor: '#34D399',
        chartFillColor: 'rgba(52, 211, 153, 0.1)',
    },
    {
        name: 'Royal Purple',
        accent: '#8B5CF6',
        accentHover: '#7C3AED',
        accentDisabled: '#C4B5FD',
        accentDisabledDark: '#7C3AED',
        resultGradientFrom: '#8B5CF6',
        resultGradientTo: '#6D28D9',
        chartLineColor: '#8B5CF6',
        chartFillColor: 'rgba(139, 92, 246, 0.1)',
    },
    {
        name: 'Lavender Purple',
        accent: '#A78BFA',
        accentHover: '#8B5CF6',
        accentDisabled: '#DDD6FE',
        accentDisabledDark: '#8B5CF6',
        resultGradientFrom: '#A78BFA',
        resultGradientTo: '#7C3AED',
        chartLineColor: '#A78BFA',
        chartFillColor: 'rgba(167, 139, 250, 0.1)',
    },
    {
        name: 'Sunset Orange',
        accent: '#F97316',
        accentHover: '#EA580C',
        accentDisabled: '#FDBA74',
        accentDisabledDark: '#EA580C',
        resultGradientFrom: '#F97316',
        resultGradientTo: '#C2410C',
        chartLineColor: '#F97316',
        chartFillColor: 'rgba(249, 115, 22, 0.1)',
    },
    {
        name: 'Peach Orange',
        accent: '#FB923C',
        accentHover: '#F97316',
        accentDisabled: '#FED7AA',
        accentDisabledDark: '#F97316',
        resultGradientFrom: '#FB923C',
        resultGradientTo: '#EA580C',
        chartLineColor: '#FB923C',
        chartFillColor: 'rgba(251, 146, 60, 0.1)',
    },
    {
        name: 'Rose Pink',
        accent: '#EC4899',
        accentHover: '#DB2777',
        accentDisabled: '#F9A8D4',
        accentDisabledDark: '#DB2777',
        resultGradientFrom: '#EC4899',
        resultGradientTo: '#BE185D',
        chartLineColor: '#EC4899',
        chartFillColor: 'rgba(236, 72, 153, 0.1)',
    },
    {
        name: 'Fuchsia Pink',
        accent: '#D946EF',
        accentHover: '#C026D3',
        accentDisabled: '#F0ABFC',
        accentDisabledDark: '#C026D3',
        resultGradientFrom: '#D946EF',
        resultGradientTo: '#A21CAF',
        chartLineColor: '#D946EF',
        chartFillColor: 'rgba(217, 70, 239, 0.1)',
    },
    {
        name: 'Teal Cyan',
        accent: '#14B8A6',
        accentHover: '#0D9488',
        accentDisabled: '#5EEAD4',
        accentDisabledDark: '#0D9488',
        resultGradientFrom: '#14B8A6',
        resultGradientTo: '#0F766E',
        chartLineColor: '#14B8A6',
        chartFillColor: 'rgba(20, 184, 166, 0.1)',
    },
    {
        name: 'Light Cyan',
        accent: '#2DD4BF',
        accentHover: '#14B8A6',
        accentDisabled: '#99F6E4',
        accentDisabledDark: '#14B8A6',
        resultGradientFrom: '#2DD4BF',
        resultGradientTo: '#0D9488',
        chartLineColor: '#2DD4BF',
        chartFillColor: 'rgba(45, 212, 191, 0.1)',
    },
];

// Expose the chosen theme globally so main.js can read/write
window.currentChosenTheme = themes[0];

/**
 * applyTheme(theme)
 * -----------------
 * Sets CSS custom properties (--accent, --accent-hover, --accent-disabled, --result-gradient-*)
 * based on the passed-in theme object. Automatically adapts to light/dark mode for --accent-disabled.
 */
function applyTheme(theme) {
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty('--accent', theme.accent);
    rootStyle.setProperty('--accent-hover', theme.accentHover);

    // Detect if the user is in dark mode
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Choose the appropriate disabled color
    const disabledColor = isDark ? theme.accentDisabledDark : theme.accentDisabled;
    rootStyle.setProperty('--accent-disabled', disabledColor);

    rootStyle.setProperty('--result-gradient-from', theme.resultGradientFrom);
    rootStyle.setProperty('--result-gradient-to', theme.resultGradientTo);
}

/**
 * selectAndApplyRandomTheme()
 * ---------------------------
 * Picks one of the themes[] at random, stores it in window.currentChosenTheme, 
 * and then calls applyTheme() to update the CSS variables.
 */
function selectAndApplyRandomTheme() {
    const randomIndex = Math.floor(Math.random() * themes.length);
    window.currentChosenTheme = themes[randomIndex];
    applyTheme(window.currentChosenTheme);
}

// Whenever the OS color scheme toggles, re‐apply accent-disabled
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (window.currentChosenTheme) {
        const theme = window.currentChosenTheme;
        const rootStyle = document.documentElement.style;
        const newDisabled = e.matches ? theme.accentDisabledDark : theme.accentDisabled;
        rootStyle.setProperty('--accent-disabled', newDisabled);
    }
});
