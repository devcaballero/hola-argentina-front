import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ApiService } from '../api.service';
import { formatArDecimal } from '../format-ar';

interface HistorialDay {
  fecha: string;
  valor: string;
  deltaPct: number | null;
}

interface VariacionPayload {
  porcentaje: number;
  unidad?: string;
  direccion: 'up' | 'down' | 'flat';
}

interface IndicePayload {
  valor?: string;
  nombre?: string;
  meta?: string;
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
  selector: 'app-indice-bcra',
  templateUrl: './indice-bcra.component.html',
  styleUrls: ['./indice-bcra.component.css'],
})
export class IndiceBcraComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('historyBackdrop') historyBackdrop?: ElementRef<HTMLElement>;

  @Input() endpoint = '';
  @Input() kicker = 'BCRA';
  @Input() title = '';
  @Input() meta = '';
  @Input() description = '';
  @Input() historyTitle = 'Últimos 7 días';

  valor: string | undefined;
  isLoading = true;
  variacionLabel = '';
  variacionDir: 'up' | 'down' | 'flat' | null = null;
  historial: HistorialViewDay[] = [];
  historyOpen = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    if (!this.endpoint) {
      this.isLoading = false;
      return;
    }
    this.apiService.getData(this.endpoint).subscribe(
      (raw) => {
        this.applyPayload(raw);
        this.isLoading = false;
      },
      (error) => {
        console.log(`Error al obtener ${this.title || this.endpoint}:`, error);
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
      const data = JSON.parse(raw) as IndicePayload;
      this.valor = data.valor;
      if (data.meta) this.meta = data.meta;
      this.applyVariacion(data.variacion);
      this.historial = (data.historial || []).map((day) => this.toHistorialView(day));
    } catch {
      this.valor = raw;
    }
  }

  private applyVariacion(variacion?: VariacionPayload | null): void {
    if (!variacion || variacion.porcentaje == null) {
      this.variacionLabel = '';
      this.variacionDir = null;
      return;
    }
    const pct = Number(variacion.porcentaje);
    const sign = pct > 0 ? '+' : '';
    this.variacionLabel = `${sign}${formatArDecimal(pct, 2)}%`;
    this.variacionDir = variacion.direccion || (pct > 0 ? 'up' : pct < 0 ? 'down' : 'flat');
  }

  private toHistorialView(day: HistorialDay): HistorialViewDay {
    const delta = day.deltaPct;
    let direccion: 'up' | 'down' | 'flat' = 'flat';
    let deltaLabel = '—';

    if (delta != null && Number.isFinite(delta)) {
      const sign = delta > 0 ? '+' : '';
      deltaLabel = `${sign}${formatArDecimal(delta, 2)}%`;
      direccion = delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat';
    }

    const date = this.parseIsoDate(day.fecha);
    return {
      dayLabel: this.dayLabel(day.fecha, date),
      dateLabel: this.dateLabel(date),
      valorLabel: day.valor,
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
