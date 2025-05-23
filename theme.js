const themes = [
  {
    "name": "Amber Glow",
    "accent": "#F97316",
    "accentHover": "#EA580C",
    "accentDisabled": "#FED7AA",
    "accentDisabledDark": "#EA580C",
    "resultGradientFrom": "#F97316",
    "resultGradientTo": "#C2410C",
    "chartLineColor": "#F97316",
    "chartFillColor": "rgba(249, 115, 22, 0.1)"
  },
  {
    "name": "Forest Moss",
    "accent": "#15803D",
    "accentHover": "#166534",
    "accentDisabled": "#BBF7D0",
    "accentDisabledDark": "#166534",
    "resultGradientFrom": "#15803D",
    "resultGradientTo": "#065F46",
    "chartLineColor": "#15803D",
    "chartFillColor": "rgba(21, 128, 61, 0.1)"
  },
  {
    "name": "Midnight Indigo",
    "accent": "#4338CA",
    "accentHover": "#3730A3",
    "accentDisabled": "#C7D2FE",
    "accentDisabledDark": "#3730A3",
    "resultGradientFrom": "#4338CA",
    "resultGradientTo": "#312E81",
    "chartLineColor": "#4338CA",
    "chartFillColor": "rgba(67, 56, 202, 0.1)"
  },
  {
    "name": "Sunset Coral",
    "accent": "#FB7185",
    "accentHover": "#F43F5E",
    "accentDisabled": "#FECDD3",
    "accentDisabledDark": "#F43F5E",
    "resultGradientFrom": "#FB7185",
    "resultGradientTo": "#BE123C",
    "chartLineColor": "#FB7185",
    "chartFillColor": "rgba(251, 113, 133, 0.1)"
  },
  {
    "name": "Arctic Sky",
    "accent": "#0EA5E9",
    "accentHover": "#0284C7",
    "accentDisabled": "#BAE6FD",
    "accentDisabledDark": "#0284C7",
    "resultGradientFrom": "#0EA5E9",
    "resultGradientTo": "#0369A1",
    "chartLineColor": "#0EA5E9",
    "chartFillColor": "rgba(14, 165, 233, 0.1)"
  },
  {
    "name": "Golden Sand",
    "accent": "#EAB308",
    "accentHover": "#CA8A04",
    "accentDisabled": "#FEF08A",
    "accentDisabledDark": "#CA8A04",
    "resultGradientFrom": "#EAB308",
    "resultGradientTo": "#A16207",
    "chartLineColor": "#EAB308",
    "chartFillColor": "rgba(234, 179, 8, 0.1)"
  },
  {
    "name": "Plum Wine",
    "accent": "#A855F7",
    "accentHover": "#9333EA",
    "accentDisabled": "#E9D5FF",
    "accentDisabledDark": "#9333EA",
    "resultGradientFrom": "#A855F7",
    "resultGradientTo": "#7E22CE",
    "chartLineColor": "#A855F7",
    "chartFillColor": "rgba(168, 85, 247, 0.1)"
  },
  {
    "name": "Slate Storm",
    "accent": "#64748B",
    "accentHover": "#475569",
    "accentDisabled": "#CBD5E1",
    "accentDisabledDark": "#475569",
    "resultGradientFrom": "#64748B",
    "resultGradientTo": "#334155",
    "chartLineColor": "#64748B",
    "chartFillColor": "rgba(100, 116, 139, 0.1)"
  }
]


;
function applyTheme(theme) {
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty('--accent', theme.accent);
    rootStyle.setProperty('--accent-hover', theme.accentHover);
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const disabledColor = isDark ? theme.accentDisabledDark : theme.accentDisabled;
    rootStyle.setProperty('--accent-disabled', disabledColor);
    rootStyle.setProperty('--result-gradient-from', theme.resultGradientFrom);
    rootStyle.setProperty('--result-gradient-to', theme.resultGradientTo);
}

function applyThemeBasedOnSecond() {
    const now = new Date();
    const second = now.getSeconds();
    const themeIndex = second % themes.length;
    const selectedTheme = themes[themeIndex];
    window.currentChosenTheme = selectedTheme;
    applyTheme(selectedTheme);
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (window.currentChosenTheme) {
        const theme = window.currentChosenTheme;
        const rootStyle = document.documentElement.style;
        const newDisabled = e.matches ? theme.accentDisabledDark : theme.accentDisabled;
        rootStyle.setProperty('--accent-disabled', newDisabled);
    }
});

window.addEventListener('load', () => {
    applyThemeBasedOnSecond(); // veya selectAndApplyRandomTheme();
});
