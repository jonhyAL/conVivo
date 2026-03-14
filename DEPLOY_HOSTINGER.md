# Guía de Despliegue en Hostinger (Optimizado)

Para asegurar el máximo rendimiento de tu aplicación Laravel + React en Hostinger, sigue estos pasos critecos.

## 1. Preparación Local (Antes de subir)

### Optimización de Assets (Vite)
Hemos configurado `vite.config.js` para dividir el código en chunks eficientes. Ejecuta:

```bash
npm run build
```

Esto generará los archivos en `public/build`.
*Asegúrate de subir la carpeta `public/build` completa al servidor.*

## 2. Configuración en el Servidor (Panel de Hostinger / SSH)

Si tienes acceso SSH, ejecuta estos comandos en la raíz de tu proyecto (`public_html` o similar):

```bash
# 1. Instalar dependencias de PHP (sin dev para ahorrar espacio y memoria)
composer install --optimize-autoloader --no-dev

# 2. Caché de Configuración (CRÍTICO para velocidad de arranque)
php artisan config:cache

# 3. Caché de Rutas (CRÍTICO para velocidad de routing)
php artisan route:cache

# 4. Caché de Vistas (Mejora renderizado de Blade)
php artisan view:cache

# 5. Enlace simbólico para storage (si no lo has hecho)
php artisan storage:link
```

*> Nota: Si no tienes SSH, puedes crear una ruta temporal en `routes/web.php` para ejecutar estos comandos vía navegador, ejecutarlos una vez y luego borrar la ruta.*

## 3. Configuración de PHP (En Panel Hostinger)

1.  Ve a **PHP Configuration**.
2.  Versión PHP: Usa **8.2** o superior (8.3 recomendado si es compatible).
3.  Extensiones requeridas: `bcmath`, `ctype`, `fileinfo`, `json`, `mbstring`, `openssl`, `pdo`, `tokenizer`, `xml`.
4.  **Opcional pero recomendado**: Aumenta `memory_limit` a `256M` o `512M`.

## 4. Archivo .htaccess (Optimización Web Server)

Asegúrate de que tu `.htaccess` en `public/` tenga habilitada la compresión Gzip/Brotli. Hostinger suele tenerlo por defecto, pero puedes asegurarlo añadiendo:

```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>
```

## 5. Base de Datos

*   Asegúrate de usar índices en las tablas (Laravel lo hace por defecto con las claves foráneas si usas las migraciones correctamente).
*   En el archivo `.env` de producción, asegúrate de tener `APP_DEBUG=false` y `APP_ENV=production`. **Esto es lo más importante para la velocidad**.

## Resumen de Cambios Realizados

1.  **Vite Config**: Se configuró `manualChunks` para separar React, Framer Motion, Recharts y Leaflet en archivos distintos. Esto permite que el navegador los guarde en caché individualmente, acelerando la carga de páginas subsiguientes.
2.  **Imágenes**: Se añadió `loading="lazy"` a las imágenes del carrusel y `fetchpriority="high"` a la imagen principal (Hero) para mejorar las métricas de Core Web Vitals (LCP).
3.  **Fuentes**: Se añadió `Instrument Sans` desde Google Fonts en `app.css` para evitar parpadeos de texto y mejorar la estética.
4.  **Lazy Loading**: El Dashboard de Administrador ahora carga los Gráficos y Mapas solo cuando son necesarios, acelerando el acceso inicial.
