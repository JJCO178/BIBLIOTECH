// Crear partículas flotantes
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = window.innerWidth < 768 ? 10 : 20;
    
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
    if (window.innerWidth < 768) return; // Desactivar en móviles
    
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

// Toggle para mostrar/ocultar contraseña
function togglePassword(button) {
    const input = button.previousElementSibling;
    if (input.type === 'password') {
        input.type = 'text';
        button.textContent = '🙈';
    } else {
        input.type = 'password';
        button.textContent = '👁️';
    }
}

// Toggle para checkbox personalizado
function toggleCheckbox(checkbox) {
    checkbox.classList.toggle('checked');
}

// Manejar envío del formulario - CORREGIDO PARA DJANGO
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            const button = this.querySelector('.login-btn');
            const emailInput = this.querySelector('input[name="email"]');
            const passwordInput = this.querySelector('input[name="password"]');
            
            // Validación básica antes de enviar a Django
            if (!emailInput || !passwordInput) {
                console.error('No se encontraron los campos email o password');
                return;
            }
            
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            
            if (!email || !password) {
                e.preventDefault(); // Solo prevenir si hay error de validación
                showError('Por favor completa todos los campos');
                return;
            }
            
            // Si todo está bien, mostrar animación de carga pero NO prevenir el envío
            button.classList.add('loading');
            button.innerHTML = '<span class="btn-glow"></span>Iniciando sesión...';
            
            // Permitir que Django maneje el envío del formulario
            // NO usar e.preventDefault() aquí
        });
    }
});

// Función para mostrar errores - SIMPLIFICADA
function showError(message) {
    const card = document.querySelector('.login-card');
    if (card) {
        card.classList.add('shake');
        setTimeout(() => {
            card.classList.remove('shake');
        }, 600);
    }
    
    // Crear notificación de error
    const notification = createNotification(message, 'error');
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Función para mostrar éxito
function showSuccess(message) {
    const notification = createNotification(message, 'success');
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Crear notificaciones
function createNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'error' ? 'rgba(255, 107, 107, 0.9)' : 'rgba(0, 212, 255, 0.9)'};
        color: white;
        border-radius: 10px;
        backdrop-filter: blur(10px);
        z-index: 2000;
        animation: slideInUp 0.3s ease-out;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    notification.textContent = message;
    return notification;
}

// Login social
function socialLogin(provider) {
    const button = event.target.closest('.social-btn');
    const originalText = button.innerHTML;
    
    button.style.opacity = '0.7';
    button.innerHTML = '<span>⏳</span> Conectando...';
    
    setTimeout(() => {
        alert(`Iniciando sesión con ${provider}...`);
        button.style.opacity = '1';
        button.innerHTML = originalText;
    }, 1500);
}

// Efectos de focus en inputs
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    createMouseFollower();
    
    // Animación del logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            this.style.transform = 'scale(1.2) rotate(720deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 600);
        });
    }
    
    // Animación de entrada completada
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 1000);
});

// Manejar redimensionamiento
window.addEventListener('resize', () => {
    // Recrear partículas si es necesario
    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
        const currentParticles = particlesContainer.children.length;
        const expectedParticles = window.innerWidth < 768 ? 10 : 20;
        
        if (currentParticles !== expectedParticles) {
            particlesContainer.innerHTML = '';
            createParticles();
        }
    }
});