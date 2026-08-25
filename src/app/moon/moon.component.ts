import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  getMoonPhase,
  getNextFullMoon,
  getNextNewMoon,
  formatArDateTime,
  isFullMoonDay,
  MoonMilestone,
  MoonPhaseId,
  MoonPhaseInfo,
} from '../moon-phase';

@Component({
  selector: 'app-moon',
  templateUrl: './moon.component.html',
  styleUrls: ['./moon.component.css'],
})
export class MoonComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('moonBackdrop') moonBackdrop?: ElementRef<HTMLElement>;

  phase: MoonPhaseInfo = getMoonPhase();
  nextFull: MoonMilestone = getNextFullMoon();
  nextNew: MoonMilestone = getNextNewMoon();
  modalOpen = false;
  isFullMoon = false;

  illuminationLabel = '';
  nextFullDateLabel = '';
  nextFullCountdownLabel = '';
  nextNewDateLabel = '';

  private timer: ReturnType<typeof setInterval> | null = null;

  get phaseId(): MoonPhaseId {
    return this.phase.id;
  }

  ngOnInit(): void {
    this.refresh();
    this.timer = setInterval(() => this.refresh(), 3600000);
  }

  ngAfterViewChecked(): void {
    const el = this.moonBackdrop?.nativeElement;
    if (this.modalOpen && el && el.parentElement !== document.body) {
      document.body.appendChild(el);
    }
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
    this.unlockBodyScroll();
    this.moonBackdrop?.nativeElement?.remove();
  }

  openModal(): void {
    this.refresh();
    this.modalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.modalOpen = false;
    this.unlockBodyScroll();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.modalOpen) this.closeModal();
  }

  private unlockBodyScroll(): void {
    document.body.style.overflow = '';
  }

  private refresh(): void {
    const now = new Date();
    this.phase = getMoonPhase(now);
    // Día calendario AR de la luna llena (coincide con almanaques SHN)
    // Solo el día calendario AR del instante de luna llena (no la banda de fase "full").
    this.isFullMoon = isFullMoonDay(now);
    this.nextFull = getNextFullMoon(now);
    this.nextNew = getNextNewMoon(now);
    this.illuminationLabel = `${Math.round(this.phase.illumination * 100)}%`;
    this.nextFullDateLabel = this.formatDateLong(this.nextFull.date);
    this.nextFullCountdownLabel = this.formatCountdown(this.nextFull.daysUntil);
    this.nextNewDateLabel = this.formatDateLong(this.nextNew.date);
  }

  private formatDateLong(date: Date): string {
    const { weekday, day, month, time } = formatArDateTime(date);
    return `${weekday} ${day} de ${month} · ${time}`;
  }

  private formatCountdown(daysUntil: number): string {
    const totalHours = Math.max(0, Math.round(daysUntil * 24));
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;
    if (days <= 0) {
      if (hours <= 1) return 'En menos de 1 hora';
      return `En ${hours} horas`;
    }
    if (days === 1) return hours ? `En 1 día y ${hours} h` : 'En 1 día';
    return hours ? `En ${days} días y ${hours} h` : `En ${days} días`;
  }
}
