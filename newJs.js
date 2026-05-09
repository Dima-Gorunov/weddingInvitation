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
        greetingDiv.innerHTML = `${formatGreeting(guestData.names)}`;
    } else {
        greetingDiv.innerHTML = `Дорогие наши гости!`;
    }
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

// ========== АНИМАЦИИ ПРИ СКРОЛЛЕ ==========
// Различные эффекты для блоков и текстов

(function () {
    // Ждем полной загрузки DOM
    document.addEventListener("DOMContentLoaded", function () {
        // Находим все элементы, которые будем анимировать
        const animatedElements = [
            // Основные блоки
            ...document.querySelectorAll(".card-bw"),
            ...document.querySelectorAll(".photo-bg-block"),
            ...document.querySelectorAll(".hero-bw"),
            // Текстовые элементы внутри блоков
            ...document.querySelectorAll(".story-text p"),
            ...document.querySelectorAll(".invite-text-main"),
            ...document.querySelectorAll(".story-text"),
            // Заголовки
            ...document.querySelectorAll("h2"),
            ...document.querySelectorAll(".wedding-names"),
            ...document.querySelectorAll(".timer-title"),
            // Таймер
            ...document.querySelectorAll(".timer"),
            // Кнопки и группы
            // ...document.querySelectorAll(".rsvp-buttons-grid"),
            // ...document.querySelectorAll(".call-buttons-row"),
            // ...document.querySelectorAll(".group-buttons"),
            // Дополнительные элементы
            ...document.querySelectorAll(".heart-divider"),
            ...document.querySelectorAll(".greeting-block"),
            ...document.querySelectorAll(".invite-sub"),
            ...document.querySelectorAll(".event-details"),
            ...document.querySelectorAll("footer"),
        ];

        // Убираем дубликаты (если элемент попал несколько раз)
        const uniqueElements = [...new Set(animatedElements)];

        // Добавляем классы для анимации и изначально скрываем элементы
        uniqueElements.forEach((el, index) => {
            // Пропускаем если элемент уже имеет класс анимации
            if (el.classList.contains("animated")) return;

            // Добавляем базовый класс для анимации
            el.classList.add("scroll-animated");

            // Определяем тип анимации в зависимости от типа элемента
            let animationType = "fadeInUp";

            if (el.classList.contains("timer") || el.classList.contains("timer-section")) {
                animationType = "scaleIn";
            } else if (el.classList.contains("rsvp-buttons-grid") || el.classList.contains("group-buttons")) {
                animationType = "staggerIn";
            } else if (el.classList.contains("heart-divider")) {
                animationType = "rotateIn";
            } else if (el.tagName === "H2") {
                animationType = "slideInLeft";
            } else if (el.classList.contains("wedding-names")) {
                animationType = "zoomIn";
            } else if (el.classList.contains("story-text")) {
                animationType = "fadeInRight";
            } else if (el.classList.contains("photo-bg-block")) {
                animationType = "fadeInScale";
            } else {
                // animationType = "fadeInUp";
            }

            el.setAttribute("data-animation", animationType);
            el.style.opacity = "0";
            el.style.transform = "translateY(30px)";
        });

        // Добавляем стили анимаций в head
        const styleSheet = document.createElement("style");
        styleSheet.textContent = `
            /* Базовые стили для анимируемых элементов */
            .scroll-animated {
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                will-change: transform, opacity;
            }
            
            /* Анимация появления снизу */
            .scroll-animated.fadeInUp {
                animation: fadeInUpAnim 0.8s ease forwards;
            }
            
            /* Анимация появления справа */
            .scroll-animated.fadeInRight {
                animation: fadeInRightAnim 0.8s ease forwards;
            }
            
            /* Анимация появления с масштабом */
            .scroll-animated.scaleIn {
                animation: scaleInAnim 0.6s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
            }
            
            /* Анимация с вращением */
            .scroll-animated.rotateIn {
                animation: rotateInAnim 0.6s ease forwards;
            }
            
            /* Анимация выезда слева */
            .scroll-animated.slideInLeft {
                animation: slideInLeftAnim 0.7s ease forwards;
                display:flex;
                gap:10px;
            }
            
            /* Анимация с зумом */
            .scroll-animated.zoomIn {
                animation: zoomInAnim 0.8s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
            }
            
            /* Анимация с масштабированием и прозрачностью */
            .scroll-animated.fadeInScale {
                animation: fadeInScaleAnim 0.9s ease forwards;
            }
            
            /* Ключевые кадры анимаций */
            @keyframes fadeInUpAnim {
                0% {
                    opacity: 0;
                    transform: translateY(40px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeInRightAnim {
                0% {
                    opacity: 0;
                    transform: translateX(-30px);
                }
                100% {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes scaleInAnim {
                0% {
                    opacity: 0;
                    transform: scale(0.8);
                }
                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            @keyframes rotateInAnim {
                0% {
                    opacity: 0;
                    transform: rotate(-10deg) scale(0.9);
                }
                100% {
                    opacity: 1;
                    transform: rotate(0) scale(1);
                }
            }
            
            @keyframes slideInLeftAnim {
                0% {
                    opacity: 0;
                    transform: translateX(-40px);
                }
                100% {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes zoomInAnim {
                0% {
                    opacity: 0;
                    transform: scale(0.5);
                }
                50% {
                    opacity: 0.5;
                    transform: scale(1.05);
                }
                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            @keyframes fadeInScaleAnim {
                0% {
                    opacity: 0;
                    transform: scale(0.9) translateY(20px);
                }
                100% {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }
            
            /* Эффект пульсации для таймера при появлении */
            @keyframes pulseGlow {
                0% {
                    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
                }
                70% {
                    box-shadow: 0 0 0 15px rgba(0, 0, 0, 0);
                }
                100% {
                    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
                }
            }
            
            .timer.scaleIn .timer-block {
                animation: pulseGlow 0.6s ease-out;
            }
            
            /* Задержки для последовательного появления кнопок */
            .rsvp-buttons-grid.scroll-animated a,
            .call-buttons-row.scroll-animated a,
            .group-buttons.scroll-animated a {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.5s ease;
            }
            
            .rsvp-buttons-grid.staggerIn a:nth-child(1) { transition-delay: 0.1s; }
            .rsvp-buttons-grid.staggerIn a:nth-child(2) { transition-delay: 0.2s; }
            .rsvp-buttons-grid.staggerIn a:nth-child(3) { transition-delay: 0.3s; }
            .rsvp-buttons-grid.staggerIn a:nth-child(4) { transition-delay: 0.4s; }
            
            .call-buttons-row.staggerIn a:nth-child(1) { transition-delay: 0.15s; }
            .call-buttons-row.staggerIn a:nth-child(2) { transition-delay: 0.3s; }
            
            .group-buttons.staggerIn a:nth-child(1) { transition-delay: 0.1s; }
            .group-buttons.staggerIn a:nth-child(2) { transition-delay: 0.2s; }
            .group-buttons.staggerIn a:nth-child(3) { transition-delay: 0.3s; }
            
            .rsvp-buttons-grid.staggerIn a,
            .call-buttons-row.staggerIn a,
            .group-buttons.staggerIn a {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(styleSheet);

        // Функция проверки видимости элемента
        function isElementInViewport(el, offset = 100) {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;

            // Элемент считается видимым, если его верхняя граница выше нижней границы окна минус offset
            // и нижняя граница выше верхней границы окна плюс offset
            return rect.top < windowHeight - offset && rect.bottom > offset;
        }

        // Функция применения анимации к видимым элементам
        function animateOnScroll() {
            const elements = document.querySelectorAll(".scroll-animated");

            elements.forEach((el) => {
                // Пропускаем уже анимированные элементы
                if (el.classList.contains("animated")) return;

                // Проверяем видимость элемента
                if (isElementInViewport(el, 120)) {
                    const animationType = el.getAttribute("data-animation");

                    // Добавляем класс анимации
                    if (animationType) {
                        el.classList.add(animationType);
                    } else {
                        el.classList.add("fadeInUp");
                    }

                    // Для кнопок с каскадной анимацией добавляем дополнительный класс
                    if (animationType === "staggerIn") {
                        el.classList.add("staggerIn");
                        // Находим все дочерние ссылки и применяем к ним анимацию
                        const links = el.querySelectorAll("a");
                        links.forEach((link) => {
                            link.style.opacity = "1";
                            link.style.transform = "translateY(0)";
                        });
                    }

                    // Добавляем эффект для таймера
                    if (el.classList.contains("timer") && animationType === "scaleIn") {
                        const blocks = el.querySelectorAll(".timer-block");
                        blocks.forEach((block, idx) => {
                            block.style.animation = `pulseGlow 0.6s ease-out ${idx * 0.1}s`;
                        });
                    }

                    // Отмечаем элемент как анимированный
                    el.classList.add("animated");

                    // Добавляем небольшую задержку для текстов внутри блока
                    if (el.classList.contains("story-text") || el.classList.contains("invite-text-main")) {
                        const paragraphs = el.querySelectorAll("p");
                        paragraphs.forEach((p, idx) => {
                            p.style.animation = `fadeInUpAnim 0.5s ease forwards ${idx * 0.1}s`;
                        });
                    }
                }
            });
        }

        // Дополнительная анимация для отдельных слов в заголовках
        function animateHeadings() {
            const headings = document.querySelectorAll("h2, .wedding-names, .timer-title");

            headings.forEach((heading) => {
                if (heading.classList.contains("heading-animated")) return;

                const text = heading.innerText;
                const words = text.split(" ");

                if (words.length > 1 && !heading.querySelector(".animated-word")) {
                    heading.classList.add("heading-animated");
                    heading.style.opacity = "0";

                    // Создаем span для каждого слова
                    const newHtml = words
                        .map((word, idx) => {
                            return `<span class="animated-word" style="display:inline-block; opacity:0; transform:translateY(20px); transition:all 0.4s cubic-bezier(0.4,0,0.2,1) ${idx * 0.1}s">${word} </span>`;
                        })
                        .join("");

                    // Сохраняем оригинальный HTML с тегами
                    if (heading.querySelector("span.ampersand")) {
                        // Для заголовка с амперсандом не применяем разбивку
                        heading.classList.remove("heading-animated");
                        heading.style.opacity = "";
                    } else {
                        heading.innerHTML = newHtml;
                        heading.style.opacity = "1";
                    }
                }
            });

            // Анимируем слова при появлении заголовка
            const headingObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const words = entry.target.querySelectorAll(".animated-word");
                            words.forEach((word) => {
                                word.style.opacity = "1";
                                word.style.transform = "translateY(0)";
                            });
                            headingObserver.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.3 },
            );

            document.querySelectorAll(".heading-animated").forEach((heading) => {
                headingObserver.observe(heading);
            });
        }

        // Плавное появление фоновых изображений
        function animateBackgroundElements() {
            const bgElements = document.querySelectorAll(".bg-decor-photo, .bg-image");
            bgElements.forEach((el, idx) => {
                el.style.opacity = "0";
                el.style.transition = `opacity 1s ease ${idx * 0.2}s`;
                setTimeout(() => {
                    el.style.opacity = el.classList.contains("bg-image") ? "0.15" : "0.4";
                }, 100);
            });
        }

        // Эффект параллакса для фоновых фото при скролле
        function parallaxBackground() {
            const scrollPosition = window.pageYOffset;
            const bgDecorPhotos = document.querySelectorAll(".bg-decor-photo");

            bgDecorPhotos.forEach((photo, idx) => {
                const speed = 0.3 + idx * 0.05;
                const yPos = -(scrollPosition * speed);
                photo.style.transform = `translateY(${yPos}px)`;
            });
        }

        // Анимация для стрелок скролла
        function animateScrollArrows() {
            const arrows = document.querySelectorAll(".scroll-arrow");
            arrows.forEach((arrow) => {
                arrow.style.animation = "bounce 1.5s infinite";
            });

            // Добавляем ключевые кадры для bounce
            if (!document.querySelector("#bounceKeyframes")) {
                const bounceStyle = document.createElement("style");
                bounceStyle.id = "bounceKeyframes";
                bounceStyle.textContent = `
                    @keyframes bounce {
                        0%, 100% {
                            transform: translateY(0);
                            opacity: 0.5;
                        }
                        50% {
                            transform: translateY(10px);
                            opacity: 0.8;
                        }
                    }
                `;
                document.head.appendChild(bounceStyle);
            }
        }

        // Инициализация всех анимаций
        function initAnimations() {
            // Сначала применяем начальные стили
            animateBackgroundElements();
            animateHeadings();
            animateScrollArrows();

            // Запускаем проверку видимости при загрузке
            setTimeout(() => {
                animateOnScroll();
            }, 100);

            // Добавляем обработчик скролла с throttle для оптимизации
            let ticking = false;
            window.addEventListener("scroll", function () {
                if (!ticking) {
                    requestAnimationFrame(function () {
                        animateOnScroll();
                        parallaxBackground();
                        ticking = false;
                    });
                    ticking = true;
                }
            });

            // Добавляем обработчик resize
            window.addEventListener("resize", function () {
                animateOnScroll();
            });
        }

        // Запускаем инициализацию
        initAnimations();

        // Добавляем эффект при загрузке страницы
        window.addEventListener("load", function () {
            document.body.classList.add("loaded");
            animateOnScroll();

            // Показываем приветственный блок с анимацией
            const greeting = document.querySelector(".greeting-block");
            if (greeting) {
                greeting.style.opacity = "0";
                greeting.style.transform = "scale(0.8)";
                setTimeout(() => {
                    greeting.style.transition = "all 0.6s ease";
                    greeting.style.opacity = "1";
                    greeting.style.transform = "scale(1)";
                }, 300);
            }
        });

        // Эффект наведения для карточек
        const cards = document.querySelectorAll(".card-bw");
        cards.forEach((card) => {
            card.addEventListener("mouseenter", function () {
                this.style.transform = "translateY(-5px)";
            });
            card.addEventListener("mouseleave", function () {
                this.style.transform = "translateY(0)";
            });
        });
    });
})();
