// Variables globales
        let currentUserType = 'estudiante';
        let currentSection = 'home';

        // Funciones de navegación
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

        function showAddBooks() {
            hideAllSections();
            document.getElementById('addBooksSection').classList.remove('hidden');
            setActiveNavButton('Agregar Libros');
            currentSection = 'addBooks';
        }

        function showComments() {
            hideAllSections();
            document.getElementById('commentsSection').classList.remove('hidden');
            setActiveNavButton('Comentarios');
            currentSection = 'comments';
        }

        function hideAllSections() {
            const sections = ['homeSection', 'profileSection', 'booksSection', 'addBooksSection', 'commentsSection'];
            sections.forEach(section => {
                document.getElementById(section).classList.add('hidden');
            });
        }

        function setActiveNavButton(activeText) {
            const navButtons = document.querySelectorAll('.nav-btn');
            navButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.textContent === activeText) {
                    btn.classList.add('active');
                }
            });
        }

        function logout() {
            alert('Cerrando sesión...');
            // Aquí puedes agregar la lógica de logout real
        }

        // Función para cambiar el rol del usuario
        function changeRole(role) {
            currentUserType = role;
            const userTypeDisplay = document.getElementById('userTypeDisplay');
            const addBooksBtn = document.getElementById('addBooksBtn');
            const welcomeMessage = document.getElementById('welcomeMessage');

            if (role === 'docente') {
                userTypeDisplay.textContent = 'Docente';
                addBooksBtn.classList.remove('hidden');
                welcomeMessage.textContent = 'Hola Docente, gestiona tu biblioteca y recursos educativos';
            } else {
                userTypeDisplay.textContent = 'Estudiante';
                addBooksBtn.classList.add('hidden');
                welcomeMessage.textContent = 'Hola Estudiante, explora tu biblioteca digital personalizada';
            }

            // Regenerar las tarjetas del dashboard
            generateDashboardCards();
        }

        // Función para generar las tarjetas del dashboard según el rol
        function generateDashboardCards() {
            const dashboardGrid = document.getElementById('dashboardGrid');
            
            const studentCards = [
                { icon: '📖', title: 'Mis Lecturas', description: 'Continúa leyendo tus libros favoritos y descubre tu progreso de lectura.' },
                { icon: '🔍', title: 'Explorar Libros', description: 'Descubre nuevos títulos y géneros que se adapten a tus intereses.' },
                { icon: '⭐', title: 'Mis Reseñas', description: 'Comparte tus opiniones sobre los libros que has leído.' },
                { icon: '📊', title: 'Estadísticas', description: 'Revisa tu progreso de lectura y logros obtenidos.' }
            ];

            const teacherCards = [
                { icon: '📚', title: 'Gestionar Biblioteca', description: 'Administra la colección de libros y recursos educativos.' },
                { icon: '➕', title: 'Agregar Contenido', description: 'Sube nuevos libros y materiales para tus estudiantes.' },
                { icon: '👥', title: 'Mis Estudiantes', description: 'Monitorea el progreso de lectura de tus estudiantes.' },
                { icon: '📈', title: 'Reportes', description: 'Genera reportes detallados sobre el uso de la biblioteca.' },
                { icon: '💬', title: 'Foro Educativo', description: 'Modera discusiones y fomenta el debate académico.' },
                { icon: '🎯', title: 'Recomendaciones', description: 'Crea listas de lectura personalizadas para tus clases.' }
            ];

            const cards = currentUserType === 'docente' ? teacherCards : studentCards;
            
            dashboardGrid.innerHTML = cards.map((card, index) => `
                <div class="dashboard-card" style="animation-delay: ${index * 0.1}s">
                    <div class="card-icon">${card.icon}</div>
                    <h3 class="card-title">${card.title}</h3>
                    <p class="card-description">${card.description}</p>
                </div>
            `).join('');
        }

        // Crear partículas flotantes
        function createParticles() {
            const particlesContainer = document.querySelector('.particles');
            const particleCount = 20;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                const size = Math.random() * 6 + 2;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
                particle.style.animationDelay = Math.random() * 2 + 's';
                
                particlesContainer.appendChild(particle);
            }
        }

        // Efecto de seguimiento del mouse
        function createMouseFollower() {
            document.addEventListener('mousemove', (e) => {
                const cursor = document.createElement('div');
                cursor.style.position = 'fixed';
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                cursor.style.width = '4px';
                cursor.style.height = '4px';
                cursor.style.background = 'rgba(0, 212, 255, 0.6)';
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

        // Inicializar la aplicación
        document.addEventListener('DOMContentLoaded', () => {
            createParticles();
            createMouseFollower();
            generateDashboardCards();
            
            // Efecto de carga completada
            setTimeout(() => {
                document.body.classList.add('loaded');
            }, 1000);
        });

        // Estilo para fadeOut
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeOut {
                to {
                    opacity: 0;
                    transform: scale(3);
                }
            }
        `;
        document.head.appendChild(style);