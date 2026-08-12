import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

interface InflacionPayload {
  valor?: string;
  periodo?: string;
}

@Component({
  selector: 'app-inflacionanual',
  templateUrl: './inflacionanual.component.html',
  styleUrls: ['./inflacionanual.component.css']
})
export class InflacionanualComponent implements OnInit {
  inflacionanualizada: string | undefined;
  periodo: string | undefined;
  isLoading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getData('/inflacion-anualizada').subscribe(
      (raw) => {
        this.applyPayload(raw);
        this.isLoading = false;
      },
      (error) => {
        console.log('Error al obtener los datos de la inflacion anual:', error);
        this.isLoading = false;
      }
    );
  }

  private applyPayload(raw: string): void {
    try {
      const data = JSON.parse(raw) as InflacionPayload;
      this.inflacionanualizada = data.valor ?? raw;
      this.periodo = data.periodo || undefined;
    } catch {
      this.inflacionanualizada = raw;
    }
  }
}
