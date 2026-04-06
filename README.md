# Project Exam - Task List (Express + Supabase + Vanilla JS)

## Descripcion
Aplicacion web de gestion de tareas con frontend vanilla y backend Node.js/Express. La persistencia se realiza en Supabase (PostgreSQL), con arquitectura por capas y pruebas automatizadas en la capa de servicio.

## Arquitectura utilizada y justificacion
Se uso **arquitectura por capas**:

- **Capa de presentacion**: interfaz web (HTML/CSS/JS) y endpoints HTTP.
- **Capa de negocio**: reglas de validacion y comportamiento de tareas.
- **Capa de datos**: repositorio que encapsula operaciones a Supabase.

Esta separacion mejora mantenibilidad, testabilidad y escalabilidad frente a una solucion acoplada.

## Modulos identificados
- **backend/src/config**: inicializacion de cliente Supabase.
- **backend/src/models**: entidad Task y mapeo entre dominio/base de datos.
- **backend/src/repositories**: operaciones CRUD.
- **backend/src/services**: reglas de negocio (titulo obligatorio, estados permitidos).
- **backend/src/controllers y routes**: API REST para /api/tasks.
- **frontend/src/components**: render de tarjetas de tareas.
- **frontend/src/services**: cliente API con fetch.
- **database/**: scripts de schema y seed para Supabase.

## Mejoras arquitectonicas propuestas
1. Incorporar middleware centralizado de manejo de errores con codigos de negocio.
2. Agregar autenticacion y RLS en Supabase para multiusuario seguro.
3. Separar DTOs/schemas (por ejemplo con Zod) para validar entradas en borde.
4. Integrar pruebas de integracion para controllers + repositorio con entorno aislado.

## Estructura del proyecto

project-exam/
- backend/
- frontend/
- database/
- docs/
- .env
- .gitignore
- README.md

## Instalacion y ejecucion

### 1) Configurar variables de entorno
Editar el archivo **.env** en la raiz del proyecto:

- `PORT=3000`
- `SUPABASE_URL=...`
- `SUPABASE_KEY=...`

### 2) Crear tabla y datos iniciales en Supabase
Ejecutar en SQL Editor de Supabase:

1. `database/schema.sql`
2. `database/seed.sql`

### 3) Instalar dependencias del backend
```bash
cd backend
npm install
```

### 4) Levantar servidor
```bash
npm run start
```

Servidor disponible en `http://localhost:3000`

### 5) Abrir frontend
La app se sirve desde Express en la raiz del servidor. Abre:

`http://localhost:3000`

## Correr pruebas
Desde `backend/`:

```bash
npm test
```

Las pruebas estan en `backend/tests/task.test.js` y validan reglas clave del servicio.

## Endpoints principales
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Ejemplo de payload
```json
{
  "title": "Nueva tarea",
  "description": "Descripcion corta",
  "status": "pending"
}
```
