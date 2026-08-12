import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-pan',
  templateUrl: './pan.component.html',
  styleUrls: ['./pan.component.css']
})
export class PanComponent implements OnInit {
  pan: string | undefined;
  isLoading: boolean = true;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    const url = '/promedio-precio-pan';
    this.apiService.getData(url).subscribe(
      (data) => {
        this.pan = data;
        this.isLoading = false; // Marcar como no cargando cuando se obtiene la información
      },
      (error) => {
        console.log('Error al obtener el precio del oro:', error);
        this.isLoading = false; // Marcar como no cargando en caso de error también
      }
    );
  }
}