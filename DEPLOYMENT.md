# Proyecto Tienda - Deployment Guide

## 🚀 Despliegue en Render

Este proyecto está configurado para desplegarse automáticamente en Render usando el archivo `render.yaml`.

### Estructura del Proyecto
```
proyecto_tienda/
├── backend/          # Django REST API
├── frontend/         # React App
└── render.yaml       # Configuración de Render
```

### Pre-requisitos
1. Cuenta en [Render.com](https://render.com)
2. Repositorio en GitHub/GitLab
3. Python 3.11 y Node.js 18

### Pasos para Desplegar

#### 1. Preparar el Repositorio
```bash
git add .
git commit -m "Preparado para Render"
git push origin main
```

#### 2. Conectar a Render
1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Haz clic en "New +" → "Blueprint"
3. Conecta tu repositorio de GitHub/GitLab
4. Render detectará automáticamente el archivo `render.yaml`
5. Haz clic en "Apply"

#### 3. Configuración Automática
Render creará automáticamente:
- ✅ Base de datos PostgreSQL (`ropa-db`)
- ✅ Servicio Backend Django (`django-backend`)
- ✅ Servicio Frontend React (`react-frontend`)

### Variables de Entorno

**Backend (django-backend):**
- `DATABASE_URL` - Auto-configurado desde la base de datos
- `SECRET_KEY` - Auto-generado por Render
- `DEBUG` - False (producción)
- `PYTHON_VERSION` - 3.11

**Frontend (react-frontend):**
- `NODE_VERSION` - 18
- `REACT_APP_API_URL` - URL del backend

### Actualizar URL del Backend en Frontend

Después del despliegue, actualiza `frontend/src/api.js` con la URL real:
```javascript
const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://django-backend.onrender.com/api/"  // ← Actualiza con tu URL
      : "http://127.0.0.1:8000/api/",
});
```

### Comandos Útiles

**Desarrollo Local:**
```bash
# Backend
cd backend
python manage.py runserver

# Frontend
cd frontend
npm start
```

**Acceder a los servicios:**
- Backend API: https://django-backend.onrender.com
- Frontend: https://react-frontend.onrender.com
- Admin Django: https://django-backend.onrender.com/admin

### Crear Superusuario en Render

1. Ve al dashboard de Render
2. Selecciona el servicio `django-backend`
3. Ve a "Shell"
4. Ejecuta:
```bash
python manage.py createsuperuser
```

### Solución de Problemas

**Error de base de datos:**
- Verifica que la variable `DATABASE_URL` esté configurada
- Revisa los logs en Render Dashboard

**Error de archivos estáticos:**
- Asegúrate que WhiteNoise esté en MIDDLEWARE
- Verifica que `collectstatic` se ejecute en el build

**Error CORS:**
- Verifica que la URL del frontend esté permitida en settings.py
- O mantén `CORS_ALLOW_ALL_ORIGINS = True` para pruebas

### Recursos
- [Documentación de Render](https://render.com/docs)
- [Django Deployment Checklist](https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/)
