import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../shared/service/category.service";
import {Category} from "../shared/interface";

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {
  loader = false;
  categoryList: Category[] = [];
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.fetchData()
  }


  fetchData() {
    this.loader = true;
    this.categoryService.fetch().subscribe(category => {
      console.log(category,'fetchData()');
      this.loader = false;
      this.categoryList = category;
    })
  }

}
