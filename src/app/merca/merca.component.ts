import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-merca',
  templateUrl: './merca.component.html',
  styleUrls: ['./merca.component.css']
})
export class MercaComponent implements OnInit {
  fernet: string | undefined;
  isLoading: boolean = true;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    const url = '/fernet';
    this.apiService.getData(url).subscribe(
      (data) => {
        this.fernet = data;
        this.isLoading = false; // Marcar como no cargando cuando se obtiene la información
      },
      (error) => {
      console.log('Error al obtener el precio del fernet:', error);
      this.isLoading = false; // Marcar como no cargando en caso de error también
      }
    );
  }
}