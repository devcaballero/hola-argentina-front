import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-asado',
  templateUrl: './asado.component.html',
  styleUrls: ['./asado.component.css']
})

export class AsadoComponent implements OnInit {


  asado: string | undefined;
  isLoading: boolean = true;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    const url = '/promedio-precio-asado';
    this.apiService.getData(url).subscribe(
      (data) => {
        this.asado = data;
        this.isLoading = false; 
      },
      (error) => {
        console.log('Error al obtener el precio del bigmac:', error);
        this.isLoading = false; 
      }
    );
  }
}