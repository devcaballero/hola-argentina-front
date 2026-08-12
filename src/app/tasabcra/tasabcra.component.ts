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

interface HistorialMonth {
  fecha: string;
  periodo?: string;
  valor: string;
  deltaPp: number | null;
}

interface VariacionPayload {
  porcentaje: number;
  unidad?: string;
  direccion: 'up' | 'down' | 'flat';
}

interface TasaBcraPayload {
  valor?: string;
  codigo?: string;
  nombre?: string;
  meta?: string;
  fecha?: string;
  periodo?: string;
  variacion?: VariacionPayload | null;
  historial?: HistorialMonth[];
}

interface HistorialViewMonth {
  periodo: string;
  valorLabel: string;
  deltaLabel: string;
  direccion: 'up' | 'down' | 'flat';
}

@Component({
  selector: 'app-tasabcra',
  templateUrl: './tasabcra.component.html',
  styleUrls: ['./tasabcra.component.css'],
})
export class TasabcraComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('historyBackdrop') historyBackdrop?: ElementRef<HTMLElement>;

  valor: string | undefined;
  nombre = 'Tasa BCRA';
  meta = 'TNA';
  isLoading = true;
  variacionLabel = '';
  variacionDir: 'up' | 'down' | 'flat' | null = null;
  historial: HistorialViewMonth[] = [];
  historyOpen = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getData('/tasa-bcra').subscribe(
      (raw) => {
        this.applyPayload(raw);
        this.isLoading = false;
      },
      (error) => {
        console.log('Error al obtener la tasa BCRA:', error);
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
      const data = JSON.parse(raw) as TasaBcraPayload;
      this.valor = data.valor;
      this.nombre = data.nombre || this.nombre;
      this.meta = data.meta || this.meta;
      this.applyVariacion(data.variacion);
      this.historial = (data.historial || []).map((month) => this.toHistorialView(month));
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
    const unit = variacion.unidad === 'pp' ? ' pp' : '%';
    this.variacionLabel = `${sign}${pct.toFixed(2).replace('.', ',')}${unit}`;
    this.variacionDir = variacion.direccion || (pct > 0 ? 'up' : pct < 0 ? 'down' : 'flat');
  }

  private toHistorialView(month: HistorialMonth): HistorialViewMonth {
    const delta = month.deltaPp;
    let direccion: 'up' | 'down' | 'flat' = 'flat';
    let deltaLabel = '—';

    if (delta != null && Number.isFinite(delta)) {
      const sign = delta > 0 ? '+' : '';
      deltaLabel = `${sign}${delta.toFixed(2).replace('.', ',')} pp`;
      direccion = delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat';
    }

    return {
      periodo: month.periodo || month.fecha,
      valorLabel: `${month.valor}%`,
      deltaLabel,
      direccion,
    };
  }
}
