import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  /** Minuto fijo de cada hora (grilla del reloj) en que se recarga. */
  readonly refreshAtMinute = 45;
  readonly appVersion = 'v1.1.0 08/26';

  fechaCorta: string = '';
  mesAnio: string = '';
  horaActual: string = '';
  saludo: string = 'Hola';
  showClock: boolean = false;
  proximaActualizacion: string = '';

  private nextRefreshAt = 0;
  private reloadTimer: ReturnType<typeof setTimeout> | null = null;
  private clockTimer: ReturnType<typeof setInterval> | null = null;
  private dateTimer: ReturnType<typeof setInterval> | null = null;

  private readonly arTz = 'America/Argentina/Buenos_Aires';
  /** Argentina sin DST: UTC−3. */
  private readonly arOffsetHours = -3;

  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    this.getFechaActual();
    this.updateSaludo();
    this.showClock = true;
    this.updateClock();
    this.setupAutoReload();

    this.dateTimer = setInterval(() => {
      this.getFechaActual();
      this.updateSaludo();
    }, 1800000);
  }

  ngOnDestroy(): void {
    if (this.reloadTimer) clearTimeout(this.reloadTimer);
    if (this.clockTimer) clearInterval(this.clockTimer);
    if (this.dateTimer) clearInterval(this.dateTimer);
  }

  getFechaActual(): void {
    const fecha = new Date();
    const diasCortos = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const mesesCortos = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    const diaSemana = diasCortos[fecha.getDay()];
    const dia = fecha.getDate();
    const mes = mesesCortos[fecha.getMonth()];
    const anio = fecha.getFullYear();

    this.fechaCorta = `${diaSemana} ${dia}`;
    this.mesAnio = `${mes} ${anio}`;
  }

  updateSaludo(): void {
    const hour = new Date().getHours();
    if (hour < 12) {
      this.saludo = 'Buenos días';
    } else if (hour < 19) {
      this.saludo = 'Buenas tardes';
    } else {
      this.saludo = 'Buenas noches';
    }
  }

  updateClock(): void {
    const tick = () => {
      const fecha = new Date();
      const hora = this.datePipe.transform(fecha, 'HH:mm', 'America/Argentina/Buenos_Aires');
      this.horaActual = hora || '--:--';
    };
    tick();
    this.clockTimer = setInterval(tick, 1000);
  }

  private setupAutoReload(): void {
    // Próximo XX:45 en hora Argentina (no "ahora + N minutos").
    this.nextRefreshAt = this.computeNextRefreshAt(new Date());
    this.proximaActualizacion =
      this.datePipe.transform(new Date(this.nextRefreshAt), 'HH:mm', this.arTz) || '--:--';

    const delay = Math.max(0, this.nextRefreshAt - Date.now());
    this.reloadTimer = setTimeout(() => {
      window.location.reload();
    }, delay);
  }

  /** Próximo instante en que el reloj AR marca hora:refreshAtMinute. */
  private computeNextRefreshAt(now: Date): number {
    const parts = this.getArWallParts(now);
    let { year, month, day, hour, minute } = parts;

    if (minute >= this.refreshAtMinute) {
      hour += 1;
      if (hour >= 24) {
        hour = 0;
        const next = new Date(Date.UTC(year, month - 1, day + 1));
        year = next.getUTCFullYear();
        month = next.getUTCMonth() + 1;
        day = next.getUTCDate();
      }
    }

    // Componentes de pared AR → UTC: UTC = AR − offset (offset −3 ⇒ +3h).
    return Date.UTC(year, month - 1, day, hour, this.refreshAtMinute, 0, 0)
      - this.arOffsetHours * 60 * 60 * 1000;
  }

  private getArWallParts(date: Date): {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
  } {
    const fmt = new Intl.DateTimeFormat('en-CA', {
      timeZone: this.arTz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    });
    const map = Object.fromEntries(
      fmt.formatToParts(date)
        .filter((p) => p.type !== 'literal')
        .map((p) => [p.type, p.value])
    );
    return {
      year: Number(map['year']),
      month: Number(map['month']),
      day: Number(map['day']),
      hour: Number(map['hour']),
      minute: Number(map['minute'])
    };
  }
}
