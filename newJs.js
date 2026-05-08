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

// Таймер обратного отсчета
function updateTimer() {
    const targetDate = new Date(2026, 6, 10, 16, 0, 0);
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
}

setInterval(updateTimer, 1000);
updateTimer();

// Отправка пожеланий
const sendBtn = document.getElementById("sendWishBtn");
const wishInput = document.getElementById("wishInput");
const wishFeedback = document.getElementById("wishFeedback");

if (sendBtn) {
    sendBtn.addEventListener("click", () => {
        const message = wishInput.value.trim();
        if (message === "") {
            wishFeedback.innerText = "❤️ Напишите несколько слов, пожалуйста.";
            wishFeedback.style.color = "#8f5e3c";
            return;
        }
        wishFeedback.innerText = "✨ Спасибо! Ваше пожелание достигло наших сердец. ✨";
        wishFeedback.style.color = "#2c5a2c";
        wishInput.value = "";
        setTimeout(() => {
            wishFeedback.innerText = "";
        }, 3000);
    });
}

// RSVP
const rsvpBtn = document.getElementById("rsvpButton");
if (rsvpBtn) {
    rsvpBtn.addEventListener("click", () => {
        alert("Благодарим за подтверждение! Мы будем ждать вас 10 июля 2026 ❤️");
    });
}

// Сердце-скролл
const heartScroll = document.getElementById("heartScroll");
const scrollTip = document.getElementById("scrollTip");

if (heartScroll) {
    heartScroll.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

if (scrollTip) {
    window.addEventListener("scroll", () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollTip.style.opacity = scrollPercent > 95 ? "0" : "1";
    });
}

// Смена фоновых изображений (Unsplash)
const bgImages = document.querySelectorAll(".bg-image");
if (bgImages.length > 0) {
    let bgIndex = 0;
    setInterval(() => {
        bgIndex = (bgIndex + 1) % bgImages.length;
        bgImages.forEach((img, idx) => {
            img.style.opacity = idx === bgIndex ? "0.2" : "0.08";
        });
    }, 8000);
}

// ========== РАБОТА С ВАШИМИ ФОТО (4-6 штук на заднем плане) ==========
function addBackgroundPhotos() {
    // Используем 5 ваших фото для фона
    const bgPhotos = ["./images/photo5.jpg", "./images/photo2.jpg", "./images/photo8.jpg", "./images/photo4.jpg", "./images/photo1.jpg"];

    const positions = ["bg-decor-1", "bg-decor-2", "bg-decor-3", "bg-decor-4", "bg-decor-5"];

    // Создаем контейнер для фоновых фото, если его нет
    let bgContainer = document.getElementById("bgDecorContainer");
    if (!bgContainer) {
        bgContainer = document.createElement("div");
        bgContainer.id = "bgDecorContainer";
        document.body.appendChild(bgContainer);
    }

    // Добавляем каждое фото как фоновый элемент
    bgPhotos.forEach((photoUrl, index) => {
        if (index >= positions.length) return;

        const decorBg = document.createElement("div");
        decorBg.className = `bg-decor-photo ${positions[index]}`;
        decorBg.style.backgroundImage = `url('${photoUrl}')`;

        // Обработчик ошибки загрузки
        decorBg.addEventListener("error", () => {
            console.log(`Не удалось загрузить фоновое фото: ${photoUrl}`);
            decorBg.style.display = "none";
        });

        bgContainer.appendChild(decorBg);
    });
}

// Добавляем фото в секцию с таймером (декоративное)
function addTimerDecoration() {
    const timerSection = document.querySelector(".timer-section");
    if (!timerSection) return;

    // Добавляем маленькое декоративное фото внутри таймера (не навязчиво)
    const timerDecor = document.createElement("div");
    timerDecor.style.cssText = `
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        margin: 10px auto 0;
        opacity: 0.3;
        filter: grayscale(0.8);
        transition: opacity 0.3s;
    `;
    timerDecor.innerHTML = `<img src="./images/photo6.jpg" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none'">`;
    timerDecor.addEventListener("mouseenter", () => (timerDecor.style.opacity = "0.6"));
    timerDecor.addEventListener("mouseleave", () => (timerDecor.style.opacity = "0.3"));

    timerSection.appendChild(timerDecor);
}

// Добавляем фото в подвал
function addFooterPhoto() {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const footerDecor = document.createElement("div");
    footerDecor.style.cssText = `
        display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        opacity: 0.2;
        filter: grayscale(1);
        vertical-align: middle;
        margin-left: 10px;
    `;
    footerDecor.innerHTML = `<img src="./images/photo7.jpg" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none'">`;

    footer.insertBefore(footerDecor, footer.firstChild);
}

// Инициализация
document.addEventListener("DOMContentLoaded", () => {
    renderGreeting();

    addBackgroundPhotos(); // 5 фото на заднем плане
    addTimerDecoration(); // 1 фото в таймере
    addFooterPhoto(); // 1 маленькое фото в подвале

    // Обработка ошибок загрузки Unsplash фонов (они могут не загрузиться)
    const unsplashBg = document.querySelectorAll(".bg-image");
    unsplashBg.forEach((img) => {
        img.addEventListener("error", () => {
            img.style.opacity = "0";
        });
    });
});

console.log("На странице используются ваши фото как декоративные фоновые элементы");
