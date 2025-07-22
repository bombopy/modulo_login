// Módulo de gestión de errores y validación
class LoginValidator {
    constructor() {
        this.form = document.getElementById('login-form');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        
        // Elementos para mostrar mensajes
        this.errorMessage = document.getElementById('error-message');
        this.errorText = document.getElementById('error-text');
        this.successMessage = document.getElementById('success-message');
        this.successText = document.getElementById('success-text');
        
        // Elementos para errores de campos específicos
        this.emailError = document.getElementById('email-error');
        this.passwordError = document.getElementById('password-error');
        
        // Usuarios demo para simular autenticación
        this.demoUsers = [
            { email: 'usuario@ejemplo.com', password: '123456' },
            { email: 'admin@test.com', password: 'admin123' }
        ];
        
        this.initializeEvents();
    }
    
    initializeEvents() {
        // Evento de envío del formulario
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validateAndSubmit();
        });
        
        // Eventos para limpiar errores cuando el usuario empieza a escribir
        this.emailInput.addEventListener('input', () => {
            this.clearFieldError('email');
        });
        
        this.passwordInput.addEventListener('input', () => {
            this.clearFieldError('password');
        });
        
        // Validación en tiempo real (opcional, para mejor UX)
        this.emailInput.addEventListener('blur', () => {
            if (this.emailInput.value) {
                this.validateEmail(false);
            }
        });
    }
    
    validateAndSubmit() {
        // Limpiar mensajes anteriores
        this.clearAllMessages();
        
        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value.trim();
        
        let isValid = true;
        
        // Validar campos vacíos
        if (!email) {
            this.showFieldError('email', 'El campo de correo electrónico es obligatorio');
            isValid = false;
        } else if (!this.validateEmail()) {
            isValid = false;
        }
        
        if (!password) {
            this.showFieldError('password', 'El campo de contraseña es obligatorio');
            isValid = false;
        } else if (!this.validatePassword()) {
            isValid = false;
        }
        
        // Si hay campos vacíos, mostrar mensaje general
        if (!email && !password) {
            this.showGeneralError('Por favor, complete todos los campos obligatorios');
            return;
        }
        
        // Si hay errores de validación, no continuar
        if (!isValid) {
            return;
        }
        
        // Simular autenticación
        this.authenticateUser(email, password);
    }
    
    validateEmail(showError = true) {
        const email = this.emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            if (showError) {
                this.showFieldError('email', 'Por favor, ingrese un correo electrónico válido');
            }
            return false;
        }
        
        return true;
    }
    
    validatePassword(showError = true) {
        const password = this.passwordInput.value.trim();
        
        if (password.length < 6) {
            if (showError) {
                this.showFieldError('password', 'La contraseña debe tener al menos 6 caracteres');
            }
            return false;
        }
        
        return true;
    }
    
    authenticateUser(email, password) {
        // Simular tiempo de respuesta del servidor
        this.disableForm();
        
        setTimeout(() => {
            const user = this.demoUsers.find(u => u.email === email && u.password === password);
            
            if (user) {
                this.showSuccess('¡Inicio de sesión exitoso! Redirigiendo...');
                // Simular redirección
                setTimeout(() => {
                    alert('¡Bienvenido! En una aplicación real, serías redirigido al dashboard.');
                    this.enableForm();
                }, 2000);
            } else {
                this.showGeneralError('Usuario o contraseña incorrectos. Por favor, verifique sus credenciales.');
                this.enableForm();
            }
        }, 1000);
    }
    
    showFieldError(field, message) {
        const errorElement = document.getElementById(`${field}-error`);
        const inputElement = document.getElementById(field);
        
        errorElement.textContent = message;
        inputElement.classList.add('error');
    }
    
    clearFieldError(field) {
        const errorElement = document.getElementById(`${field}-error`);
        const inputElement = document.getElementById(field);
        
        errorElement.textContent = '';
        inputElement.classList.remove('error');
    }
    
    showGeneralError(message) {
        this.errorText.textContent = message;
        this.errorMessage.style.display = 'flex';
        this.successMessage.style.display = 'none';
        
        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            this.hideGeneralError();
        }, 5000);
    }
    
    showSuccess(message) {
        this.successText.textContent = message;
        this.successMessage.style.display = 'flex';
        this.errorMessage.style.display = 'none';
    }
    
    hideGeneralError() {
        this.errorMessage.style.display = 'none';
    }
    
    clearAllMessages() {
        // Limpiar mensajes generales
        this.errorMessage.style.display = 'none';
        this.successMessage.style.display = 'none';
        
        // Limpiar errores de campos
        this.clearFieldError('email');
        this.clearFieldError('password');
    }
    
    disableForm() {
        const submitBtn = this.form.querySelector('.login-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Verificando...';
        this.emailInput.disabled = true;
        this.passwordInput.disabled = true;
    }
    
    enableForm() {
        const submitBtn = this.form.querySelector('.login-btn');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Iniciar Sesión';
        this.emailInput.disabled = false;
        this.passwordInput.disabled = false;
    }
}

// Función para mostrar información de usuarios demo
function showDemoInfo() {
    const demoInfo = `
Usuarios de demostración:
• usuario@ejemplo.com / 123456
• admin@test.com / admin123

Pruebe diferentes escenarios:
- Campos vacíos
- Email inválido
- Contraseña muy corta
- Credenciales incorrectas
    `;
    
    console.log(demoInfo);
}

// Inicializar el validador cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    const validator = new LoginValidator();
    showDemoInfo();
    
    // Agregar información visual de usuarios demo
    const footer = document.querySelector('.login-footer');
    const demoInfo = document.createElement('div');
    demoInfo.innerHTML = `
        <div style="margin-top: 20px; padding: 15px; background: #f7fafc; border-radius: 5px; border-left: 4px solid #667eea;">
            <h4 style="margin: 0 0 10px 0; color: #4a5568; font-size: 14px;">Usuarios de prueba:</h4>
            <p style="margin: 5px 0; font-size: 13px; color: #718096;">📧 usuario@ejemplo.com / 🔒 123456</p>
            <p style="margin: 5px 0; font-size: 13px; color: #718096;">📧 admin@test.com / 🔒 admin123</p>
        </div>
    `;
    footer.appendChild(demoInfo);
});