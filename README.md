# 🔐 APP gestión de tareas (Angular)

Una aplicación desarrollada con **Angular 17**, **Angular Material** y **arquitectura hexagonal**, implementando las mejores prácticas de desarrollo frontend.

## 🎯 Características Principales

- ✅ **Arquitectura Hexagonal** - Separación clara de responsabilidades
- ✅ **Angular 17 Standalone** - Sin NgModules tradicionales
- ✅ **Angular Material** - UI moderna y responsive
- ✅ **Reactive Forms** - Validación robusta del lado cliente
- ✅ **Signals** - Gestión de estado reactiva moderna
- ✅ **TypeScript** - Tipado fuerte y desarrollo seguro
- ✅ **SCSS** - Estilos modulares y reutilizables

## 🏗️ Arquitectura Hexagonal

Este proyecto implementa la arquitectura hexagonal para mantener una separación clara entre la lógica de dominio y los detalles de implementación.

```
src/
├── app/
│   ├── core/                           # Núcleo de la aplicación
│   │   ├── auth/                       # Módulo de autenticación
│   │   │   ├── auth.guards.ts          # Guards de autenticación
│   │   │   └── auth.service.ts         # Servicio de autenticación
│   │   ├── config/                     # Configuraciones globales
│   │   │   └── route.ts                # Configuración de rutas
│   │   └── infrastructure/             # Capa de infraestructura
│   │       ├── implementations/        # Implementaciones concretas
│   │       │   ├── auth-impl.service.ts    # Implementación auth
│   │       │   └── task-impl.service.ts    # Implementación tareas
│   │       ├── interfaces/             # Contratos/Puertos
│   │       │   ├── Auth                # Interfaces de autenticación
│   │       │   ├── BaseResponse        # Respuesta base
│   │       │   └── Task                # Interfaces de tareas
│   │       ├── repositories/           # Repositorios (Puertos)
│   │       │   ├── auth.repository.ts      # Repositorio auth
│   │       │   └── task.repository.ts      # Repositorio tareas
│   │       ├── usecase/                # Casos de uso (Dominio)
│   │       │   ├── auth.usecase.ts         # Casos de uso auth
│   │       │   └── task.usecase.ts         # Casos de uso tareas
│   │       └── interceptors/           # Interceptores HTTP
│   │           └── auth.interceptor.ts     # Interceptor auth
│   ├── modules/                        # Módulos de funcionalidades
│   │   ├── auth/                       # Módulo de autenticación
│   │   │   ├── signin/                 # Componente inicio sesión
│   │   │   └── signup/                 # Componente registro
│   │   └── task/                       # Módulo de tareas
│   │       ├── modals/                 # Modales de tareas
│   │       └── task-page/              # Página principal tareas
│   ├── shared/                         # Componentes compartidos
│   │   ├── components/                 # Componentes reutilizables
│   │   │   ├── confirmation-dialog/    # Diálogo confirmación
│   │   │   └── empty-data/             # Componente datos vacíos
│   │   └── services/                   # Servicios compartidos
│   │       └── local-storage.service.ts    # Servicio almacenamiento
│   ├── app.component.html              # Template principal
│   └── app.component.scss              # Estilos principales
├── assets/                            # 📁 Recursos estáticos
├── environments/                      # 🌍 Configuraciones de entorno
└── styles.scss                        # 🎨 Estilos globales
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **Angular CLI** >= 17.0.0

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/diegortorres10/todo-app-frontend.git
cd todo-app-frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run start
```

La aplicación estará disponible en `http://localhost:4200`

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm start                # Servidor de desarrollo
npm run dev              # Alias para start

# Build
npm run build            # Build de producción
npm run build:dev        # Build de desarrollo
npm run watch            # Build con watch mode
```
