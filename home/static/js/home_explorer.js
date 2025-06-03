// Crear partículas flotantes
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Tamaño aleatorio
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Posición aleatoria
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Duración de animación aleatoria
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Animación de las tarjetas al hacer scroll
function animateOnScroll() {
    const benefitItems = document.querySelectorAll('.benefit-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    benefitItems.forEach(item => {
        observer.observe(item);
    });
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

// Efecto parallax para las formas geométricas
function parallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.geo-shape');
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            shape.style.transform = `rotate(${scrolled * speed}deg)`;
        });
    });
}

// Animación de entrada para los elementos de beneficios
function animateBenefitsOnLoad() {
    const benefitItems = document.querySelectorAll('.benefit-item');
    
    benefitItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Efecto de conteo animado para números (si los hay)
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// Función para manejar el login
function handleLogin() {
    // Animación de carga del botón
    const loginBtn = document.querySelector('.login-cta-btn');
    const originalText = loginBtn.innerHTML;
    
    loginBtn.innerHTML = '<span>Cargando...</span>';
    loginBtn.style.opacity = '0.7';
    loginBtn.style.pointerEvents = 'none';
    
    // Simular proceso de login
    setTimeout(() => {
        alert('Redirigiendo al login...');
        // Aquí puedes agregar la redirección real
        // window.location.href = '/login/';
        
        // Restaurar botón
        loginBtn.innerHTML = originalText;
        loginBtn.style.opacity = '1';
        loginBtn.style.pointerEvents = 'auto';
    }, 1500);
}

// Función para volver al inicio
function goBackHome() {
    // Animación de salida
    const mainContent = document.querySelector('.main-content');
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(-30px)';
    
    setTimeout(() => {
        // Aquí puedes redirigir a la página principal
        // window.location.href = '/';
        alert('Regresando al inicio...');
        
        // Si no hay redirección, restaurar la vista
        mainContent.style.opacity = '1';
        mainContent.style.transform = 'translateY(0)';
    }, 500);
}

// Efecto de hover mejorado para las tarjetas de beneficios
function enhanceBenefitCards() {
    const benefitItems = document.querySelectorAll('.benefit-item');
    
    benefitItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Pausar la animación de bounce del icono
            const icon = this.querySelector('.benefit-icon');
            icon.style.animationPlayState = 'paused';
            
            // Efecto de escala en el icono
            icon.style.transform = 'scale(1.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            // Reanudar la animación de bounce del icono
            const icon = this.querySelector('.benefit-icon');
            icon.style.animationPlayState = 'running';
            
            // Restaurar escala del icono
            icon.style.transform = 'scale(1)';
        });
    });
}

// Efecto de smooth scroll para enlaces internos
function smoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Detectar si el usuario está usando un dispositivo móvil
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Ajustar efectos para dispositivos móviles
function optimizeForMobile() {
    if (isMobileDevice()) {
        // Reducir partículas en móviles para mejor rendimiento
        const particleCount = 10;
        const particlesContainer = document.querySelector('.particles');
        
        // Limpiar partículas existentes
        particlesContainer.innerHTML = '';
        
        // Crear menos partículas
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
            particle.style.animationDelay = Math.random() * 3 + 's';
            
            particlesContainer.appendChild(particle);
        }
        
        // Desactivar efecto de mouse follower en móviles
        return false;
    }
    return true;
}

// Inicializar todas las funciones cuando se carga el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Verificar si es móvil y optimizar
    const enableMouseEffects = optimizeForMobile();
    
    // Crear partículas
    createParticles();
    
    // Inicializar animaciones
    animateOnScroll();
    animateBenefitsOnLoad();
    enhanceBenefitCards();
    smoothScrolling();
    
    // Efecto parallax
    parallaxEffect();
    
    // Efecto de mouse solo en desktop
    if (enableMouseEffects) {
        createMouseFollower();
    }
    
    // Animación del logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.transition = 'all 0.3s ease';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    // Efecto de carga completada
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 1000);
});

// Manejar cambio de tamaño de ventana
window.addEventListener('resize', () => {
    // Recalcular posiciones si es necesario
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach(item => {
        item.style.transition = 'none';
        setTimeout(() => {
            item.style.transition = 'all 0.4s ease';
        }, 100);
    });
});

// Función para precargar imágenes si las hay
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        const imageLoader = new Image();
        imageLoader.onload = function() {
            img.src = this.src;
            img.classList.add('loaded');
        };
        imageLoader.src = img.dataset.src;
    });
}

// Ejecutar precarga de imágenes
preloadImages();