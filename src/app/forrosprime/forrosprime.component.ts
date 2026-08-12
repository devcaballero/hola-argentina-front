import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-forrosprime',
  templateUrl: './forrosprime.component.html',
  styleUrls: ['./forrosprime.component.css']
})
export class ForrosprimeComponent implements OnInit {
  forros: string | undefined;
  isLoading: boolean = true;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    const url = '/forros-prime';
    this.apiService.getData(url).subscribe(
      (data) => {
        this.forros = data;
        this.isLoading = false; // Marcar como no cargando cuando se obtiene la información
      },
      (error) => {
        console.log('Error al obtener el precio de prime:', error);
        this.isLoading = false; // Marcar como no cargando en caso de error también
      }
    );
  }
}
