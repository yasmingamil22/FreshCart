import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BrandsService } from 'src/app/core/services/brands.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {
  brands: any[] = [];
  pageSize:number=0
  currentPage:number=1
  total:number=0

  constructor(private _BrandsService: BrandsService, private _Router: Router) {}

  ngOnInit(): void {
    this.getAllBrands(1);
  }

  getAllBrands(pageNumber: number) {
    this._BrandsService.getAllBrands(pageNumber).subscribe({
      next: (response) => {
        this.brands = response.data;
        this.pageSize=response.metadata.limit
        this.currentPage=response.metadata.currentPage
        this.total=response.results  
        
      },
    });
  }


  pageChanged(event:any){
    console.log(event)

    this.getAllBrands(event)

  }
}
