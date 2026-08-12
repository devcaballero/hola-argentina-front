import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-phillipbox',
  templateUrl: './phillipbox.component.html',
  styleUrls: ['./phillipbox.component.css']
})
export class PhillipboxComponent implements OnInit {
  phillipbox: string | undefined;
  isLoading: boolean = true;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    const url = '/phillipbox';
    this.apiService.getData(url).subscribe(
      (data) => {
        this.phillipbox = data;
        this.isLoading = false; // Marcar como no cargando cuando se obtiene la información
      },
      (error) => {
        console.log('Error al obtener el precio del oro:', error);
        this.isLoading = false; // Marcar como no cargando en caso de error también
      }
    );
  }
}