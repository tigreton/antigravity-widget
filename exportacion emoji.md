Aquí tienes las opciones que veo para resolver el problema del color en la captura:

---

### Opción A: Usar otra librería (`dom-to-image-more`)
Reemplazar `html2canvas` por [`dom-to-image-more`](https://github.com/1904labs/dom-to-image-more), que **sí soporta filtros CSS** como `hue-rotate`. La captura saldría tal cual se ve en pantalla.
- ✅ Solución limpia, sin trucos.
- ⚠️ Cambia de dependencia externa.

### Opción B: Captura en dos pasadas (composición)
1. Capturar solo el emoji 💩 (sin cosméticos) → aplicar `hue-rotate` por Canvas API.
2. Capturar solo los cosméticos (sin el emoji).
3. Fusionar las dos imágenes en un canvas final.
- ✅ Color preciso solo en el Pou, cosméticos intactos.
- ⚠️ Más complejo de implementar y mantener.

### Opción C: Usar imágenes SVG/PNG en vez de emoji
Sustituir el emoji 💩 por una imagen SVG o PNG propia del Pou. Al ser una imagen, se puede colorear directamente con un canvas sin depender de filtros CSS.
- ✅ Control total del aspecto.
- ⚠️ Hay que diseñar/buscar la imagen base.

### Opción D: Aplicar `hue-rotate` a toda la imagen (lo que revertimos)
La misma solución anterior: se aplica el filtro a todo el canvas, incluyendo gorro/gafas/botas.
- ✅ Muy simple.
- ⚠️ Los accesorios también cambian de color.

---

**Mi recomendación:** La **Opción A** es la más limpia, ya que simplemente funciona sin trucos y respeta todos los estilos CSS. ¿Cuál prefieres?