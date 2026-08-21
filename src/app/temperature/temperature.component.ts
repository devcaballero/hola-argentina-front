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

type WeatherCondition = 'sunny' | 'clearnight' | 'partly' | 'cloudy' | 'rainy';

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
  sunrise?: string | null;
  sunset?: string | null;
  humidity?: number | null;
}

interface WeatherPayload {
  temperature: number | string;
  weatherCode?: number;
  condition?: WeatherCondition;
  label?: string;
  isDay?: boolean | null;
  sunrise?: string | null;
  sunset?: string | null;
  humidity?: number | null;
  forecast?: ForecastDay[];
}

interface ForecastViewDay extends ForecastDay {
  dayLabel: string;
  dateLabel: string;
  tempMaxLabel: string;
  tempMinLabel: string;
  precipLabel: string;
  windLabel: string;
  windDirLabel: string;
  windSpeedLabel: string;
  humidityLabel: string;
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
  labelLines: string[] = ['Nublado'];
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

    const rawCondition = payload?.condition || this.fallbackCondition(value);
    this.condition = this.resolveHeroCondition(
      rawCondition,
      payload?.isDay,
      payload?.sunrise,
      payload?.sunset
    );
    this.labelLines = this.labelLinesFromCondition(this.condition);
    this.label = this.labelLines.join(' ');
    this.forecastDays = (payload?.forecast || []).map((day, index) =>
      this.toForecastView(day, index)
    );
  }

  /** Clear sky after sunset should read as night, not "Soleado". */
  private resolveHeroCondition(
    condition: WeatherCondition,
    isDay: boolean | null | undefined,
    sunrise?: string | null,
    sunset?: string | null
  ): WeatherCondition {
    if (condition === 'clearnight') return 'clearnight';
    if (condition !== 'sunny') return condition;

    let day = typeof isDay === 'boolean' ? isDay : null;
    if (day === null) {
      day = this.isDaytimeBuenosAires(sunrise, sunset);
    }
    return day === false ? 'clearnight' : 'sunny';
  }

  private isDaytimeBuenosAires(
    sunrise?: string | null,
    sunset?: string | null
  ): boolean | null {
    const now = this.baClockMinutes();
    const rise = this.clockToMinutes(sunrise);
    const set = this.clockToMinutes(sunset);
    if (now == null || rise == null || set == null) return null;
    return now >= rise && now < set;
  }

  private baClockMinutes(date = new Date()): number | null {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'America/Argentina/Buenos_Aires',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(date);
    const hour = Number(parts.find((p) => p.type === 'hour')?.value);
    const minute = Number(parts.find((p) => p.type === 'minute')?.value);
    if (!Number.isFinite(hour) || !Number.isFinite(minute)) return null;
    return hour * 60 + minute;
  }

  private clockToMinutes(hhmm?: string | null): number | null {
    const m = String(hhmm || '').match(/^(\d{1,2}):(\d{2})$/);
    if (!m) return null;
    return Number(m[1]) * 60 + Number(m[2]);
  }

  private toForecastView(day: ForecastDay, index: number): ForecastViewDay {
    const date = new Date(`${day.date}T12:00:00`);
    return {
      ...day,
      sunrise: day.sunrise || null,
      sunset: day.sunset || null,
      condition: day.condition || 'cloudy',
      dayLabel: this.dayLabel(date, index),
      dateLabel: this.dateLabel(date),
      tempMaxLabel: `${Math.round(day.tempMax)}°`,
      tempMinLabel: `${Math.round(day.tempMin)}°`,
      precipLabel: this.precipLabel(day),
      windDirLabel: this.windCardinal(day.windDirection),
      windSpeedLabel: `${day.windMin} - ${day.windMax} km/h`,
      windLabel: this.windLabel(day),
      humidityLabel:
        day.humidity != null && Number.isFinite(Number(day.humidity))
          ? `${Math.round(Number(day.humidity))}%`
          : '',
    };
  }

  private precipLabel(day: ForecastDay): string {
    if (!day.showPrecip) return '';
    const mm = Number(day.precipSum || 0).toFixed(1);
    return `${Math.round(day.precipProbability || 0)}% ${mm} mm`;
  }

  private windLabel(day: ForecastDay): string {
    const dir = this.windCardinal(day.windDirection);
    const speed = `${day.windMin} - ${day.windMax} km/h`;
    return dir ? `${dir} ${speed}` : speed;
  }

  /** Dirección meteorológica (de dónde viene), abreviaturas en español. */
  private windCardinal(degrees: number): string {
    if (!Number.isFinite(degrees)) return '';
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
    const normalized = ((degrees % 360) + 360) % 360;
    const index = Math.round(normalized / 45) % 8;
    return dirs[index];
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

  /** Short lines that fit the narrow hero tile (full text stays in forecast modal). */
  private labelLinesFromCondition(condition: WeatherCondition): string[] {
    if (condition === 'sunny') return ['Soleado'];
    if (condition === 'clearnight') return ['Despejado'];
    if (condition === 'partly') return ['Parc.', 'nublado'];
    if (condition === 'rainy') return ['Lluvia'];
    return ['Nublado'];
  }

  private fallbackCondition(temp: number): WeatherCondition {
    if (!Number.isFinite(temp)) return 'cloudy';
    return temp >= 22 ? 'sunny' : 'cloudy';
  }
}
