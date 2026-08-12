import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-heineken',
  templateUrl: './heineken.component.html',
  styleUrls: ['./heineken.component.css']
})
export class HeinekenComponent implements OnInit {
  heineken: string | undefined;
  isLoading: boolean = true;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    const url = '/heineken';
    this.apiService.getData(url).subscribe(
      (data) => {
        this.heineken = data;
        this.isLoading = false; // Marcar como no cargando cuando se obtiene la información
      },
      (error) => {
        console.log('Error al obtener el precio de la heineken:', error);
        this.isLoading = false; // Marcar como no cargando en caso de error también
      }
    );
  }
}