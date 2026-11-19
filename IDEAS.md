# Ideas y pendientes – Celio Mi Cielo

## Ideas por implementar

> Implementadas (1 y 2): selector de presentación con precios de la tienda y carrito
> que envía el pedido por WhatsApp a la sede elegida. Tamaños: Porción, Pequeña
> (2-4 porciones), Mediana y Entera, según lo que exista para cada torta.

### 1. Presentaciones de tamaño por torta
- Cada torta se puede escoger en **Porción**, **Mediana** o **Entera**.
- Mostrar el precio de cada presentación (no solo "Desde $ X").
- Los precios por presentación existen hoy en la tienda WooCommerce
  (allí se llaman Individual / Mediana 4-6 porciones / Grande 8-10 porciones);
  sacarlos de ahí y confirmarlos con el negocio.
- Aplicar el selector en las tarjetas de productos, el menú y la Torta de Pastores del hero.

### 2. Carrito de compras
- Agregar varios productos (con su presentación y cantidad) a un carrito.
- Al finalizar, elegir la sede (Ciudad Jardín o Aquarela) y enviar el pedido
  completo por WhatsApp al número de esa sede, con el total.
- Sin pagos en línea por ahora.

## Manual de marca
- Está en `_originales/MANUAL celio mi cielo.pdf` (no se sube al repo).

## Pendientes de información
- [x] Enlaces de Rappi por sede (Aquarela y Ciudad Jardín) en `src/data/site.ts`.
- [ ] Ítems y precios de café, sándwiches y almuerzos (los menús PDF son de oct. 2024).
- [ ] Confirmar que la sede Ciudad Jardín es La Leyenda Mall, y su enlace exacto de Google Maps.
- [ ] Confirmar precios vigentes (hoy se toman de la tienda actual).
- [ ] Revisar textos escritos para la web (descripción de la Torta de Pastores, títulos).
- [ ] Logo en SVG (horizontal, apilado, sello e isotipo; en blanco, lila y verde oscuro).
      Hoy se usan PNG recoloreados del logo del WordPress.
- [ ] Fuentes de la marca: Neulis (títulos) e Intro (textos), con su licencia web.
      Hoy se usan Jost (por Neulis) y Figtree (por Intro), las alternativas gratuitas más parecidas.
- [ ] Fotos originales: productos, Torta de Pastores con fondo neutro, local.

## Pendientes técnicos
- [ ] Copiar las imágenes al proyecto (hoy se cargan desde el WordPress actual).
- [ ] Publicar: opción recomendada, exportar estático y subir al hosting de Dongee
      (Vercel Hobby no permite uso comercial; Pro tiene costo mensual).
- [ ] Antes de apagar WordPress: revisar correo del dominio y la tienda WooCommerce.
- [ ] Considerar mover el proyecto fuera de OneDrive (node_modules).
