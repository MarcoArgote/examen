# Arquitectura del Proyecto

## Estilo arquitectonico
Se aplica arquitectura por capas para separar responsabilidades y facilitar mantenimiento:

1. **Presentacion**: frontend vanilla (HTML/CSS/JS) y capa HTTP (controllers/routes).
2. **Negocio**: servicios con reglas y validaciones.
3. **Datos**: repositorio y configuracion de Supabase.

## Flujo de una peticion
Frontend -> Routes -> Controller -> Service -> Repository -> Supabase

## Beneficios
- Bajo acoplamiento entre UI, reglas de negocio y persistencia.
- Mayor testabilidad (servicio probado aislando la base de datos).
- Escalabilidad para agregar autenticacion, paginacion o nuevas entidades.

## Modulos
- **tasks**: CRUD de tareas y cambios de estado.
- **api-client**: consumo HTTP desde frontend.
- **database scripts**: schema y seed para entorno inicial.
