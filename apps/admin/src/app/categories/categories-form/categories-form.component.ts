import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@tejb/products';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tejb-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css'],
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  created: boolean = false;
  updated = false;
  editmode = false;
  currentCategoryId: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: [''],
    });

    this._checkEditMode();
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      id: this.currentCategoryId,
      name: this.categoryform.name.value,
      icon: this.categoryform.icon.value,
    };
    if(this.editmode){
      this._updateCategory(category)
    }else{
      this._addCategory(category)
    }
    
  }
  onCancel() {
    this.location.back();
  }
 
  private _addCategory(category: Category){
    this.categoriesService.createCategory(category).subscribe();
    this.created = true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    timer(2000)
      .toPromise()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((_done) => {
        this.location.back();
      });
  }
  private _updateCategory(category: Category){
    this.categoriesService.updateCategory(category).subscribe();
    this.updated = true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    timer(2000)
      .toPromise()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((_done) => {
        this.location.back();
      });
  }
  private _checkEditMode(){
   this.route.params.subscribe(params=>{
     if(params.id){
        this.editmode=true;
        this.currentCategoryId=params.id;
        this.categoriesService.getCategory(params.id).subscribe(category=>{
         this.categoryform.name.setValue(category.name);
         this.categoryform.icon.setValue(category.icon);
       })
     }
   })
  }
  get categoryform() {
    return this.form.controls;
  }
}
