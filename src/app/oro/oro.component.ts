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
  precio: number;
  variacionPct: number | null;
}

interface VariacionPayload {
  porcentaje: number;
  absoluta: number | null;
  direccion: 'up' | 'down' | 'flat';
}

interface OroPayload {
  precio?: number;
  precioLabel?: string;
  variacion?: VariacionPayload | null;
  historial?: HistorialDay[];
}

interface HistorialViewDay {
  fecha: string;
  dayLabel: string;
  dateLabel: string;
  precioLabel: string;
  variacionLabel: string;
  direccion: 'up' | 'down' | 'flat';
}

@Component({
  selector: 'app-oro',
  templateUrl: './oro.component.html',
  styleUrls: ['./oro.component.css'],
})
export class OroComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('historyBackdrop') historyBackdrop?: ElementRef<HTMLElement>;

  precioLabel: string | undefined;
  isLoading = true;
  variacionLabel = '';
  variacionDir: 'up' | 'down' | 'flat' | null = null;
  historial: HistorialViewDay[] = [];
  historyOpen = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getData('/oro').subscribe(
      (raw) => {
        this.applyPayload(raw);
        this.isLoading = false;
      },
      (error) => {
        console.log('Error al obtener el precio del oro:', error);
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
      const data = JSON.parse(raw) as OroPayload;
      this.precioLabel =
        data.precioLabel ||
        (data.precio != null ? formatArDecimal(data.precio) : undefined);
      this.applyVariacion(data.variacion);
      this.historial = (data.historial || []).map((day) => this.toHistorialView(day));
    } catch {
      this.precioLabel = formatArDecimal(raw);
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
    this.variacionLabel = `${sign}${pct.toFixed(2).replace('.', ',')}%`;
    this.variacionDir = variacion.direccion || (pct > 0 ? 'up' : pct < 0 ? 'down' : 'flat');
  }

  private toHistorialView(day: HistorialDay): HistorialViewDay {
    const date = new Date(`${day.fecha}T12:00:00`);
    const pct = day.variacionPct;
    let direccion: 'up' | 'down' | 'flat' = 'flat';
    let variacionLabel = '—';

    if (pct != null && Number.isFinite(pct)) {
      const sign = pct > 0 ? '+' : '';
      variacionLabel = `${sign}${pct.toFixed(2).replace('.', ',')}%`;
      direccion = pct > 0 ? 'up' : pct < 0 ? 'down' : 'flat';
    }

    return {
      fecha: day.fecha,
      dayLabel: this.dayLabel(day.fecha, date),
      dateLabel: this.dateLabel(date),
      precioLabel: `U$S ${formatArDecimal(day.precio)}`,
      variacionLabel,
      direccion,
    };
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
