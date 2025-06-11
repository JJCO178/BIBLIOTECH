
//js home_alumnps
// Variables globales para estudiante
let currentSection = 'home';

// Funciones de navegación para estudiante
function showHome() {
    hideAllSections();
    document.getElementById('homeSection').classList.remove('hidden');
    setActiveNavButton('Inicio');
    currentSection = 'home';
}

function showProfile() {
    hideAllSections();
    document.getElementById('profileSection').classList.remove('hidden');
    setActiveNavButton('Perfil');
    currentSection = 'profile';
}

function showBooks() {
    hideAllSections();
    document.getElementById('booksSection').classList.remove('hidden');
    setActiveNavButton('Libros');
    currentSection = 'books';
}

function showComments() {
    hideAllSections();
    document.getElementById('commentsSection').classList.remove('hidden');
    setActiveNavButton('Comentarios');
    currentSection = 'comments';
}

function hideAllSections() {
    const sections = ['homeSection', 'profileSection', 'booksSection', 'commentsSection'];
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            element.classList.add('hidden');
        }
    });
}

function setActiveNavButton(activeText) {
    const navButtons = document.querySelectorAll('.nav-btn:not(.logout-btn)');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === activeText) {
            btn.classList.add('active');
        }
    });
}

function logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        alert('Cerrando sesión...');
        // Aquí puedes agregar la lógica de logout real
        // window.location.href = '/login/';
    }
}

// Crear partículas flotantes específicas para estudiante
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';

        particlesContainer.appendChild(particle);
    }
}

// Efecto de seguimiento del mouse para estudiante
function createMouseFollower() {
    document.addEventListener('mousemove', (e) => {
        const cursor = document.createElement('div');
        cursor.style.position = 'fixed';
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.width = '3px';
        cursor.style.height = '3px';
        cursor.style.background = 'rgba(76, 175, 80, 0.6)';
        cursor.style.borderRadius = '50%';
        cursor.style.pointerEvents = 'none';
        cursor.style.zIndex = '1000';
        cursor.style.animation = 'fadeOut 1s ease-out forwards';

        document.body.appendChild(cursor);

        setTimeout(() => {
            cursor.remove();
        }, 1000);
    });
}

// Funciones específicas para estudiante
function addCardInteractions() {
    const cards = document.querySelectorAll('.dashboard-card');

    cards.forEach((card, index) => {
        // Añadir efecto de entrada escalonado
        card.style.animationDelay = (index * 0.1) + 's';
        card.style.animation = 'slideInUp 0.6s ease-out forwards';

        // Añadir interacciones específicas
        card.addEventListener('click', () => {
            const title = card.querySelector('.card-title').textContent;
            handleCardClick(title);
        });
    });
}

function handleCardClick(cardTitle) {
    switch (cardTitle) {
        case 'Mis Lecturas':
            alert('Accediendo a tus lecturas actuales...');
            break;
        case 'Explorar Libros':
            alert('Explorando catálogo de libros...');
            break;
        case 'Mis Reseñas':
            alert('Mostrando tus reseñas...');
            break;
        case 'Estadísticas':
            alert('Cargando estadísticas de lectura...');
            break;
        case 'Mis Libros':
            alert('Accediendo a tu biblioteca personal...');
            break;
        case 'Buscar Libros':
            alert('Abriendo buscador de libros...');
            break;
        case 'Continuar Leyendo':
            alert('Retomando última lectura...');
            break;
        case 'Favoritos':
            alert('Mostrando libros favoritos...');
            break;
        case 'Mis Comentarios':
            alert('Revisando tus comentarios...');
            break;
        case 'Discusiones':
            alert('Accediendo a foros de discusión...');
            break;
        case 'Escribir Reseña':
            alert('Abriendo editor de reseñas...');
            break;
        default:
            alert('Función en desarrollo...');
    }
}

// Función para mostrar notificaciones de estudiante
function showStudentNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(0, 212, 255, 0.9)'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Función para simular progreso de lectura
function updateReadingProgress() {
    const progressData = {
        booksRead: Math.floor(Math.random() * 15) + 5,
        currentlyReading: Math.floor(Math.random() * 3) + 1,
        totalPages: Math.floor(Math.random() * 2000) + 1000,
        streak: Math.floor(Math.random() * 30) + 1
    };

    console.log('Progreso de lectura actualizado:', progressData);
    return progressData;
}

// Inicializar la aplicación de estudiante
document.addEventListener('DOMContentLoaded', () => {
    // Crear elementos visuales
    createParticles();
    createMouseFollower();

    // Añadir interacciones a las tarjetas
    setTimeout(() => {
        addCardInteractions();
    }, 500);

    // Mostrar notificación de bienvenida
    setTimeout(() => {
        showStudentNotification('¡Bienvenido de vuelta! Tienes nuevos libros recomendados.', 'success');
    }, 2000);

    // Actualizar progreso de lectura
    updateReadingProgress();

    // Efecto de carga completada
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 1000);
});

// Estilo para animaciones específicas de estudiante
const studentStyles = document.createElement('style');
studentStyles.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(2.5);
        }
    }
    
    .loaded .dashboard-card {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    .dashboard-card:nth-child(1) { animation-delay: 0.1s; }
    .dashboard-card:nth-child(2) { animation-delay: 0.2s; }
    .dashboard-card:nth-child(3) { animation-delay: 0.3s; }
    .dashboard-card:nth-child(4) { animation-delay: 0.4s; }
`;
document.head.appendChild(studentStyles);

// Atajos de teclado para estudiante
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case '1':
                e.preventDefault();
                showHome();
                break;
            case '2':
                e.preventDefault();
                showProfile();
                break;
            case '3':
                e.preventDefault();
                showBooks();
                break;
            case '4':
                e.preventDefault();
                showComments();
                break;
        }
    }
});

// Función para modo oscuro/claro (futura implementación)
function toggleTheme() {
    console.log('Alternando tema...');
    // Implementación futura
}

// Función para búsqueda rápida
function quickSearch(query) {
    if (query.trim()) {
        showStudentNotification(`Buscando: "${query}"...`);
        // Implementación futura de búsqueda
    }
}





// Función para mostrar el popover del estudiante
function showStudentPopover() {
    document.getElementById('studentPopover').classList.add('active');
    // Opcional: agregar un pequeño efecto de feedback visual
    const card = event.currentTarget;
    card.style.transform = 'scale(0.98)';
    setTimeout(() => {
        card.style.transform = '';
    }, 150);
}

// Función para cerrar el popover
function closePopover() {
    document.getElementById('studentPopover').classList.remove('active');
}

// Cerrar con click fuera del popover
document.getElementById('studentPopover').addEventListener('click', function (e) {
    if (e.target === this) {
        closePopover();
    }
});

// Cerrar con tecla ESC
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closePopover();
    }
});