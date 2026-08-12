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
- Marca **Hola Argentina**, saludo según hora, fecha (`Hoy es …`)
- Widgets: día, hora (AR) y clima (Buenos Aires)
- Auto-refresh en el próximo **`:45`** (hora Argentina)
- Footer con próxima actualización y versión (`v1.1.0 08/26`)

### Cotizaciones
- Dólar Oficial / Blue: compra/venta, variación e historial 7 días (modal)
- Bitcoin y Oro: spot, variación e historial 7 días (modal)

### Economía
- Inflación mensual (INDEC): período, Δ en pp, historial 6 meses
- Inflación interanual (INDEC): valor + período
- Tasa BCRA (BADLAR/TPM): Δ en pp, historial 6 meses (último valor de cada mes)

### Día a día
- Bondi (SUBE), nafta, asado, pan, Big Mac

Los textos **Últimos…** / **Prox. 7 días** son links que abren el detalle (no navegan a otra página).

## Estructura útil

```
src/app/
  app.component.*     # shell, hero, refresh
  dolar-tile/         # Oficial y Blue (historial)
  bitcoin/ oro/       # cripto / metal
  prensado/           # inflación mensual
  inflacionanual/
  tasabcra/
  temperature/        # clima + pronóstico 7 días
  environments/
```

## Notas

- El servicio Java (`springboot-service-scraper`) ya no se usa; el backend activo es Node.
- Si el hot-reload falla por watches (`EMFILE`), reiniciá `ng serve` o subí el límite de file descriptors.
