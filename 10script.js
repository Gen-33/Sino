// ========== МОДАЛЬНОЕ ОКНО ==========
//<!-- сен 27.05.2026 18-30 -->

const modal = document.getElementById('callbackModal');
const modalName = document.getElementById('modalName');
const modalPhone = document.getElementById('modalPhone');
const submitBtn = document.getElementById('submitModalBtn');

function openModal() {
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        if (modalName) modalName.value = '';
        if (modalPhone) modalPhone.value = '';
    }
}

function closeModal() {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Закрытие
document.querySelector('.close-modal')?.addEventListener('click', closeModal);
window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal?.style.display === 'flex') closeModal(); });

// Отправка
if (submitBtn) {
    submitBtn.addEventListener('click', () => {
        const name = modalName ? modalName.value.trim() : '';
        const phone = modalPhone ? modalPhone.value.trim() : '';
        if (!name) { alert('Введите имя'); modalName?.focus(); return; }
        if (!phone) { alert('Введите телефон'); modalPhone?.focus(); return; }
        alert(`Спасибо, ${name}! Мы перезвоним по номеру ${phone}`);
        closeModal();
    });
}

// Кнопки открытия модалки
document.querySelectorAll('.heroFixBtn').forEach(btn => btn.addEventListener('click', openModal));

// Тест-драйв
document.querySelectorAll('.pbutton, .gen-pbutton').forEach(btn => {
    btn.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
});

// Три кнопки в карточке (УЗНАТЬ СТОИМОСТЬ, РАССЧИТАТЬ КРЕДИТ, ПОДОБРАТЬ КОМПЛЕКТАЦИЮ)
document.querySelectorAll('.Btn3').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
});

// Навигация
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert(`Модель ${link.innerText}. Акции действуют! Оставьте заявку.`);
        openModal();
    });
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Анимация появления карточек
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.car-card').forEach((card, idx) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.5s ease ${idx * 0.1}s, transform 0.5s ease ${idx * 0.1}s`;
    observer.observe(card);
});

// Переключение цветов (работает для каждой карточки отдельно)
document.querySelectorAll('.colors-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.stopPropagation();
        const carCard = this.closest('.car-card');
        if (!carCard) return;
        const carImage = carCard.querySelector('.car-card-image img');
        if (!carImage) return;
        carCard.querySelectorAll('.colors-item').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        const newSrc = this.getAttribute('data-color-img');
        if (newSrc) carImage.src = newSrc;
    });
});

// Форматирование телефона в модалке
if (modalPhone) {
    modalPhone.addEventListener('input', function() {
        let v = this.value.replace(/\D/g, '');
        if (v.length > 11) v = v.slice(0, 11);
        if (v.length) {
            let f = '+' + v[0];
            if (v.length >= 2) f += ' (' + v.slice(1, 4);
            if (v.length >= 5) f += ') ' + v.slice(4, 7);
            if (v.length >= 8) f += '-' + v.slice(7, 9);
            if (v.length >= 10) f += '-' + v.slice(9, 11);
            this.value = f;
        } else this.value = '';
    });
}

console.log('Скрипт загружен: всё работает.');