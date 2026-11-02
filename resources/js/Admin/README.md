# Guía de Implementación: Módulo Dashboard de Analíticas

Este documento detalla la estructura y el flujo de funcionamiento del Dashboard de Administración para que cualquier programador pueda replicar exactamente este comportamiento en otro módulo o proyecto.

---

## 📂 Archivos Involucrados

Para que este módulo funcione, se requiere la interacción de los siguientes componentes:

1. **Rutas:**
   * [routes/web.php](file:///c:/xampp/htdocs/projects/quiroinnova_backend/routes/web.php): Define la ruta de acceso al dashboard de administración.
2. **Controlador:**
   * [HomeController.php](file:///c:/xampp/htdocs/projects/quiroinnova_backend/app/Http/Controllers/Admin/HomeController.php): Calcula los rangos de fecha y procesa las consultas de métricas.
   * [BasicController.php](file:///c:/xampp/htdocs/projects/quiroinnova_backend/app/Http/Controllers/BasicController.php): Controlador base que inyecta parámetros globales e inicializa Inertia.js.
3. **Modelos:**
   * [Visit.php](file:///c:/xampp/htdocs/projects/quiroinnova_backend/app/Models/Visit.php): Almacena los registros de tráfico/visitas al sitio web.
   * [Message.php](file:///c:/xampp/htdocs/projects/quiroinnova_backend/app/Models/Message.php): Almacena los leads o registros de contacto del usuario.
4. **Vistas / Componentes React:**
   * [Home.jsx](file:///c:/xampp/htdocs/projects/quiroinnova_backend/resources/js/Admin/Home.jsx): Componente React que renderiza las tarjetas de información y gráficos interactivos.
   * [Base.jsx](file:///c:/xampp/htdocs/projects/quiroinnova_backend/resources/js/Components/Adminto/Base.jsx): Plantilla layout que envuelve la administración (Menú, NavBar, Footer).
   * [CreateReactScript.jsx](file:///c:/xampp/htdocs/projects/quiroinnova_backend/resources/js/Utils/CreateReactScript.jsx): Inicializador global de Inertia en el frontend.

---

## ⚙️ Flujo de Trabajo y Funcionamiento

### 1. Petición Inicial
El usuario accede a `/admin/home`.
* Laravel verifica a través de la ruta si el usuario tiene rol de Administrador (`middleware(['can:Admin', 'auth'])`).
* Llama al método `reactView` de [HomeController.php](file:///c:/xampp/htdocs/projects/quiroinnova_backend/app/Http/Controllers/Admin/HomeController.php).

### 2. Procesamiento en Servidor (PHP)
El método `setReactViewProperties(Request $request)` realiza lo siguiente:
* Lee el parámetro `range` (por defecto `mes_actual`).
* Establece las fechas `$startDate` y `$endDate` a través de un bloque `switch`:
  * `hoy`: Filtra el día en curso.
  * `ayer`: Filtra las 24 horas del día anterior.
  * `3_dias` / `semana_pasada` / `2_semanas`: Períodos relativos de tiempo atrás.
  * `mes_actual`: Desde el primer día del mes actual.
  * `personalizar`: Lee `start_date` y `end_date` enviados desde la petición.
* **Consultas de Métricas:**
  * **Visitas totales y diarias:** Registros de la tabla `visits` en el rango de fechas.
  * **Leads totales y diarios:** Registros de la tabla `messages` en el rango de fechas.
  * **Tasa de conversión:** Proporción porcentual entre visitas y leads ($(\text{leads} / \text{visitas}) \times 100$).
  * **Datos agrupados para gráficos:**
    * Serie diaria de visitas agrupadas por `DATE(created_at)`.
    * Serie diaria de leads agrupados por `DATE(created_at)`.
  * **UTM Sources (Top 5):** Cuenta de visitas agrupadas por la columna `utm_source` en orden descendente.
* Retorna un arreglo asociativo con la clave `'metrics'` conteniendo todas estas variables calculadas.

### 3. Carga e Inicialización de React (Inertia)
* [BasicController.php](file:///c:/xampp/htdocs/projects/quiroinnova_backend/app/Http/Controllers/BasicController.php) junta las métricas personalizadas con las globales (mensajes sin leer, datos del usuario en sesión, etc.) y ejecuta `Inertia::render()`.
* [CreateReactScript.jsx](file:///c:/xampp/htdocs/projects/quiroinnova_backend/resources/js/Utils/CreateReactScript.jsx) inicializa la app React, inyecta funciones de ayuda para verificar roles (`hasRole`) y permisos (`can`), y monta la vista.

### 4. Renderizado del Frontend
El componente [Home.jsx](file:///c:/xampp/htdocs/projects/quiroinnova_backend/resources/js/Admin/Home.jsx) recibe los datos y construye la interfaz:
* **Filtros Interactivos:**
  * Un dropdown permite alternar los rangos. Al cambiar a opciones fijas, realiza una redirección:
    ```javascript
    window.location.href = `?range=${val}`;
    ```
  * Si el rango seleccionado es `"personalizar"`, muestra dos selectores de tipo `date` y un botón para forzar la redirección con las fechas elegidas:
    ```javascript
    window.location.href = `?range=personalizar&start_date=${customStart}&end_date=${customEnd}`;
    ```
* **Sección de Tarjetas (Stats Grid):**
  * Cuatro paneles estilizados que muestran el *Total de Visitas*, *Total de Leads*, *Tasa de Conversión* y *Fuente Principal*. Tienen animaciones de entrada y efectos de elevación al pasar el mouse por encima (`transform: translateY(-5px)`).
* **Gráfico Mixto (Visitas vs Leads):**
  * Utiliza un gráfico mixto de `react-chartjs-2`.
  * Las **visitas** se muestran como un gráfico de tipo **línea** (eje izquierdo primario, color `#f7b23b`).
  * Los **leads** se muestran como un gráfico de tipo **barras** (eje derecho secundario, color `#10b981`).
* **Gráfico de Rosca (UTM Top 5):**
  * Gráfico tipo **Doughnut** que ilustra de dónde proviene el tráfico junto con una lista desglosada debajo de este.

---

## 📋 Pasos para Replicar este Módulo

Si deseas crear una vista analítica idéntica en otro módulo, sigue estos pasos:

1. **Definir e importar las tablas en DB:**
   * Asegúrate de contar con tablas equivalentes a `visits` (para registrar páginas vistas) y `messages` (para registrar conversiones/formularios).
2. **Definir el Controlador de Backend:**
   * Heredar de `BasicController` y establecer la vista React en `$reactView`.
   * Implementar `setReactViewProperties(Request $request)` para procesar los rangos de fechas (Carbon) y consultas agregadas (`groupByRaw`).
3. **Declarar la Ruta:**
   * Enlazar el controlador en `routes/web.php` con los middlewares de autenticación que correspondan.
4. **Programar el Componente React Frontend:**
   * Configurar el estado local para las fechas.
   * Procesar las series de datos convirtiéndolas en arreglos de etiquetas (`labels`) y valores (`data`) compatibles con Chart.js.
   * Renderizar dentro del layout del panel utilizando `BaseAdminto` para conservar la barra de navegación superior, pie de página y barra lateral.
