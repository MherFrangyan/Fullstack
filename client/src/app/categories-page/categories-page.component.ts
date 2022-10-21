import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../shared/service/category.service";
import {Category} from "../shared/interface";
import {Observable} from "rxjs";

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {
  loader = false;
  categoryList$: Observable<Category[]>;
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.fetchData()
  }


  fetchData() {
   this.categoryList$ = this.categoryService.fetch()
  }

}
