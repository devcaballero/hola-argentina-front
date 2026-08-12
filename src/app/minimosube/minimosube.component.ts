import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-minimosube',
  templateUrl: './minimosube.component.html',
  styleUrls: ['./minimosube.component.css']
})
export class MinimosubeComponent implements OnInit {
  minimosube: string | undefined;
  isLoading: boolean = true;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    const url = '/minimo-sube';
    this.apiService.getData(url).subscribe(
      (data) => {
        this.minimosube = data;
        this.isLoading = false; // Marcar como no cargando cuando se obtiene la información
      },
      (error) => {
        console.log('Error al obtener el valor de la sube:', error);
        this.isLoading = false; // Marcar como no cargando en caso de error también
      }
    );
  }
}