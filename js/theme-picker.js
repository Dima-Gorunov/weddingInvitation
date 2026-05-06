// theme-picker.js

// Определение цветовых схем
const themes = {
    classic: {
        name: "Классическая",
        preview: {
            bg: "#e8dcd0",
            cardBg: "#ffffff",
            accent: "#8b2e1a",
            text: "#1e1813",
        },
        colors: {
            bgBody: "#e8dcd0",
            bgContainer: "#ffffff",
            bgHero: "linear-gradient(135deg, #fff8f0 0%, #fef5ea 100%)",
            bgCard: "linear-gradient(135deg, #fffbf5, #fef7ef)",
            bgSection: "#ffffff",
            primaryText: "#1e1813",
            secondaryText: "#5a3e2e",
            accent: "#8b2e1a",
            accentLight: "#a53f26",
            border: "#e8d5c4",
            buttonGradient: "linear-gradient(135deg, #8b2e1a, #6b2212)",
            heartGradient: "linear-gradient(135deg, #f0ddd0, #e8d0c0)",
            heartFilled: "linear-gradient(135deg, #e86a4e, #d94a2a)",
            placeholderBg: "linear-gradient(135deg, #ebdfd3, #e2d0c0)",
            cardBg: "#ffffff",
            timerBg: "#ffffff",
            wishInputBorder: "#e8d5c4",
            wishInputFocus: "#c47a5a",
            dividerColor: "#d48462",
            textMuted: "#9b7a64",
        },
    },
    romantic: {
        name: "Романтическая",
        preview: {
            bg: "#fdeef5",
            cardBg: "#fff5f8",
            accent: "#e85d8c",
            text: "#4a2638",
        },
        colors: {
            bgBody: "#fdeef5",
            bgContainer: "#fff5f8",
            bgHero: "linear-gradient(135deg, #fff0f5 0%, #ffe4ed 100%)",
            bgCard: "linear-gradient(135deg, #fff5f8, #ffecf2)",
            bgSection: "#fff5f8",
            primaryText: "#4a2638",
            secondaryText: "#7a4a60",
            accent: "#e85d8c",
            accentLight: "#f08dae",
            border: "#f5d5e2",
            buttonGradient: "linear-gradient(135deg, #e85d8c, #d43f6a)",
            heartGradient: "linear-gradient(135deg, #fce4ec, #f8d4e0)",
            heartFilled: "linear-gradient(135deg, #f5a5c0, #e85d8c)",
            placeholderBg: "linear-gradient(135deg, #fce4ec, #f8d4e0)",
            cardBg: "#ffffff",
            timerBg: "#ffffff",
            wishInputBorder: "#f5d5e2",
            wishInputFocus: "#e85d8c",
            dividerColor: "#f08dae",
            textMuted: "#b888a0",
        },
    },
    retro: {
        name: "Ретро (СССР)",
        preview: {
            bg: "#d4c4a8",
            cardBg: "#f5eccc",
            accent: "#c2410c",
            text: "#2c2418",
        },
        colors: {
            bgBody: "#d4c4a8",
            bgContainer: "#f5eccc",
            bgHero: "linear-gradient(135deg, #f0e6c0 0%, #e8dbb0 100%)",
            bgCard: "linear-gradient(135deg, #fef5e0, #f5e6c8)",
            bgSection: "#fef5e0",
            primaryText: "#2c2418",
            secondaryText: "#6b4c3a",
            accent: "#c2410c",
            accentLight: "#d9551a",
            border: "#d4b896",
            buttonGradient: "linear-gradient(135deg, #c2410c, #a03208)",
            heartGradient: "linear-gradient(135deg, #ecd9b4, #e0c89c)",
            heartFilled: "linear-gradient(135deg, #e87430, #c2410c)",
            placeholderBg: "linear-gradient(135deg, #ecd9b4, #e0c89c)",
            cardBg: "#fff8e8",
            timerBg: "#fff8e8",
            wishInputBorder: "#d4b896",
            wishInputFocus: "#c2410c",
            dividerColor: "#d48462",
            textMuted: "#8b6e58",
        },
    },
    modern: {
        name: "Модерн (чёрно-белый)",
        preview: {
            bg: "#f5f5f5",
            cardBg: "#ffffff",
            accent: "#000000",
            text: "#1a1a1a",
        },
        colors: {
            bgBody: "#e8e8e8",
            bgContainer: "#ffffff",
            bgHero: "linear-gradient(135deg, #f8f8f8 0%, #eeeeee 100%)",
            bgCard: "linear-gradient(135deg, #ffffff, #f8f8f8)",
            bgSection: "#ffffff",
            primaryText: "#1a1a1a",
            secondaryText: "#555555",
            accent: "#000000",
            accentLight: "#333333",
            border: "#dddddd",
            buttonGradient: "linear-gradient(135deg, #2c2c2c, #1a1a1a)",
            heartGradient: "linear-gradient(135deg, #f0f0f0, #e0e0e0)",
            heartFilled: "linear-gradient(135deg, #666666, #333333)",
            placeholderBg: "linear-gradient(135deg, #f5f5f5, #e8e8e8)",
            cardBg: "#ffffff",
            timerBg: "#ffffff",
            wishInputBorder: "#dddddd",
            wishInputFocus: "#000000",
            dividerColor: "#999999",
            textMuted: "#888888",
        },
    },
};

// Функция применения темы
function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;

    const colors = theme.colors;
    const root = document.documentElement;

    // Применяем CSS переменные
    for (const [key, value] of Object.entries(colors)) {
        const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
        root.style.setProperty(cssVar, value);
    }

    // Сохраняем выбор в localStorage
    localStorage.setItem("wedding_theme", themeName);
}

// Создание мини-превью для карточки темы
function createMiniPreview(theme) {
    const preview = theme.preview;
    return `
        <div class="mini-preview" style="background: ${preview.bg};">
            <div class="mini-card" style="background: ${preview.cardBg}; border-color: ${preview.accent}40;">
                <div class="mini-title" style="color: ${preview.text};">
                    <span class="mini-heart" style="color: ${preview.accent};">❤️</span>
                    Свадьба
                </div>
                <div class="mini-date" style="color: ${preview.secondaryText || preview.text}80;">
                    10 июля
                </div>
                <div class="mini-btn" style="background: ${preview.accent};"></div>
            </div>
        </div>
    `;
}

// Создание панели выбора темы
function createThemePanel() {
    const panel = document.createElement("div");
    panel.id = "themePanel";
    panel.innerHTML = `
        <div class="theme-panel-content">
            <div class="theme-panel-title">🎨 Выберите цветовую гамму</div>
            <div class="theme-options">
                ${Object.entries(themes)
                    .map(
                        ([key, theme]) => `
                    <div class="theme-option" data-theme="${key}">
                        ${createMiniPreview(theme)}
                        <span class="theme-name">${theme.name}</span>
                    </div>
                `,
                    )
                    .join("")}
            </div>
            <button class="theme-close-btn" id="closeThemePanel">✨ Выбрать ✨</button>
        </div>
    `;

    document.body.appendChild(panel);

    // Добавляем обработчики
    const options = panel.querySelectorAll(".theme-option");
    let selectedTheme = localStorage.getItem("wedding_theme") || "classic";

    options.forEach((option) => {
        option.addEventListener("click", () => {
            options.forEach((opt) => opt.classList.remove("selected"));
            option.classList.add("selected");
            selectedTheme = option.dataset.theme;
            applyTheme(selectedTheme);
        });
    });

    // Выбираем текущую тему при открытии
    const currentOption = panel.querySelector(`[data-theme="${selectedTheme}"]`);
    if (currentOption) currentOption.classList.add("selected");

    // Кнопка закрытия
    const closeBtn = panel.querySelector("#closeThemePanel");
    closeBtn.addEventListener("click", () => {
        panel.classList.add("hidden");
        localStorage.setItem("theme_panel_shown", "true");
    });

    return panel;
}

// Показ панели при первом посещении
function initThemePicker() {
    const hasSeenPanel = localStorage.getItem("theme_panel_shown");
    const savedTheme = localStorage.getItem("wedding_theme");

    // Применяем сохранённую тему
    if (savedTheme && themes[savedTheme]) {
        applyTheme(savedTheme);
    } else {
        applyTheme("classic");
    }

    // Показываем панель только если пользователь ещё не выбирал
    if (!hasSeenPanel) {
        setTimeout(() => {
            createThemePanel();
        }, 800);
    } else {
        // Добавляем кнопку смены темы в нижний угол
        addThemeSwitcherButton();
    }
}

// Кнопка для смены темы (после выбора)
function addThemeSwitcherButton() {
    const btn = document.createElement("div");
    btn.id = "themeSwitcherBtn";
    btn.innerHTML = "🎨";
    btn.title = "Сменить тему";
    btn.addEventListener("click", () => {
        const existingPanel = document.getElementById("themePanel");
        if (existingPanel) {
            existingPanel.classList.remove("hidden");
        } else {
            createThemePanel();
        }
    });
    document.body.appendChild(btn);
}

// Запускаем при загрузке страницы
document.addEventListener("DOMContentLoaded", initThemePicker);
