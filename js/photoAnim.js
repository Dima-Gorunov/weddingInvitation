//    <!-- Скрипт для анимации фото -->

// Функция для удаления смайликов из текста
function removeEmojisFromText() {
    const guestGreeting = document.getElementById("guestGreeting");
    if (guestGreeting && guestGreeting.innerText) {
        guestGreeting.innerText = guestGreeting.innerText
            .replace(
                /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E6}-\u{1F1FF}\u{FE0F}]/gu,
                "",
            )
            .trim();
    }
}

// Анимация фото при скролле
function setupScrollPhotos() {
    const photoElements = [
        { element: document.getElementById("storyPhoto1"), offset: 0.3 },
        { element: document.getElementById("storyPhoto2"), offset: 0.3 },
        { element: document.getElementById("galleryPhoto1"), offset: 0.4 },
        { element: document.getElementById("galleryPhoto2"), offset: 0.4 },
        { element: document.getElementById("timerPhoto1"), offset: 0.35 },
        { element: document.getElementById("timerPhoto2"), offset: 0.35 },
        { element: document.getElementById("wishesPhoto1"), offset: 0.3 },
        { element: document.getElementById("wishesPhoto2"), offset: 0.3 },
    ];

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !entry.target.classList.contains("photo-visible")) {
                    setTimeout(
                        () => {
                            entry.target.classList.add("photo-visible");
                        },
                        entry.target.id.includes("2") ? 300 : 100,
                    );
                }
            });
        },
        { threshold: 0.2 },
    );

    photoElements.forEach((photo) => {
        if (photo.element) {
            observer.observe(photo.element);
        }
    });
}

// Анимация hero фото
function animateHeroPhotos() {
    const photoLeft = document.getElementById("photoLeft");
    const photoRight = document.getElementById("photoRight");

    if (photoLeft) {
        setTimeout(() => {
            photoLeft.classList.add("photo-visible");
        }, 500);
    }

    if (photoRight) {
        setTimeout(() => {
            photoRight.classList.add("photo-visible");
        }, 700);
    }
}

// Эффекты при наведении на фото
function addPhotoHoverEffects() {
    const photos = document.querySelectorAll(
        ".floating-photo-left, .floating-photo-right, .story-floating-photo, .gallery-floating-photo, .timer-floating-photo, .wishes-floating-photo",
    );
    photos.forEach((photo) => {
        photo.addEventListener("mouseenter", () => {
            const currentRotate = photo.style.transform.match(/rotate\(([^)]+)\)/);
            const rotateValue = currentRotate ? currentRotate[1] : "0deg";
            photo.style.transform = `rotate(${parseFloat(rotateValue) * 0.6}deg) scale(1.08)`;
            photo.style.transition = "transform 0.3s ease";
        });

        photo.addEventListener("mouseleave", () => {
            photo.style.transform = "";
            photo.style.transition = "";
        });
    });
}

// Запускаем после загрузки страницы
document.addEventListener("DOMContentLoaded", function () {
    removeEmojisFromText();
    animateHeroPhotos();
    setupScrollPhotos();
    addPhotoHoverEffects();

    // Наблюдаем за изменениями в guestGreeting
    const targetNode = document.getElementById("guestGreeting");
    if (targetNode) {
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === "childList" || mutation.type === "characterData") {
                    removeEmojisFromText();
                }
            });
        });
        observer.observe(targetNode, { childList: true, characterData: true, subtree: true });
    }
});
