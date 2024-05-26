import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  categories: any[] = [];
  constructor(private _CategoriesService: CategoriesService) {}
  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
        console.log(this.categories);
      },
    });
  }

}
