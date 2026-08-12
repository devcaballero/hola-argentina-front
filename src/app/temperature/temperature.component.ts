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

type WeatherCondition = 'sunny' | 'partly' | 'cloudy' | 'rainy';

interface ForecastDay {
  date: string;
  weatherCode?: number;
  condition: WeatherCondition;
  label?: string;
  tempMax: number;
  tempMin: number;
  precipProbability: number;
  precipSum: number;
  showPrecip: boolean;
  windMin: number;
  windMax: number;
  windDirection: number;
}

interface WeatherPayload {
  temperature: number | string;
  weatherCode?: number;
  condition?: WeatherCondition;
  label?: string;
  forecast?: ForecastDay[];
}

interface ForecastViewDay extends ForecastDay {
  dayLabel: string;
  dateLabel: string;
  tempMaxLabel: string;
  tempMinLabel: string;
  precipLabel: string;
  windLabel: string;
}

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('forecastBackdrop') forecastBackdrop?: ElementRef<HTMLElement>;

  temperature: string | undefined;
  condition: WeatherCondition = 'cloudy';
  label = 'Nublado';
  isLoading = true;
  forecastOpen = false;
  forecastDays: ForecastViewDay[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getData('/temperatura').subscribe(
      (raw) => {
        this.applyWeather(raw);
        this.isLoading = false;
      },
      (error) => {
        console.log('Error al obtener la temperatura:', error);
        this.isLoading = false;
      }
    );
  }

  ngAfterViewChecked(): void {
    const el = this.forecastBackdrop?.nativeElement;
    // Evita que un padre con transform (animación) atrape position:fixed
    if (this.forecastOpen && el && el.parentElement !== document.body) {
      document.body.appendChild(el);
    }
  }

  ngOnDestroy(): void {
    this.unlockBodyScroll();
    this.forecastBackdrop?.nativeElement?.remove();
  }

  openForecast(): void {
    if (!this.forecastDays.length) return;
    this.forecastOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeForecast(): void {
    this.forecastOpen = false;
    this.unlockBodyScroll();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.forecastOpen) {
      this.closeForecast();
    }
  }

  private unlockBodyScroll(): void {
    document.body.style.overflow = '';
  }

  private applyWeather(raw: string): void {
    const trimmed = (raw || '').trim();
    let payload: WeatherPayload | null = null;

    if (trimmed.startsWith('{')) {
      try {
        payload = JSON.parse(trimmed) as WeatherPayload;
      } catch {
        payload = null;
      }
    }

    const value = Number(payload?.temperature ?? trimmed);
    if (Number.isFinite(value)) {
      this.temperature = value.toFixed(1);
    }

    this.condition = payload?.condition || this.fallbackCondition(value);
    this.label = payload?.label || this.labelFromCondition(this.condition);
    this.forecastDays = (payload?.forecast || []).map((day, index) =>
      this.toForecastView(day, index)
    );
  }

  private toForecastView(day: ForecastDay, index: number): ForecastViewDay {
    const date = new Date(`${day.date}T12:00:00`);
    return {
      ...day,
      condition: day.condition || 'cloudy',
      dayLabel: this.dayLabel(date, index),
      dateLabel: this.dateLabel(date),
      tempMaxLabel: `${Math.round(day.tempMax)}°`,
      tempMinLabel: `${Math.round(day.tempMin)}°`,
      precipLabel: this.precipLabel(day),
      windLabel: `${day.windMin} - ${day.windMax} km/h`,
    };
  }

  private precipLabel(day: ForecastDay): string {
    if (!day.showPrecip) return '';
    const mm = Number(day.precipSum || 0).toFixed(1);
    return `${Math.round(day.precipProbability || 0)}% ${mm} mm`;
  }

  private dayLabel(date: Date, index: number): string {
    if (index === 0) return 'Hoy';
    if (index === 1) return 'Mañana';
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[date.getDay()];
  }

  private dateLabel(date: Date): string {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return `${date.getDate()} ${months[date.getMonth()]}`;
  }

  private labelFromCondition(condition: WeatherCondition): string {
    if (condition === 'sunny') return 'Soleado';
    if (condition === 'partly') return 'Parcialmente nublado';
    if (condition === 'rainy') return 'Lluvia';
    return 'Nublado';
  }

  private fallbackCondition(temp: number): WeatherCondition {
    if (!Number.isFinite(temp)) return 'cloudy';
    return temp >= 22 ? 'sunny' : 'cloudy';
  }
}
