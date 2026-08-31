# Instalación paso a paso (sin conocimientos técnicos)

> English: [INSTALL.md](INSTALL.md)

No hace falta saber programar. Son 10 minutos, una sola vez.

## Qué necesitás

- **Google Chrome actualizado** en una computadora de escritorio (Windows,
  Mac o Linux). No funciona en celulares.
- Unos **22 GB libres** de disco la primera vez (Chrome descarga el modelo de
  IA una única vez y lo comparte con todo el navegador).

## Parte 1 — Descargar la extensión

1. Entrá a la página del proyecto:
   **https://github.com/martingaray/gemma-local-chrome**
2. Tocá el botón verde **`<> Code`** (arriba a la derecha de la lista de archivos).
3. Elegí **Download ZIP**. Se descarga un archivo llamado
   `gemma-local-chrome-main.zip`.
4. Abrí tu carpeta de Descargas y **descomprimí el ZIP** (doble click en Mac;
   click derecho → "Extraer todo…" en Windows). Va a quedar una carpeta
   llamada `gemma-local-chrome-main`.
5. Movela a un lugar estable (Documentos, por ejemplo). **No la borres
   después**: Chrome la usa cada vez que abre la extensión.

## Parte 2 — Cargarla en Chrome

1. Abrí Chrome y escribí en la barra de direcciones: `chrome://extensions`
   y apretá Enter.
2. Activá el interruptor **"Modo de desarrollador"** (arriba a la derecha).
3. Apareció una botonera nueva. Tocá **"Cargar descomprimida"**
   ("Load unpacked" si tu Chrome está en inglés).
4. Seleccioná la carpeta `gemma-local-chrome-main` que guardaste en la Parte 1.
5. Listo: aparece la tarjeta **"Gemma Local Chrome — Local AI Agent"**.
6. Recomendado: tocá el ícono de rompecabezas 🧩 (a la derecha de la barra de
   direcciones) y el pin 📌 junto a Gemma Local Chrome, para tenerla siempre a mano.

## Parte 3 — Configurar la IA de Chrome (una sola vez)

Chrome trae la IA local (Gemini Nano) pero puede venir desactivada:

1. Escribí en la barra de direcciones:
   `chrome://flags/#prompt-api-for-gemini-nano` y Enter.
2. En la opción resaltada **"Prompt API for Gemini Nano"**, cambiá
   `Default` por **`Enabled`**.
3. Tocá el botón azul **"Relaunch"** para reiniciar Chrome.
4. (Solo si más adelante la extensión dice "no disponible") Escribí
   `chrome://components`, buscá **"Optimization Guide On Device Model"** y
   tocá **"Buscar actualizaciones"**. Esa es la descarga del modelo; puede
   tardar unos minutos.

## Parte 4 — Usarla

1. Hacé click en el ícono de la extensión (o en 🧩 → Gemma Local Chrome).
2. Se abre el panel lateral de chat. Escribí tu primera pregunta y Enter.
3. La primera respuesta puede tardar un poco más (el modelo se está
   preparando); después es inmediato.

## ¿Problemas?

- **"Gemini Nano no está disponible"** → repetí la Parte 3 completa y
  verificá que Chrome esté actualizado (`chrome://settings/help`).
- **No aparece el panel** → `chrome://extensions` → botón ↻ en la tarjeta de
  la extensión.
- Más ayuda: [AYUDA.md](AYUDA.md).
