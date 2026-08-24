import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ApiService } from '../api.service';
import { formatArDecimal } from '../format-ar';

interface HistorialDay {
  fecha: string;
  valor: string;
  deltaPb: number | null;
}

interface VariacionPayload {
  puntos: number;
  unidad?: string;
  direccion: 'up' | 'down' | 'flat';
}

interface RiesgoPaisPayload {
  valor?: string;
  unidad?: string;
  fecha?: string;
  variacion?: VariacionPayload | null;
  historial?: HistorialDay[];
}

interface HistorialViewDay {
  dayLabel: string;
  dateLabel: string;
  valorLabel: string;
  deltaLabel: string;
  direccion: 'up' | 'down' | 'flat';
}

@Component({
  selector: 'app-riesgopais',
  templateUrl: './riesgopais.component.html',
  styleUrls: ['./riesgopais.component.css'],
})
export class RiesgopaisComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('historyBackdrop') historyBackdrop?: ElementRef<HTMLElement>;

  valor: string | undefined;
  isLoading = true;
  variacionLabel = '';
  variacionDir: 'up' | 'down' | 'flat' | null = null;
  historial: HistorialViewDay[] = [];
  historyOpen = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getData('/riesgo-pais').subscribe(
      (raw) => {
        this.applyPayload(raw);
        this.isLoading = false;
      },
      (error) => {
        console.log('Error al obtener el riesgo país:', error);
        this.isLoading = false;
      }
    );
  }

  ngAfterViewChecked(): void {
    const el = this.historyBackdrop?.nativeElement;
    if (this.historyOpen && el && el.parentElement !== document.body) {
      document.body.appendChild(el);
    }
  }

  ngOnDestroy(): void {
    this.unlockBodyScroll();
    this.historyBackdrop?.nativeElement?.remove();
  }

  openHistory(): void {
    if (!this.historial.length || this.isLoading) return;
    this.historyOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeHistory(): void {
    this.historyOpen = false;
    this.unlockBodyScroll();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.historyOpen) this.closeHistory();
  }

  private unlockBodyScroll(): void {
    document.body.style.overflow = '';
  }

  private applyPayload(raw: string): void {
    try {
      const data = JSON.parse(raw) as RiesgoPaisPayload;
      this.valor = data.valor;
      this.applyVariacion(data.variacion);
      this.historial = (data.historial || []).map((day) => this.toHistorialView(day));
    } catch {
      this.valor = raw;
    }
  }

  private applyVariacion(variacion?: VariacionPayload | null): void {
    if (!variacion || variacion.puntos == null) {
      this.variacionLabel = '';
      this.variacionDir = null;
      return;
    }
    const pts = Number(variacion.puntos);
    const sign = pts > 0 ? '+' : '';
    this.variacionLabel = `${sign}${formatArDecimal(pts, 1)} pb`;
    this.variacionDir = variacion.direccion || (pts > 0 ? 'up' : pts < 0 ? 'down' : 'flat');
  }

  private toHistorialView(day: HistorialDay): HistorialViewDay {
    const delta = day.deltaPb;
    let direccion: 'up' | 'down' | 'flat' = 'flat';
    let deltaLabel = '—';

    if (delta != null && Number.isFinite(delta)) {
      const sign = delta > 0 ? '+' : '';
      deltaLabel = `${sign}${formatArDecimal(delta, 1)} pb`;
      direccion = delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat';
    }

    const date = this.parseIsoDate(day.fecha);
    return {
      dayLabel: this.dayLabel(day.fecha, date),
      dateLabel: this.dateLabel(date),
      valorLabel: `${day.valor} pb`,
      deltaLabel,
      direccion,
    };
  }

  private parseIsoDate(fecha: string): Date {
    const [y, m, d] = fecha.split('-').map(Number);
    return new Date(y, (m || 1) - 1, d || 1);
  }

  private dayLabel(fecha: string, date: Date): string {
    const today = this.arDateIso(0);
    const yesterday = this.arDateIso(-1);
    if (fecha === today) return 'Hoy';
    if (fecha === yesterday) return 'Ayer';
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[date.getDay()];
  }

  private arDateIso(dayOffset: number): string {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Argentina/Buenos_Aires',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(new Date());
    const y = Number(parts.find((p) => p.type === 'year')?.value);
    const m = Number(parts.find((p) => p.type === 'month')?.value);
    const d = Number(parts.find((p) => p.type === 'day')?.value);
    return new Date(Date.UTC(y, m - 1, d + dayOffset)).toISOString().slice(0, 10);
  }

  private dateLabel(date: Date): string {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return `${date.getDate()} ${months[date.getMonth()]}`;
  }
}
