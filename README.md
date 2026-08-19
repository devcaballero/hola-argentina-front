# Hola Argentina (panel-informativo-front)

Panel informativo de Argentina: cotizaciones, economía, clima y precios del día a día.

Frontend en **Angular 16**. Consume la API de [`price-webscraper`](https://github.com/devcaballero/price-webscraper).

## Requisitos

- Node.js (recomendado LTS; Angular 16 corre bien con Node 18+)
- API local o remota en `/api/v1`

## Cómo correr en local

1. Levantá el scraper (puerto **3000**):

```bash
cd ../price-webscraper
npm install
npm start
# o: ./start-local.sh
```

2. En este repo:

```bash
npm install
npm start
```

Abrí [http://localhost:4200](http://localhost:4200).

## Environments

| Archivo | Uso | API |
|---------|-----|-----|
| `src/environments/environment.ts` | `ng serve` (dev) | `http://localhost:3000/api/v1` |
| `src/environments/environment.prod.ts` | build de producción | `https://price-webscraper.onrender.com/api/v1` |

Build prod:

```bash
npm run build -- --configuration=production
```

## Qué muestra

### Hero
- Marca **Hola Argentina** y saludo según hora (Buenos días / tardes / noches)
- Fila de widgets (AR):
  - **Hora actual**
  - **Fecha** (día + número)
  - **Mes / año**
  - **Clima** Buenos Aires (condición corta, temp, pronóstico extendido 7 días en modal)
  - **Próx. feriado** (días restantes + modal con detalle)
  - **Próx. estación** (equinoccio/solsticio HS, días restantes)
  - **Luna** (fase + modal con detalle)
- Auto-refresh en el próximo **`:45`** (hora Argentina)
- Footer con próxima actualización y versión (`v1.1.30 08/26`)

### Cotizaciones
- Dólar Oficial / Blue: compra/venta, variación e historial 7 días (modal)
- Bitcoin y Oro: spot, variación e historial 7 días (modal)

### Economía
- Inflación mensual (INDEC): período, Δ en pp, historial 6 meses
- Inflación interanual (INDEC): valor + período
- Tasa BCRA (BADLAR/TPM): Δ en pp, historial 6 meses (último valor de cada mes)

Colores de variación (semántica “bueno/malo” para el usuario, no solo sube/baja):
- Cotizaciones y tasa BCRA: sube = verde, baja = rojo
- Inflación: sube = rojo, baja = verde

### Día a día
- Bondi (SUBE), nafta, asado, pan, Big Mac

Los textos **Últimos…** / **+ info** abren el detalle en modal (no navegan a otra página).

## Estructura útil

```
src/app/
  app.component.*     # shell, hero, refresh
  feriado/            # próximo feriado AR (+ feriados-ar.ts)
  estacion/           # próxima estación (+ estaciones-ar.ts)
  moon/               # fase lunar (+ moon-phase.ts)
  temperature/        # clima + pronóstico 7 días
  dolar-tile/         # Oficial y Blue (historial)
  bitcoin/ oro/       # cripto / metal
  prensado/           # inflación mensual
  inflacionanual/
  tasabcra/
  environments/
```

## Gitflow

- **Features:** salen de `develop` → PR a `develop` → release PR `develop` → `main`
- **Fixes:** salen de `main` → PR a `main` → backport/PR a `develop`

## Notas

- El servicio Java (`springboot-service-scraper`) ya no se usa; el backend activo es Node.
- Si el hot-reload falla por watches (`EMFILE`), reiniciá `ng serve` o subí el límite de file descriptors.
- Prod front: [panelinformativo.netlify.app](https://panelinformativo.netlify.app)
