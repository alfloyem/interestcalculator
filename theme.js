const themes = [
  {
    "name": "True Red",
    "accent": "#DC2626",
    "accentHover": "#B91C1C",
    "accentDisabled": "#FCA5A5",
    "accentDisabledDark": "#B91C1C",
    "resultGradientFrom": "#DC2626",
    "resultGradientTo": "#991B1B",
    "chartLineColor": "#DC2626",
    "chartFillColor": "rgba(220, 38, 38, 0.1)"
  },
  {
    "name": "Tomato Fire",
    "accent": "#C03B3B",
    "accentHover": "#9B2C2C",
    "accentDisabled": "#FECACA",
    "accentDisabledDark": "#EF4444",
    "resultGradientFrom": "#C03B3B",
    "resultGradientTo": "#7B1212",
    "chartLineColor": "#C03B3B",
    "chartFillColor": "rgba(192, 59, 59, 0.1)"
  },
  {
    "name": "Mint Fresh",
    "accent": "#3EBE86",
    "accentHover": "#2E9365",
    "accentDisabled": "#D1FAE5",
    "accentDisabledDark": "#6EE7B7",
    "resultGradientFrom": "#3EBE86",
    "resultGradientTo": "#207A51",
    "chartLineColor": "#3EBE86",
    "chartFillColor": "rgba(62, 190, 134, 0.1)"
  },
  {
    "name": "Evergreen",
    "accent": "#065F46",
    "accentHover": "#064E3B",
    "accentDisabled": "#99F6E4",
    "accentDisabledDark": "#064E3B",
    "resultGradientFrom": "#065F46",
    "resultGradientTo": "#022C22",
    "chartLineColor": "#065F46",
    "chartFillColor": "rgba(6, 95, 70, 0.1)"
  },
  {
    "name": "Sky Frost",
    "accent": "#2C7ABF",
    "accentHover": "#205F8F",
    "accentDisabled": "#E0F2FE",
    "accentDisabledDark": "#38BDF8",
    "resultGradientFrom": "#2C7ABF",
    "resultGradientTo": "#0B3C5E",
    "chartLineColor": "#2C7ABF",
    "chartFillColor": "rgba(44, 122, 191, 0.1)"
  },
  {
    "name": "Deep Ocean",
    "accent": "#1E3A8A",
    "accentHover": "#1E40AF",
    "accentDisabled": "#C7D2FE",
    "accentDisabledDark": "#1E40AF",
    "resultGradientFrom": "#1E3A8A",
    "resultGradientTo": "#172554",
    "chartLineColor": "#1E3A8A",
    "chartFillColor": "rgba(30, 58, 138, 0.1)"
  },
  {
    "name": "Violet Royal",
    "accent": "#5B3BC6",
    "accentHover": "#472FA0",
    "accentDisabled": "#DDD6FE",
    "accentDisabledDark": "#7C3AED",
    "resultGradientFrom": "#5B3BC6",
    "resultGradientTo": "#3F27A0",
    "chartLineColor": "#5B3BC6",
    "chartFillColor": "rgba(91, 59, 198, 0.1)"
  },
  {
    "name": "Rose Bloom",
    "accent": "#9E1E30",
    "accentHover": "#7A1624",
    "accentDisabled": "#FECDD3",
    "accentDisabledDark": "#E11D48",
    "resultGradientFrom": "#9E1E30",
    "resultGradientTo": "#5A0E18",
    "chartLineColor": "#9E1E30",
    "chartFillColor": "rgba(158, 30, 48, 0.1)"
  }
];

window.currentChosenTheme = themes[0];

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
    const themeCount = themes.length;
    const themeIndex = second % themeCount;
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
    applyThemeBasedOnSecond();
});
