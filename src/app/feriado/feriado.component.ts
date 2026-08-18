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
  countdownLongLabel,
  countdownShortLabel,
  formatFeriadoDate,
  getNextFeriado,
  getUpcomingFeriados,
  NextFeriadoInfo,
  tipoLabel,
} from '../feriados-ar';

@Component({
  selector: 'app-feriado',
  templateUrl: './feriado.component.html',
  styleUrls: ['./feriado.component.css'],
})
export class FeriadoComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('feriadoBackdrop') feriadoBackdrop?: ElementRef<HTMLElement>;

  next: NextFeriadoInfo | null = null;
  later: NextFeriadoInfo[] = [];
  modalOpen = false;

  shortLabel = '—';
  nextName = '';
  nextDateLabel = '';
  nextCountdownLabel = '';
  nextTipoLabel = '';

  private timer: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.refresh();
    this.timer = setInterval(() => this.refresh(), 3600000);
  }

  ngAfterViewChecked(): void {
    const el = this.feriadoBackdrop?.nativeElement;
    if (this.modalOpen && el && el.parentElement !== document.body) {
      document.body.appendChild(el);
    }
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
    this.unlockBodyScroll();
    this.feriadoBackdrop?.nativeElement?.remove();
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

  dateOf(item: NextFeriadoInfo): string {
    return formatFeriadoDate(item.feriado.date);
  }

  countdownOf(item: NextFeriadoInfo): string {
    return countdownLongLabel(item.daysUntil);
  }

  private unlockBodyScroll(): void {
    document.body.style.overflow = '';
  }

  private refresh(): void {
    const now = new Date();
    this.next = getNextFeriado(now);
    this.later = getUpcomingFeriados(now, 4).slice(1);

    if (!this.next) {
      this.shortLabel = '—';
      this.nextName = 'Sin feriados cargados';
      this.nextDateLabel = '';
      this.nextCountdownLabel = '';
      this.nextTipoLabel = '';
      return;
    }

    this.shortLabel = countdownShortLabel(this.next.daysUntil);
    this.nextName = this.next.feriado.name;
    this.nextDateLabel = formatFeriadoDate(this.next.feriado.date);
    this.nextCountdownLabel = countdownLongLabel(this.next.daysUntil);
    this.nextTipoLabel = tipoLabel(this.next.feriado.tipo);
  }
}
