// home_docentes.js
// Variables globales para docente
let currentSection = 'home';
let studentsData = [];
let booksData = [];

// Funciones de navegación para docente
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
    setActiveNavButton('Biblioteca');
    currentSection = 'books';
}

function showAddBooks() {
    hideAllSections();
    document.getElementById('addBooksSection').classList.remove('hidden');
    setActiveNavButton('Agregar Libros');
    currentSection = 'addBooks';
}

function showStudents() {
    hideAllSections();
    document.getElementById('studentsSection').classList.remove('hidden');
    setActiveNavButton('Estudiantes');
    currentSection = 'students';
}

function showComments() {
    hideAllSections();
    document.getElementById('commentsSection').classList.remove('hidden');
    setActiveNavButton('Comentarios');
    currentSection = 'comments';
}

function hideAllSections() {
    const sections = ['homeSection', 'profileSection', 'booksSection', 'addBooksSection', 'studentsSection', 'commentsSection'];
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

// Crear partículas flotantes específicas para docente
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 6 + 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        particle.style.animationDelay = Math.random() * 3 + 's';

        particlesContainer.appendChild(particle);
    }
}

// Efecto de seguimiento del mouse para docente
function createMouseFollower() {
    document.addEventListener('mousemove', (e) => {
        const cursor = document.createElement('div');
        cursor.style.position = 'fixed';
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.width = '4px';
        cursor.style.height = '4px';
        cursor.style.background = 'rgba(255, 107, 107, 0.6)';
        cursor.style.borderRadius = '50%';
        cursor.style.pointerEvents = 'none';
        cursor.style.zIndex = '1000';
        cursor.style.animation = 'fadeOut 1.2s ease-out forwards';

        document.body.appendChild(cursor);

        setTimeout(() => {
            cursor.remove();
        }, 1200);
    });
}

// Funciones específicas para docente
function addCardInteractions() {
    const cards = document.querySelectorAll('.dashboard-card');

    cards.forEach((card, index) => {
        // Añadir efecto de entrada escalonado
        card.style.animationDelay = (index * 0.08) + 's';
        card.style.animation = 'slideInUp 0.7s ease-out forwards';

        // Añadir interacciones específicas
        card.addEventListener('click', () => {
            const title = card.querySelector('.card-title').textContent;
            handleCardClick(title);
        });
    });
}

function handleCardClick(cardTitle) {
    switch (cardTitle) {
        case 'Gestionar Biblioteca':
            showTeacherNotification('Accediendo al panel de administración de biblioteca...', 'info');
            break;
        case 'Agregar Contenido':
            showAddBooks();
            break;
        case 'Mis Estudiantes':
            showStudents();
            break;
        case 'Reportes':
            generateReport();
            break;
        case 'Foro Educativo':
            showTeacherNotification('Abriendo foro educativo...', 'info');
            break;
        case 'Recomendaciones':
            createRecommendations();
            break;
        case 'Todos los Libros':
            showBooks();
            break;
        case 'Editar Libros':
            showTeacherNotification('Modo de edición activado...', 'success');
            break;
        case 'Categorías':
            manageCategories();
            break;
        case 'Estadísticas de Uso':
            showUsageStats();
            break;
        case 'Subir Libro':
            uploadBook();
            break;
        case 'Material Complementario':
            uploadSupplementaryMaterial();
            break;
        case 'Contenido Multimedia':
            uploadMultimedia();
            break;
        case 'Listas de Lectura':
            createReadingList();
            break;
        case 'Lista de Estudiantes':
            displayStudentsList();
            break;
        case 'Progreso de Lectura':
            showReadingProgress();
            break;
        case 'Asignar Lecturas':
            assignReadings();
            break;
        case 'Evaluaciones':
            showEvaluations();
            break;
        case 'Moderar Comentarios':
            moderateComments();
            break;
        case 'Foros de Discusión':
            manageForums();
            break;
        case 'Feedback Estudiantil':
            provideFeedback();
            break;
        case 'Destacar Contenido':
            highlightContent();
            break;
        default:
            showTeacherNotification('Función en desarrollo...', 'info');
    }
}

// Funciones específicas del docente
function generateReport() {
    showTeacherNotification('Generando reporte académico...', 'info');
    setTimeout(() => {
        const reportData = {
            totalStudents: Math.floor(Math.random() * 50) + 20,
            booksAssigned: Math.floor(Math.random() * 20) + 10,
            averageProgress: Math.floor(Math.random() * 40) + 60,
            activeDiscussions: Math.floor(Math.random() * 15) + 5
        };
        console.log('Reporte generado:', reportData);
        showTeacherNotification('Reporte generado exitosamente', 'success');
    }, 2000);
}

function createRecommendations() {
    showTeacherNotification('Creando recomendaciones personalizadas...', 'info');
    setTimeout(() => {
        showTeacherNotification('Lista de recomendaciones creada para 3 clases', 'success');
    }, 1500);
}

function manageCategories() {
    showTeacherNotification('Abriendo gestor de categorías...', 'info');
    // Simulación de categorías
    const categories = ['Literatura', 'Ciencias', 'Historia', 'Matemáticas', 'Arte'];
    console.log('Categorías disponibles:', categories);
}

function showUsageStats() {
    showTeacherNotification('Cargando estadísticas de uso...', 'info');
    const stats = {
        mostReadBook: 'Don Quijote de la Mancha',
        averageReadingTime: '45 minutos/día',
        topCategory: 'Literatura',
        engagement: '78%'
    };
    setTimeout(() => {
        console.log('Estadísticas:', stats);
        showTeacherNotification('Estadísticas actualizadas', 'success');
    }, 1000);
}

function uploadBook() {
    showTeacherNotification('Abriendo formulario de carga de libros...', 'info');
    // Aquí iría la lógica para abrir un modal o formulario
}

function uploadSupplementaryMaterial() {
    showTeacherNotification('Subiendo material complementario...', 'info');
}

function uploadMultimedia() {
    showTeacherNotification('Abriendo cargador de contenido multimedia...', 'info');
}

function createReadingList() {
    showTeacherNotification('Creando nueva lista de lectura...', 'info');
    setTimeout(() => {
        showTeacherNotification('Lista de lectura creada exitosamente', 'success');
    }, 1200);
}

function displayStudentsList() {
    showTeacherNotification('Cargando lista de estudiantes...', 'info');
    studentsData = [
        { name: 'Ana García', progress: 85, booksRead: 12 },
        { name: 'Carlos López', progress: 72, booksRead: 8 },
        { name: 'María Rodriguez', progress: 91, booksRead: 15 }
    ];
    console.log('Estudiantes:', studentsData);
}

function showReadingProgress() {
    showTeacherNotification('Analizando progreso de lectura...', 'info');
    setTimeout(() => {
        const progress = {
            classAverage: 78,
            topPerformer: 'María Rodriguez',
            needsAttention: 2
        };
        console.log('Progreso general:', progress);
        showTeacherNotification('Análisis de progreso completado', 'success');
    }, 1500);
}

function assignReadings() {
    showTeacherNotification('Asignando lecturas a estudiantes...', 'info');
    setTimeout(() => {
        showTeacherNotification('Lecturas asignadas a 25 estudiantes', 'success');
    }, 1000);
}

function showEvaluations() {
    showTeacherNotification('Cargando evaluaciones pendientes...', 'info');
    const evaluations = {
        pending: 8,
        completed: 15,
        averageScore: 8.2
    };
    console.log('Evaluaciones:', evaluations);
}

function moderateComments() {
    showTeacherNotification('Abriendo panel de moderación...', 'info');
    const pendingComments = Math.floor(Math.random() * 10) + 1;
    setTimeout(() => {
        showTeacherNotification(`${pendingComments} comentarios pendientes de moderación`, 'info');
    }, 800);
}

function manageForums() {
    showTeacherNotification('Gestionando foros de discusión...', 'info');
}

function provideFeedback() {
    showTeacherNotification('Proporcionando retroalimentación...', 'info');
}

function highlightContent() {
    showTeacherNotification('Destacando contenido relevante...', 'success');
}

// Función para mostrar notificaciones de docente
function showTeacherNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'rgba(76, 175, 80, 0.9)' :
        type === 'warning' ? 'rgba(255, 193, 7, 0.9)' :
            'rgba(255, 107, 107, 0.9)';

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Función para generar datos simulados
function generateMockData() {
    // Datos de estudiantes
    studentsData = [
        { id: 1, name: 'Ana García', email: 'ana@email.com', progress: 85, booksRead: 12, lastActive: '2024-01-15' },
        { id: 2, name: 'Carlos López', email: 'carlos@email.com', progress: 72, booksRead: 8, lastActive: '2024-01-14' },
        { id: 3, name: 'María Rodriguez', email: 'maria@email.com', progress: 91, booksRead: 15, lastActive: '2024-01-16' },
        { id: 4, name: 'José Martínez', email: 'jose@email.com', progress: 67, booksRead: 6, lastActive: '2024-01-13' },
        { id: 5, name: 'Laura Fernández', email: 'laura@email.com', progress: 88, booksRead: 11, lastActive: '2024-01-15' }
    ];

    // Datos de libros
    booksData = [
        { id: 1, title: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes', category: 'Literatura', reads: 45 },
        { id: 2, title: 'Cien años de soledad', author: 'Gabriel García Márquez', category: 'Literatura', reads: 38 },
        { id: 3, title: 'El principito', author: 'Antoine de Saint-Exupéry', category: 'Filosofía', reads: 52 },
        { id: 4, title: 'Historia del tiempo', author: 'Stephen Hawking', category: 'Ciencias', reads: 29 },
        { id: 5, title: 'El arte de la guerra', author: 'Sun Tzu', category: 'Estrategia', reads: 33 }
    ];
}

// Función para dashboard analytics
function updateDashboardAnalytics() {
    const analytics = {
        totalBooks: booksData.length,
        totalStudents: studentsData.length,
        averageProgress: studentsData.reduce((sum, student) => sum + student.progress, 0) / studentsData.length,
        mostPopularBook: booksData.reduce((prev, current) => (prev.reads > current.reads) ? prev : current),
        weeklyActiveUsers: Math.floor(Math.random() * studentsData.length) + 1
    };

    console.log('Analytics del Dashboard:', analytics);
    return analytics;
}

// Inicializar la aplicación de docente
document.addEventListener('DOMContentLoaded', () => {
    // Crear elementos visuales
    createParticles();
    createMouseFollower();

    // Generar datos simulados
    generateMockData();

    // Añadir interacciones a las tarjetas
    setTimeout(() => {
        addCardInteractions();
    }, 500);

    // Mostrar notificación de bienvenida
    setTimeout(() => {
        showTeacherNotification('¡Bienvenido! Panel de gestión educativa cargado correctamente.', 'success');
    }, 2000);

    // Actualizar analytics del dashboard
    setTimeout(() => {
        updateDashboardAnalytics();
    }, 3000);

    // Efecto de carga completada
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 1000);
});

// Estilo para animaciones específicas de docente
const teacherStyles = document.createElement('style');
teacherStyles.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(3);
        }
    }
    
    .loaded .dashboard-card {
        animation: slideInUp 0.7s ease-out forwards;
    }
    
    .dashboard-card:nth-child(1) { animation-delay: 0.1s; }
    .dashboard-card:nth-child(2) { animation-delay: 0.2s; }
    .dashboard-card:nth-child(3) { animation-delay: 0.3s; }
    .dashboard-card:nth-child(4) { animation-delay: 0.4s; }
    .dashboard-card:nth-child(5) { animation-delay: 0.5s; }
    .dashboard-card:nth-child(6) { animation-delay: 0.6s; }
    
    .teacher-mode .dashboard-card:hover {
        box-shadow: 0 25px 50px rgba(255, 107, 107, 0.3);
    }
`;
document.head.appendChild(teacherStyles);

// Añadir clase específica del docente al body
document.body.classList.add('teacher-mode');

// Atajos de teclado para docente
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
                showAddBooks();
                break;
            case '5':
                e.preventDefault();
                showStudents();
                break;
            case '6':
                e.preventDefault();
                showComments();
                break;
            case 'r':
                e.preventDefault();
                generateReport();
                break;
        }
    }
});

// Función para exportar datos
function exportData(type) {
    switch (type) {
        case 'students':
            console.log('Exportando datos de estudiantes:', studentsData);
            showTeacherNotification('Datos de estudiantes exportados', 'success');
            break;
        case 'books':
            console.log('Exportando datos de libros:', booksData);
            showTeacherNotification('Datos de libros exportados', 'success');
            break;
        case 'analytics':
            const analytics = updateDashboardAnalytics();
            console.log('Exportando analytics:', analytics);
            showTeacherNotification('Analytics exportados', 'success');
            break;
    }
}

// Función para búsqueda avanzada de docente
function advancedSearch(criteria) {
    showTeacherNotification(`Búsqueda avanzada: ${criteria}`, 'info');
    // Implementación futura de búsqueda avanzada
}

// Auto-guardado de preferencias
setInterval(() => {
    const preferences = {
        currentSection,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('teacherPreferences', JSON.stringify(preferences));
}, 30000); // Cada 30 segund

// Función para mostrar el popover del docente
function showTeacherPopover() {
    document.getElementById('teacherPopover').classList.add('active');
}

// Función para cerrar el popover
function closePopover() {
    document.getElementById('teacherPopover').classList.remove('active');
}

// Cerrar con click fuera del popover
document.getElementById('teacherPopover').addEventListener('click', function (e) {
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

