/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@tejb/products';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

categories: Category [] =[];
constructor(private categoriesService: CategoriesService,
  private router:Router){}

ngOnInit():void{
  this._getcategories()
}
deleteCategory(categoryId:string){
  this.categoriesService.deleteCategory(categoryId).subscribe(()=>
  this. _getcategories()
  )

};
updateCategory(categoryId:string){
  this.router.navigateByUrl(`categories/form/${categoryId}`)
};

private _getcategories(): void{
  this.categoriesService.getCategories().subscribe((cats) =>{
    this.categories=cats;

  });
}
}


