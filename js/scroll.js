// scroll.js - Анимированное появление блоков при скролле

class ScrollAnimator {
    constructor() {
        // Селекторы блоков для анимации
        this.selectors = [".greeting-block", ".invitation-card", ".timer-section", ".story-section", ".gallery-section", ".wishes-section", ".rsvp-btn"];

        // Разные стили анимации
        this.animations = ["fade-up", "fade-left", "fade-right", "scale-up", "zoom-in", "blur-in", "slide-up", "rotate-in"];

        this.init();
    }

    init() {
        this.applyInitialStyles();
        this.setupObserver();
        this.addStyles();
    }

    applyInitialStyles() {
        const elements = this.getAllElements();
        elements.forEach((el, index) => {
            // Выбираем анимацию для элемента на основе индекса
            const animationType = this.animations[index % this.animations.length];
            el.classList.add("scroll-animate");
            el.classList.add(`animate-${animationType}`);

            // Добавляем небольшой delay для последовательного появления
            if (el.parentElement && el.parentElement.children) {
                const siblings = Array.from(el.parentElement.children);
                const siblingIndex = siblings.indexOf(el);
                if (siblingIndex !== -1) {
                    el.style.transitionDelay = `${siblingIndex * 0.1}s`;
                }
            }
        });
    }

    getAllElements() {
        let elements = [];
        this.selectors.forEach((selector) => {
            const found = document.querySelectorAll(selector);
            elements.push(...found);
        });

        // Добавляем все дочерние элементы внутри секций для более детальной анимации
        document.querySelectorAll(".story-text p, .gallery-grid .photo-card, .timer-block").forEach((el) => {
            if (!el.closest(".scroll-animate")) {
                elements.push(el);
            }
        });

        return elements;
    }

    setupObserver() {
        const options = {
            threshold: 0.15, // Элемент считается видимым при 15% появлении
            rootMargin: "0px 0px -50px 0px", // Немного смещаем триггер
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    observer.unobserve(entry.target); // Анимируем один раз
                }
            });
        }, options);

        // Наблюдаем за всеми элементами с классом scroll-animate
        document.querySelectorAll(".scroll-animate").forEach((el) => {
            observer.observe(el);
        });

        // Дополнительно наблюдаем за элементами внутри галереи
        document.querySelectorAll(".photo-card, .timer-block, .invite-text-main, .couple-surname").forEach((el) => {
            if (!el.classList.contains("scroll-animate")) {
                el.classList.add("scroll-animate");
                el.classList.add("animate-fade-up");
                observer.observe(el);
            }
        });
    }

    animateElement(element) {
        // Удаляем класс hidden и добавляем visible
        element.classList.add("animate-visible");

        // Добавляем эффект пульсации для важных элементов
        if (element.classList.contains("rsvp-btn") || element.classList.contains("send-wish-btn")) {
            element.classList.add("animate-pulse");
            setTimeout(() => {
                element.classList.remove("animate-pulse");
            }, 800);
        }

        // Специальный эффект для таймера
        if (element.classList.contains("timer-section")) {
            this.animateTimerBlocks();
        }

        // Специальный эффект для фото-карточек
        if (element.classList.contains("photo-card")) {
            element.style.transform = "translateY(0)";
        }

        // Триггерим кастомное событие для других скриптов
        const event = new CustomEvent("elementAnimated", { detail: { element } });
        document.dispatchEvent(event);
    }

    animateTimerBlocks() {
        const blocks = document.querySelectorAll(".timer-block");
        blocks.forEach((block, index) => {
            setTimeout(() => {
                block.classList.add("animate-visible");
                block.style.transform = "scale(1)";
            }, index * 100);
        });
    }

    addStyles() {
        // Добавляем CSS стили через JavaScript для гарантии
        const styleSheet = document.createElement("style");
        styleSheet.textContent = `
            /* Базовые стили для анимации */
            .scroll-animate {
                opacity: 0;
                visibility: hidden;
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                will-change: transform, opacity, filter;
            }
            
            .animate-visible {
                opacity: 1 !important;
                visibility: visible !important;
            }
            
            /* Fade Up - плавное появление снизу */
            .animate-fade-up {
                transform: translateY(40px);
            }
            .animate-fade-up.animate-visible {
                transform: translateY(0);
            }
            
            /* Fade Left - появление слева */
            .animate-fade-left {
                transform: translateX(-40px);
            }
            .animate-fade-left.animate-visible {
                transform: translateX(0);
            }
            
            /* Fade Right - появление справа */
            .animate-fade-right {
                transform: translateX(40px);
            }
            .animate-fade-right.animate-visible {
                transform: translateX(0);
            }
            
            /* Scale Up - увеличение */
            .animate-scale-up {
                transform: scale(0.8);
            }
            .animate-scale-up.animate-visible {
                transform: scale(1);
            }
            
            /* Zoom In - зумирование */
            .animate-zoom-in {
                transform: scale(0.5);
                opacity: 0;
            }
            .animate-zoom-in.animate-visible {
                transform: scale(1);
                opacity: 1;
            }
            
            /* Blur In - появление из размытия */
            .animate-blur-in {
                filter: blur(10px);
            }
            .animate-blur-in.animate-visible {
                filter: blur(0);
            }
            
            /* Slide Up - скольжение вверх */
            .animate-slide-up {
                transform: translateY(60px);
                opacity: 0;
            }
            .animate-slide-up.animate-visible {
                transform: translateY(0);
                opacity: 1;
            }
            
            /* Rotate In - поворот */
            .animate-rotate-in {
                transform: rotate(-10deg) scale(0.9);
                opacity: 0;
            }
            .animate-rotate-in.animate-visible {
                transform: rotate(0) scale(1);
                opacity: 1;
            }
            
            /* Пульсация для кнопок */
            @keyframes gentlePulse {
                0% { transform: scale(1); box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
                50% { transform: scale(1.05); box-shadow: 0 8px 25px rgba(0,0,0,0.3); }
                100% { transform: scale(1); box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
            }
            
            .animate-pulse {
                animation: gentlePulse 0.6s ease-in-out !important;
            }
            
            /* Анимация для фото-карточек */
            .photo-card {
                transition: transform 0.5s ease, box-shadow 0.3s ease;
            }
            
            .photo-card.animate-visible {
                animation: cardGlow 0.8s ease-out;
            }
            
            @keyframes cardGlow {
                0% { box-shadow: 0 0 0 rgba(210, 180, 140, 0); transform: translateY(20px); opacity: 0; }
                50% { box-shadow: 0 0 20px rgba(210, 180, 140, 0.5); }
                100% { box-shadow: 0 5px 20px rgba(0,0,0,0.1); transform: translateY(0); opacity: 1; }
            }
            
            /* Анимация для блоков таймера */
            .timer-block {
                transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                transform: scale(0.9);
                opacity: 0;
            }
            
            .timer-block.animate-visible {
                transform: scale(1);
                opacity: 1;
            }
            
            /* Анимация для текста пожеланий */
            .story-text p {
                transition: all 0.5s ease;
                opacity: 0;
                transform: translateX(-20px);
            }
            
            .story-text p.animate-visible {
                opacity: 1;
                transform: translateX(0);
            }
            
            /* Специальный эффект для сердечного разделителя */
            .heart-divider {
                transition: all 0.6s ease;
                transform: scale(0);
                opacity: 0;
            }
            
            .heart-divider.animate-visible {
                transform: scale(1);
                opacity: 1;
                animation: heartBeat 0.8s ease;
            }
            
            @keyframes heartBeat {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.2); }
            }
            
            /* Анимация для блока приветствия */
            .greeting-block {
                transition: all 0.8s ease-out;
                letter-spacing: -2px;
                opacity: 0;
                transform: scale(0.95);
            }
            
            .greeting-block.animate-visible {
                opacity: 1;
                letter-spacing: normal;
                transform: scale(1);
            }
            
            
            /* Адаптивность для мобильных */
            @media (max-width: 768px) {
                .scroll-animate {
                    transition-duration: 0.5s;
                }
                .animate-fade-up,
                .animate-fade-left,
                .animate-fade-right {
                    transform: translateY(20px) translateX(0);
                }
            }
            
            /* Для устройств с reduced motion - отключаем анимацию */
            @media (prefers-reduced-motion: reduce) {
                .scroll-animate {
                    transition: none !important;
                    animation: none !important;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }

    // Публичный метод для ручного обновления (например, после динамической загрузки контента)
    refresh() {
        this.init();
    }
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    window.scrollAnimator = new ScrollAnimator();
});

// Переинициализация после возможных AJAX-запросов
if (window.MutationObserver) {
    const observer = new MutationObserver((mutations) => {
        let shouldRefresh = false;
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
                shouldRefresh = true;
            }
        });
        if (shouldRefresh && window.scrollAnimator) {
            setTimeout(() => window.scrollAnimator.refresh(), 100);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
}
