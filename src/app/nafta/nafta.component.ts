import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-nafta',
  templateUrl: './nafta.component.html',
  styleUrls: ['./nafta.component.css']
})
export class NaftaComponent implements OnInit {
  nafta: string | undefined;
  isLoading: boolean = true;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    const url = '/nafta-super';
    this.apiService.getData(url).subscribe(
      (data) => {
        this.nafta = data;
       this.isLoading = false; // Marcar como no cargando cuando se obtiene la información
    },
    (error) => {
    console.log('Error al obtener el valor del litro de nafta super:', error);
    this.isLoading = false; // Marcar como no cargando en caso de error también
    }
  );
  }
}