# Módulo de Login con Validaciones

Proyecto para desarrollar un módulo de login con validaciones y seguridad.

## Funcionalidades Implementadas

### ✅ Gestión de Errores y Mensajes de Validación

El módulo incluye un sistema completo de gestión de errores y mensajes de validación con las siguientes características:

#### Mensajes de Error Implementados:
- **Campos vacíos**: "Por favor, complete todos los campos obligatorios"
- **Correo electrónico requerido**: "El campo de correo electrónico es obligatorio"  
- **Contraseña requerida**: "El campo de contraseña es obligatorio"
- **Email inválido**: "Por favor, ingrese un correo electrónico válido"
- **Contraseña corta**: "La contraseña debe tener al menos 6 caracteres"
- **Credenciales incorrectas**: "Usuario o contraseña incorrectos. Por favor, verifique sus credenciales."

#### Características del Sistema de Validación:
- ✅ Validación en tiempo real mientras el usuario escribe
- ✅ Limpieza automática de errores cuando el usuario corrige los campos
- ✅ Mensajes de error específicos por campo
- ✅ Mensaje de error general para casos múltiples
- ✅ Mensajes de éxito para login correcto
- ✅ Deshabilitación del formulario durante el proceso de autenticación
- ✅ Animaciones suaves para mostrar/ocultar mensajes
- ✅ Auto-ocultamiento de mensajes después de 5 segundos

## Estructura del Proyecto

```
modulo_login/
├── index.html          # Interfaz de usuario del login
├── styles.css          # Estilos y diseño responsive
├── script.js           # Lógica de validación y manejo de errores
└── README.md           # Documentación del proyecto
```

## Uso

1. Abra `index.html` en un navegador web
2. Pruebe diferentes escenarios de error:
   - Enviar formulario vacío
   - Usar email inválido
   - Usar contraseña muy corta
   - Usar credenciales incorrectas

## Usuarios de Prueba

Para probar el funcionamiento completo, use estas credenciales:
- **Usuario 1**: `usuario@ejemplo.com` / `123456`
- **Usuario 2**: `admin@test.com` / `admin123`

## Tecnologías Utilizadas

- HTML5
- CSS3 (con animaciones y diseño responsive)
- JavaScript ES6+ (Programación orientada a objetos)
- Validación client-side
- Simulación de autenticación

## Capturas de Pantalla

El sistema muestra diferentes tipos de mensajes según el escenario:

### Formulario Inicial
![Formulario inicial](https://github.com/user-attachments/assets/50240067-a8d2-4347-91d8-50516b6679a1)

### Validación de Campos Vacíos
![Campos vacíos](https://github.com/user-attachments/assets/ea93c556-3575-4104-acac-8bb18bdb4f4d)

### Credenciales Incorrectas
![Credenciales incorrectas](https://github.com/user-attachments/assets/f78b0e6d-a6ab-4828-a36b-09b6b75639ee)

### Login Exitoso
![Login exitoso](https://github.com/user-attachments/assets/88142acc-7429-4332-88a6-3329cea64fd8)

## Estado del Proyecto

- ✅ **Tarea 5**: Gestión de errores y mensajes de validación - COMPLETADA
- ⚪ **Dependencias**: 
  - Tarea 2 (Maquetación): Implementación básica incluida
  - Tarea 4 (Lógica de validación): Implementación básica incluida
