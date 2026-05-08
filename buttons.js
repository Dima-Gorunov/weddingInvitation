// Полный скрипт для всех кнопок (подтверждение, звонки, группы)
(function () {
    // ========== НАСТРОЙКИ (ЗАМЕНИТЕ НА СВОИ ДАННЫЕ) ==========
    // Номера телефонов
    const groomPhone = "+79123456789"; // Номер жениха (замените)
    const bridePhone = "+79876543210"; // Номер невесты (замените)
    const commonPhone = "+79123456789"; // Общий номер для общих чатов/связи

    // Telegram
    const groomTelegram = "DmitriyGoryunov"; // Username жениха
    const brideTelegram = "AlbinaGoryunova"; // Username невесты
    const commonTelegram = "GoryunovWedding"; // Общая группа/чат

    // VK
    const groomVk = "dmitriy_goryunov"; // ID или screen_name жениха
    const brideVk = "albina_goryunova"; // ID или screen_name невесты
    const commonVk = "club123456789"; // Группа/беседа

    // WhatsApp группы/чаты
    const groomWhatsApp = groomPhone;
    const brideWhatsApp = bridePhone;
    const commonWhatsAppGroup = "https://chat.whatsapp.com/yourinvitelink"; // Ссылка-приглашение в группу
    // ========================================================

    // Вспомогательная функция для очистки номера
    function cleanPhone(phone) {
        return phone.replace(/[^0-9+]/g, "");
    }

    // ----- КНОПКИ ПОДТВЕРЖДЕНИЯ (существующие) -----
    // Telegram
    const telegramBtn = document.getElementById("telegramBtn");
    if (telegramBtn) {
        telegramBtn.href = `https://t.me/${groomTelegram}`;
        telegramBtn.target = "_blank";
        telegramBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.open(`https://t.me/${groomTelegram}`, "_blank");
        });
    }

    // WhatsApp подтверждение
    const whatsappBtn = document.getElementById("whatsappBtn");
    if (whatsappBtn) {
        whatsappBtn.href = `https://wa.me/${cleanPhone(commonPhone)}`;
        whatsappBtn.target = "_blank";
        whatsappBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.open(`https://wa.me/${cleanPhone(commonPhone)}`, "_blank");
        });
    }

    // VK подтверждение
    const vkBtn = document.getElementById("vkBtn");
    if (vkBtn) {
        vkBtn.href = `https://vk.com/${groomVk}`;
        vkBtn.target = "_blank";
        vkBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.open(`https://vk.com/${groomVk}`, "_blank");
        });
    }

    // Общий звонок
    const callBtn = document.getElementById("callBtn");
    if (callBtn) {
        callBtn.href = `tel:${cleanPhone(commonPhone)}`;
        callBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = `tel:${cleanPhone(commonPhone)}`;
        });
    }

    // ----- НОВЫЕ КНОПКИ: ЗВОНОК ЖЕНИХУ И НЕВЕСТЕ -----
    const callGroomBtn = document.getElementById("callGroomBtn");
    if (callGroomBtn) {
        callGroomBtn.href = `tel:${cleanPhone(groomPhone)}`;
        callGroomBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = `tel:${cleanPhone(groomPhone)}`;
        });
    }

    const callBrideBtn = document.getElementById("callBrideBtn");
    if (callBrideBtn) {
        callBrideBtn.href = `tel:${cleanPhone(bridePhone)}`;
        callBrideBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = `tel:${cleanPhone(bridePhone)}`;
        });
    }

    // ----- ОБЩИЕ ГРУППЫ -----
    // WhatsApp группа
    const whatsappGroupBtn = document.getElementById("whatsappGroupBtn");
    if (whatsappGroupBtn) {
        whatsappGroupBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (commonWhatsAppGroup.includes("chat.whatsapp.com")) {
                window.open(commonWhatsAppGroup, "_blank");
            } else {
                // Если нет ссылки, предлагаем написать организаторам
                window.open(
                    `https://wa.me/${cleanPhone(commonPhone)}?text=${encodeURIComponent("Здравствуйте! Хочу вступить в общую группу к свадьбе")}`,
                    "_blank",
                );
            }
        });
    }

    // Telegram группа
    const telegramGroupBtn = document.getElementById("telegramGroupBtn");
    if (telegramGroupBtn) {
        telegramGroupBtn.addEventListener("click", (e) => {
            e.preventDefault();
            // Можно использовать ссылку-приглашение или username группы
            window.open(`https://t.me/${commonTelegram}`, "_blank");
        });
    }

    // VK группа
    const vkGroupBtn = document.getElementById("vkGroupBtn");
    if (vkGroupBtn) {
        vkGroupBtn.addEventListener("click", (e) => {
            e.preventDefault();
            let vkUrl = `https://vk.com/${commonVk}`;
            if (!commonVk.startsWith("club") && !commonVk.startsWith("public")) {
                vkUrl = `https://vk.com/${commonVk}`;
            }
            window.open(vkUrl, "_blank");
        });
    }
})();
