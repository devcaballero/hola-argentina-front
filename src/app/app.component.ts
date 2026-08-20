import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Efemeride, getEfemerideByMonthDay } from './efemerides-ar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('efemerideBackdrop') efemerideBackdrop?: ElementRef<HTMLElement>;

  /** Minuto fijo de cada hora (grilla del reloj) en que se recarga. */
  readonly refreshAtMinute = 45;
  readonly appVersion = 'v1.2.0 08/26';

  fechaCorta: string = '';
  mesAnio: string = '';
  horaActual: string = '';
  saludo: string = 'Hola';
  efemeride: Efemeride | null = null;
  efemerideModalOpen = false;
  efemerideSummary: string | null = null;
  efemerideSummaryLoading = false;
  showClock: boolean = false;
  proximaActualizacion: string = '';

  private nextRefreshAt = 0;
  private reloadTimer: ReturnType<typeof setTimeout> | null = null;
  private clockTimer: ReturnType<typeof setInterval> | null = null;
  private dateTimer: ReturnType<typeof setInterval> | null = null;

  private readonly arTz = 'America/Argentina/Buenos_Aires';
  /** Argentina sin DST: UTC−3. */
  private readonly arOffsetHours = -3;

  constructor(
    private datePipe: DatePipe,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.getFechaActual();
    this.updateSaludo();
    this.updateEfemeride();
    this.showClock = true;
    this.updateClock();
    this.setupAutoReload();

    this.dateTimer = setInterval(() => {
      this.getFechaActual();
      this.updateSaludo();
      this.updateEfemeride();
    }, 1800000);
  }

  ngAfterViewChecked(): void {
    const el = this.efemerideBackdrop?.nativeElement;
    if (this.efemerideModalOpen && el && el.parentElement !== document.body) {
      document.body.appendChild(el);
    }
  }

  ngOnDestroy(): void {
    if (this.reloadTimer) clearTimeout(this.reloadTimer);
    if (this.clockTimer) clearInterval(this.clockTimer);
    if (this.dateTimer) clearInterval(this.dateTimer);
    this.unlockBodyScroll();
    this.efemerideBackdrop?.nativeElement?.remove();
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
    // Misma zona que el reloj (AR). Madrugada (0–5) es noche, no "días".
    const hour = Number(this.datePipe.transform(new Date(), 'H', this.arTz));
    if (hour >= 6 && hour < 12) {
      this.saludo = 'Buenos días';
    } else if (hour >= 12 && hour < 19) {
      this.saludo = 'Buenas tardes';
    } else {
      this.saludo = 'Buenas noches';
    }
  }

  updateEfemeride(): void {
    const md = this.datePipe.transform(new Date(), 'MM-dd', this.arTz) || '';
    this.efemeride = getEfemerideByMonthDay(md);
  }

  openEfemerideModal(): void {
    if (!this.efemeride) return;
    this.efemerideModalOpen = true;
    document.body.style.overflow = 'hidden';
    this.loadEfemerideSummary();
  }

  closeEfemerideModal(): void {
    this.efemerideModalOpen = false;
    this.unlockBodyScroll();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.efemerideModalOpen) this.closeEfemerideModal();
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

  private loadEfemerideSummary(): void {
    const e = this.efemeride;
    if (!e) return;

    this.efemerideSummary = null;
    const title = this.wikiTitleFromUrl(e.wikiUrl);
    if (!title) {
      this.efemerideSummary = e.text;
      this.efemerideSummaryLoading = false;
      return;
    }

    this.efemerideSummaryLoading = true;
    const api =
      'https://es.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(title);
    this.http.get<{ extract?: string }>(api).subscribe({
      next: (res) => {
        this.efemerideSummary = (res.extract || '').trim() || e.text;
        this.efemerideSummaryLoading = false;
      },
      error: () => {
        this.efemerideSummary = e.text;
        this.efemerideSummaryLoading = false;
      },
    });
  }

  private wikiTitleFromUrl(url?: string): string | null {
    if (!url) return null;
    try {
      const path = new URL(url).pathname;
      const raw = path.replace(/^\/wiki\//, '');
      return raw ? decodeURIComponent(raw) : null;
    } catch {
      return null;
    }
  }

  private unlockBodyScroll(): void {
    document.body.style.overflow = '';
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
