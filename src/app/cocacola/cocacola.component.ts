import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-cocacola',
  templateUrl: './cocacola.component.html',
  styleUrls: ['./cocacola.component.css']
})
export class CocacolaComponent implements OnInit {
  cocacola: string | undefined;
  isLoading: boolean = true;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    const url = '/cocacola';
    this.apiService.getData(url).subscribe(
      (data) => {
        this.cocacola = data;
        this.isLoading = false; 
      },
      (error) => {
        console.log('Error al obtener el precio de la coca de litro y medio:', error);
        this.isLoading = false; 
      }
    );
  }
}