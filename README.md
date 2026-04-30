# Antigravity Widget

Un widget flotante modular e interactivo para páginas web, construido con HTML, CSS, JavaScript (jQuery) y Bootstrap. Este proyecto sirve como plantilla para crear widgets que se sitúan en la esquina inferior derecha de la pantalla (típicamente usados para chats, preguntas frecuentes o notificaciones).

## Características

El widget cuenta con un diseño moderno ("glassmorphism"), animaciones fluidas y está preparado para funcionar en dos modos distintos a modo de demostración:

### 1. Modo Noticias 📰
Un tablón de anuncios sencillo que muestra una lista de notificaciones o novedades. Ideal para mantener informados a los usuarios sobre actualizaciones del sitio.

### 2. Modo Juego (Mascota Virtual) 👾
Un minijuego interactivo tipo "Pou" renderizado completamente con emojis y CSS. Cuenta con su propia lógica de estado y gestión de recursos.

**Estadísticas de la Mascota:**
* ❤️ **Salud:** Representa la vitalidad de la mascota.
* 💩 **Higiene:** Muestra lo limpia que está.
* **G** **Productividad:** El nivel de energía o rendimiento.
* 🪙 **Monedas:** Divisa para realizar ciertas acciones (como comer).

**Acciones Disponibles:**
* 🚿 **Duchar:** Aumenta la Higiene (+20) y ligeramente la Salud (+5).
* 🍔 **Comer:** Cuesta 10 Monedas. Aumenta mucho la Salud (+20) pero reduce la Higiene (-10).
* ⚾ **Jugar:** Aumenta la Productividad (+10) y genera Monedas (+5), pero reduce la Salud (-5) y la Higiene (-5) por el esfuerzo.
* ✨ **Limpiar:** Restaura en gran medida la Higiene (+30) y mejora ligeramente la Productividad (+5).

## Tecnologías Utilizadas

* **HTML5:** Estructura del documento.
* **CSS3:** Estilos avanzados, animaciones (`@keyframes`), diseño flexible (`flexbox`) y posicionamiento (`position: fixed`).
* **JavaScript (Vanilla + jQuery):** Lógica de apertura/cierre del widget y mecánicas del minijuego. Se utiliza jQuery para simplificar la selección y manipulación del DOM.
* **Bootstrap 5:** Para la estructura general de la página de demostración.
* **FontAwesome:** Para la iconografía tanto del panel del widget como del minijuego.

## Cómo usarlo

1. Clona este repositorio o descarga los archivos.
2. Abre el archivo `index.html` en cualquier navegador web moderno.
3. Utiliza los botones centrales de la página para alternar entre el "Widget de Noticias" y el "Widget Juego".
4. Haz clic en el botón flotante en la esquina inferior derecha para abrir y cerrar el panel.

## Estructura de Archivos

* `index.html`: Contiene la página principal de demostración y la estructura HTML base del widget.
* `widget.css`: Todo el diseño visual, efectos y animaciones del widget.
* `widget.js`: La lógica de interacción, cambio de modos y las funciones del minijuego.
