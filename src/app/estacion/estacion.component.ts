import { Component, OnDestroy, OnInit } from '@angular/core';
import { getNextEstacion, NextEstacionInfo } from '../estaciones-ar';

@Component({
  selector: 'app-estacion',
  templateUrl: './estacion.component.html',
  styleUrls: ['./estacion.component.css'],
})
export class EstacionComponent implements OnInit, OnDestroy {
  next: NextEstacionInfo | null = null;
  seasonLabel = '—';
  daysLabel = '—';

  private timer: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.refresh();
    this.timer = setInterval(() => this.refresh(), 3600000);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  private refresh(): void {
    this.next = getNextEstacion();
    if (!this.next) {
      this.seasonLabel = '—';
      this.daysLabel = '—';
      return;
    }
    this.seasonLabel = `${this.next.season.name.toUpperCase()} EN`;
    this.daysLabel =
      this.next.daysUntil <= 0 ? 'HOY' : `${this.next.daysUntil}D`;
  }
}
