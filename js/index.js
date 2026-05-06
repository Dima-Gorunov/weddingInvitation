// БАЗА ГОСТЕЙ
const guestsDB = {
    1: ["Светлана", "Виталий"],
    2: ["Котова Анастасия"],
    3: ["Александр", "Кристина"],
    4: ["Любовь Григорьевна"],
    5: ["Елена", "Леонид"],
    6: ["Наталья", "Александр"],
    7: ["Юлия", "Александр"],
    8: ["Роман", "Виктория"],
    9: ["Антон", "Мария"],
    10: ["Юля Александрова"],
    11: ["Симухин Назарий"],
    12: ["Анастасия", "Александр"],
    13: ["Антонина", "Иван"],
    14: ["Виктория", "Андрей"],
    15: ["Валерия", "Александр"],
    16: ["Елена", "Максим"],
    17: ["Вадим", "Галина"],
    18: ["Ксения"],
    19: ["Наталья"],
    20: ["Людмила"],
    21: ["Денис", "Анастасия"],
    22: ["Сергей", "Кристина"],
    24: ["Татьяна", "Андрей"],
    25: ["Кристина горюнова"],
    26: ["Настя горюнова"],
    27: ["Евгений", "Александра"],
    28: ["Валерия"],
    29: ["Леонид", "Галина"],
    30: ["Сергей", "Светлана"],
    31: ["Александр", "Дарья"],
    32: ["Никита"],
    33: ["Павел", "Анастасия"],
    34: ["Александр Ежков"],
    35: ["Кирилл", "Софья"],
    36: ["Денис", "Дарья"],
    37: ["Павел", "Анастасия"],
    38: ["Никита"],
};

function detectGender(name) {
    const lowerName = name.toLowerCase();
    const maleExceptions = ["николай", "никита", "саша", "женя", "валентин", "илья", "симухин", "назарий", "ежков"];
    for (let ex of maleExceptions) {
        if (lowerName.includes(ex)) return "male";
    }
    if (
        lowerName === "александр" ||
        lowerName === "виталий" ||
        lowerName === "леонид" ||
        lowerName === "роман" ||
        lowerName === "антон" ||
        lowerName === "денис" ||
        lowerName === "сергей" ||
        lowerName === "андрей" ||
        lowerName === "максим" ||
        lowerName === "вадим" ||
        lowerName === "кирилл" ||
        lowerName === "павел" ||
        lowerName === "евгений" ||
        lowerName === "иван"
    )
        return "male";
    const femaleMarkers = ["а", "я", "ия", "ья"];
    for (let marker of femaleMarkers) {
        if (lowerName.endsWith(marker)) return "female";
    }
    return "female";
}

function formatGreeting(namesArray) {
    if (!namesArray || namesArray.length === 0) return "Дорогой гость!";
    if (namesArray.length === 1) {
        const name = namesArray[0];
        const gender = detectGender(name);
        const prefix = gender === "male" ? "Дорогой" : "Дорогая";
        return `${prefix} ${name}!`;
    } else if (namesArray.length === 2) {
        return `Дорогие ${namesArray[0]} и ${namesArray[1]}!`;
    } else {
        return `Дорогие ${namesArray.join(", ")}!`;
    }
}

function getGuestFromURL() {
    const params = new URLSearchParams(window.location.search);
    const guestIdParam = params.get("guestId");
    if (guestIdParam && !isNaN(parseInt(guestIdParam))) {
        const id = parseInt(guestIdParam);
        if (guestsDB[id]) return { id: id, names: guestsDB[id] };
    }
    return null;
}

function renderGreeting() {
    const guestData = getGuestFromURL();
    const greetingDiv = document.getElementById("guestGreeting");
    if (guestData) {
        greetingDiv.innerHTML = `✨ ${formatGreeting(guestData.names)} ✨`;
    } else {
        greetingDiv.innerHTML = `✨ Дорогие наши гости! ✨`;
    }
}

function renderFullGuestList() {
    const container = document.getElementById("fullGuestList");
    if (!container) return;
    const sortedIds = Object.keys(guestsDB)
        .map(Number)
        .sort((a, b) => a - b);
    let html = "";
    for (let id of sortedIds) {
        const names = guestsDB[id];
        const namesStr = names.join(" & ");
        html += `<div class="guest-item"><div class="guest-id">${id}</div><div class="guest-names-list">${namesStr}</div></div>`;
    }
    container.innerHTML = html;
}

// ================== ТАЙМЕР ДО 10.07.2026 16:00 ==================
function updateTimer() {
    const targetDate = new Date(2026, 6, 10, 16, 0, 0);
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % 86400000) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % 3600000) / (1000 * 60));
    const seconds = Math.floor((diff % 60000) / 1000);

    document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;
}

setInterval(updateTimer, 1000);
updateTimer();

// ========== ПЛАВНОЕ ЗАПОЛНЕНИЕ СЕРДЦА ПРИ СКРОЛЛЕ ==========
const heartEl = document.getElementById("heartScroll");
const tipEl = document.getElementById("scrollTip");

function getColorByPercent(percent) {
    // Начальный цвет: #ecd9cd (236, 217, 205)
    const startR = 236,
        startG = 217,
        startB = 205;
    // Конечный цвет: #e85d4a (232, 93, 74)
    const endR = 232,
        endG = 93,
        endB = 74;

    const p = Math.min(1, Math.max(0, percent));

    const r = Math.round(startR + (endR - startR) * p);
    const g = Math.round(startG + (endG - startG) * p);
    const b = Math.round(startB + (endB - startB) * p);

    return `rgb(${r}, ${g}, ${b})`;
}

function updateHeartByScroll() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollHeight <= 0) {
        heartEl.style.background = "#e85d4a";
        heartEl.classList.add("filled");
        return;
    }

    const scrolled = window.scrollY;
    let percent = scrolled / scrollHeight;
    console.log('percent: ', percent);
    
    let test=percent*100
    // Плавно меняем цвет фона
    heartEl.style.background = getColorByPercent(percent);
    // heartEl.style.clipPath = `polygon(0.00% ${100-test}%,100.00% ${100-test}%,100.00% 100%,0.00% 100%)`;

    if (percent >= 0.95) {
        heartEl.classList.add("filled");
    } else {
        heartEl.classList.remove("filled");
    }

    // Лёгкое изменение размера (пульсация)
    const scale = 1 + Math.min(percent, 0.7) * 0.1;
    heartEl.style.transform = `scale(${scale})`;
}

let tipShown = false;
function handleScrollTip() {
    if (!tipShown && window.scrollY > 30) {
        tipEl.style.opacity = "0.85";
        setTimeout(() => (tipEl.style.opacity = "0"), 2200);
        tipShown = true;
    }
    updateHeartByScroll();
}

// ========== ОСТАЛЬНЫЕ ФУНКЦИИ ==========
function setupRSVP() {
    const btn = document.getElementById("rsvpButton");
    btn.addEventListener("click", () => {
        const guestData = getGuestFromURL();
        if (guestData) {
            alert(`💒 Спасибо, ${guestData.names.join(" и ")}! Очень ждём вас на нашей свадьбе! 💒`);
        } else {
            alert(`💒 Спасибо! Очень ждём вас на нашей свадьбе! 💒`);
        }
    });
}

function setupWishes() {
    const sendBtn = document.getElementById("sendWishBtn");
    const wishInput = document.getElementById("wishInput");
    const feedback = document.getElementById("wishFeedback");

    sendBtn.addEventListener("click", () => {
        const wish = wishInput.value.trim();
        if (wish === "") {
            feedback.innerHTML = "💭 Напишите что-нибудь, нам будет очень приятно!";
            feedback.style.color = "#c48a6b";
            setTimeout(() => (feedback.innerHTML = ""), 2500);
            return;
        }
        const guestData = getGuestFromURL();
        let fromWho = "гость";
        if (guestData) fromWho = guestData.names.join(" и ");
        feedback.innerHTML = `💖 Спасибо, ${fromWho}! Ваше пожелание передано молодоженам. 💖`;
        feedback.style.color = "#9b6e54";
        wishInput.value = "";
        setTimeout(() => (feedback.innerHTML = ""), 4000);
    });
}

function highlightIfGuestExists() {
    const guest = getGuestFromURL();
    if (guest) {
        const block = document.querySelector(".greeting-block");
        if (block) {
            block.style.transition = "1s";
            block.style.boxShadow = "0 0 0 2px #ecc9b5";
        }
    }
}

function init() {
    renderGreeting();
    renderFullGuestList();
    setupRSVP();
    setupWishes();
    highlightIfGuestExists();

    window.addEventListener("scroll", handleScrollTip);
    window.addEventListener("resize", updateHeartByScroll);
    updateHeartByScroll();

    setTimeout(() => {
        if (window.scrollY < 10) {
            tipEl.style.opacity = "0.6";
            setTimeout(() => {
                if (tipEl.style.opacity !== "0") tipEl.style.opacity = "0";
            }, 2800);
        }
    }, 800);
}

init();
