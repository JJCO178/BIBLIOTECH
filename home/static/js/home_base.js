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
            const cards = document.querySelectorAll('.feature-card');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }
                });
            });
            
            cards.forEach(card => {
                observer.observe(card);
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
            
            // Agregar CSS para la animación de fadeOut
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
        }

        // Funciones para los botones
        function handleLogin() {
            // Esta función se puede conectar con Django
            alert('Redirigiendo al login...');
            // window.location.href = '/login/';
        }

        function handleExplore() {
            // Esta función se puede conectar con la página de exploración
            alert('Explorando la biblioteca...');
            // window.location.href = '/explore/';
        }

        // Animación de escritura para el subtítulo
        function typeWriterEffect() {
            const subtitle = document.querySelector('.hero-subtitle');
            const fullText = subtitle.textContent;
            
            subtitle.textContent = '';
            
            let i = 0;
            const timer = setInterval(() => {
                if (i < fullText.length) {
                    subtitle.textContent += fullText.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                    // Quitar el cursor después de terminar
                    setTimeout(() => {
                        subtitle.style.setProperty('--cursor', 'none');
                        subtitle.classList.add('typing-finished');
                    }, 500);
                }
            }, 100);
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

        // Inicializar todas las animaciones
        document.addEventListener('DOMContentLoaded', () => {
            createParticles();
            animateOnScroll();
            createMouseFollower();
            parallaxEffect();
            
            // Pequeño retraso para el efecto de escritura
            setTimeout(typeWriterEffect, 1000);
        });

        // Animación adicional para el logo
        document.querySelector('.logo').addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.transition = 'all 0.3s ease';
        });

        document.querySelector('.logo').addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });