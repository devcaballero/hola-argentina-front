import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-flores',
  templateUrl: './flores.component.html',
  styleUrls: ['./flores.component.css']
})
export class FloresComponent implements OnInit {
  johnnyred: string | undefined;
  isLoading: boolean = true;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    const url = '/johnny-red';
    this.apiService.getData(url).subscribe(
      (data) => {
        this.johnnyred = data.replace(",", "");
        this.isLoading = false; 
      },
      (error) => {
        console.log('Error al obtener el precio de johnny red 750ml:', error);
        this.isLoading = false; 
      }
    );
  }
}