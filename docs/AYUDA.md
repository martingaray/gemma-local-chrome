# Ayuda — Gemma Local Chrome

> English: [HELP.md](HELP.md)

> **Descargo de responsabilidad:** esta extensión es un ejemplo de uso de la
> IA integrada de Chrome. Gemma es un modelo chico on-device — útil y rápido,
> pero mucho menos capaz que los modelos en la nube. Verificá lo importante.

## ¿Qué es?

Un agente de chat en el side panel de Chrome, impulsado por **Gemini Nano** —
el LLM que Google incluye dentro de Chrome. A diferencia de Gemini o Claude en
el navegador, el modelo corre **en tu máquina**: sin cuenta, sin API keys, sin
costo, y tus conversaciones nunca salen de la computadora. Desconectate de
internet y sigue funcionando.

## Controles

| Control | Qué hace |
|---|---|
| **Caja de mensaje** | Enter envía, Shift+Enter agrega salto de línea. |
| **Enviar** | Envía tu mensaje; la respuesta llega en streaming, token a token. |
| **Incluir la página actual como contexto** | Con el check activo, el texto de la pestaña activa viaja con tu mensaje (pide permiso por sitio la primera vez; la página solo se reenvía cuando cambia la URL). Desmarcalo para chat sin contexto. |
| **↻ Borrar y Reiniciar** | Botón redondo junto a Enviar: limpia la conversación y arranca una sesión fresca (el modelo olvida todo lo dicho). |
| **Anillo de contexto** | Indicador donut que muestra cuánto de la ventana de contexto del modelo usó la conversación (verde → ámbar → rojo). |
| **🇺🇸 / 🇦🇷** | Idioma de interfaz + respuestas; también reinicia la conversación. Se recuerda entre sesiones. |

## Comandos pro y ejemplos

Gemma es un modelo chico on-device: rinde al máximo cuando le das **una tarea
clara por mensaje** y un **formato de salida explícito**.

### Con contexto de página activado (default)

| Objetivo | Prompt |
|---|---|
| Resumir | `Resumí esta página en 5 bullets` |
| Extraer datos | `Listá todos los precios que menciona esta página, uno por línea` |
| Explicar | `Explicame este artículo como si tuviera 12 años` |
| Traducir | `Traducí el contenido principal de esta página al inglés` |
| Evaluar | `¿Qué preguntas deja sin responder esta página?` |
| Redactar | `Escribí un post de LinkedIn de 2 líneas recomendando este artículo` |

La página se captura al enviar el mensaje — navegá primero, preguntá después.
En páginas largas solo entran los primeros ~12.000 caracteres.

### Sin contexto de página (desmarcá el check)

Uso de asistente general: `dame 10 ideas de nombre para un blog de café`,
`reescribí este párrafo en tono amigable: …`, `explicá qué es un embedding`.

### Cómo sacarle mejores respuestas a un modelo chico

- **Una tarea por mensaje** — encadená repreguntas en vez de mega-prompts.
- **Pedí el formato**: "en tabla", "en 3 bullets", "en una línea".
- **Nuevo chat al cambiar de tema** — libera la ventana de contexto y evita
  que mezcle páginas anteriores.
- **Iterá**: "más corto", "más formal", "ahora en inglés" funcionan muy bien
  porque la sesión recuerda la conversación.
- Si responde en el idioma equivocado, cambiá la bandera (🇺🇸/🇦🇷) — también
  define el idioma de salida del modelo.

## Moldear el tono de Gemma: Personalización

Abrí **menú ☰ → Configuración**. Todo lo de acá cambia *cómo* habla Gemma, no
*qué* puede hacer. Aplica desde el **próximo chat** — tocá ↻ después de guardar.

### Estilo y tono base — opción por opción

| Opción | Qué hace | Usala cuando |
|---|---|---|
| **Default** | Sin instrucción de estilo; la voz natural del modelo. | No tenés preferencia fuerte. |
| **Profesional** | Redacción pulida y precisa; sin jerga. | Contextos de trabajo, borradores para clientes. |
| **Amigable** | Cálida, conversadora, de confianza. | Uso casual, compañía de brainstorming. |
| **Franco** | Directa y alentadora; dice las cosas sin vueltas. | Querés opiniones honestas y accionables. |
| **Original** | Ángulos juguetones e imaginativos. | Trabajo creativo, naming, ideación. |
| **Eficiente** | La respuesta útil más corta; cero relleno. | Consultas rápidas, flujos repetidos. |
| **Cínico** | Crítica, levemente sarcástica, igual útil. | Poner a prueba ideas, abogado del diablo. |

### Características — qué hacen Más / Menos

| Característica | Más | Menos |
|---|---|---|
| **Calidez** | Notablemente cercana y empática. | Tono neutro y factual. |
| **Entusiasmo** | Muestra emoción por tus temas. | Sin exclamaciones ni efusividad. |
| **Emojis** | Usa emojis cuando suman. | Nunca usa emojis. |
| **Títulos y listas** | Estructura con títulos/bullets. | Prosa corrida en vez de listas. |

`Default` deja ese rasgo al estilo base.

### Instrucciones personalizadas — biblioteca de plantillas

Copiá una en **Instrucciones personalizadas**, adaptala, guardá y tocá ↻.
Combiná un *rol* con una *regla de comportamiento* para mejores resultados.

**Educador**
```
Actuá como un educador paciente. Explicá los conceptos paso a paso, de lo
simple a lo complejo, con una analogía cotidiana por concepto. Cerrá cada
respuesta con una pregunta que verifique si entendí.
```

**Crítico y objetivo**
```
Sé crítico y objetivo. Antes de coincidir, validá mis observaciones contra la
evidencia disponible. Si mi afirmación es débil, decí exactamente por qué y
qué la haría más sólida. Nunca aceptes una idea solo porque es mía.
```

**Sin adulación (anti-complaciente)**
```
No me adules y no seas complaciente. Busco un asistente para mejorar mi
trabajo, no un seguidor que acepte mis ideas como válidas por defecto.
Cuestioná supuestos, marcá errores sin rodeos y proponé la alternativa más
fuerte cuando la veas.
```

**Desarrollador**
```
Actuá como desarrollador de software senior. Preferí soluciones mínimas que
funcionen, mostrá código antes que prosa, nombrá los trade-offs de cada
enfoque y marcá problemas de seguridad o performance aunque no pregunte.
```

**Diseñador**
```
Actuá como diseñador de producto/UI. Razoná sobre jerarquía, contraste,
espaciado y accesibilidad. Criticá antes de elogiar: ¿qué confunde primero al
usuario? Sugerí siempre una mejora concreta con ejemplo.
```

**Redactor**
```
Actuá como redactor publicitario. Ofrecé 3 variantes por pedido (directa,
creativa, mínima), frases cortas, sacá adjetivos y adaptá el tono a la
audiencia que te nombre. Si me olvido de la audiencia, preguntámela.
```

**Gerente**
```
Actuá como un gerente pragmático. Empujame a definir objetivo, responsable y
fecha para cada idea. Resumí decisiones en una línea, listá riesgos y
preguntá qué NO vamos a hacer para proteger el foco.
```

## El log de procesamiento

Mientras Gemma prepara o piensa, aparece un **Log de procesamiento** bajo la
línea de estado. Muestra en tiempo real qué pasa en tu máquina: captura de la
página y su tamaño, % de descarga del modelo, tamaño del prompt, tiempo al
primer token, chunks del streaming y cuán llena quedó la ventana de contexto
tras cada respuesta. Útil para entender la latencia y ver exactamente qué se
envió (y qué no) al modelo.

## Notas

- La conversación vive en la sesión del modelo: cerrar el panel o "Nuevo chat"
  la borra. No se almacena nada.
- Si ves "Gemini Nano no está disponible": usá un Chrome de escritorio
  reciente y activá `chrome://flags/#prompt-api-for-gemini-nano`, reiniciá.
- Fuentes: [docs de la Prompt API](https://developer.chrome.com/docs/ai/built-in) ·
  [spec](https://github.com/webmachinelearning/prompt-api).
