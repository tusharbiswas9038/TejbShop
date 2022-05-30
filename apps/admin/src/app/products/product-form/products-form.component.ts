/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {  CategoriesService, Product, ProductsService } from '@tejb/products';
import { timer } from 'rxjs';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tejb-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css'],
})
export class ProductsFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  url:string[];
  imagesUpdate  = false;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  created: boolean = false;
  updated = false;
  editmode = false;
  currentProductId: string;
  categories= [];
  imageDisplay: string | ArrayBuffer;
  imagesDisplay: Array<string> | ArrayBuffer;

  
  name = 'Angular 6';
  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Enter text in this rich text editor....',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    customClasses: [
      {
        name: 'Quote',
        class: 'quoteClass',
      },
      {
        name: 'Title Heading',
        class: 'titleHead',
        tag: 'h1',
      },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories(); 
    this._checkEditMode();
    }
    private _initForm(){
      this.form = this.formBuilder.group({
        name: ['', Validators.required],
        //brand: ['', Validators.required],
        price: ['', Validators.required],
        category: ['', Validators.required],
        countInStock: ['', Validators.required],
        description: ['', Validators.required],
        richDescription: [''],
        image: ['', Validators.required],
        images:[''],
        isFeatured: [false]
      })
    }
    private _getCategories(){
      this.categoriesService.getCategories().subscribe(categories =>{
        this.categories= categories;
      })
    }
    private _addProduct(productData: FormData){
      this.productsService.createProduct(productData).subscribe();
      this.created = true;
      timer(2000)
        .toPromise()
        .then((_done) => {
          this.location.back();
        });
    }
    private _updateProduct(productFormData: FormData){
      this.productsService.updateProduct(productFormData, this.currentProductId).subscribe();
      this.updated = true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      timer(2000)
        .toPromise()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .then((_done) => {
          this.location.back();
        });
    }
    private _updateImages(productFormData: FormData){
      this.productsService.updateimages(productFormData, this.currentProductId).subscribe();
      this.updated = true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      timer(2000)
        .toPromise()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .then((_done) => {
          this.location.back();
        });
    }
    private _checkEditMode() {
      this.route.params.subscribe((params) => {
        if (params.id) {
          this.editmode = true;
          this.currentProductId = params.id;
          this.productsService.getProduct(params.id).subscribe((product) => {
            this.productform.name.setValue(product.name);
            this.productform.category.setValue(product.category.id);
            //this.productform.brand.setValue(product.brand);
            this.productform.price.setValue(product.price);
            this.productform.countInStock.setValue(product.countInStock);
            this.productform.isFeatured.setValue(product.isFeatured);
            this.productform.description.setValue(product.description);
            this.productform.richDescription.setValue(product.richDescription); 
            this.imageDisplay = product.image;
            this.productform.image.setValidators([]);
            this.productform.image.updateValueAndValidity();
          //  this.productform.images.setValue(product.images);
            this.imagesDisplay = product.images;
           // this.url.push(product.images);

            this.productform.images.setValidators([]);
            this.productform.images.updateValueAndValidity();
          });
        }
      });
  
    }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) 
      return;
    const productFormData = new FormData();
    Object.keys(this.productform).map((key)=>{
      productFormData.append(key,this.productform[key].value);
    });
    if(this.editmode){
      if(this.imagesUpdate){
        this._updateImages(productFormData)
      }else{
        this._updateProduct(productFormData)
      }
    }else{
      this._addProduct(productFormData)
    }
    
  }
  onCancel() {
    this.location.back();
  }
  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }
  // onMultipleImageUpload(event) {
  //   const files = event.target.files;
  //   console.log(event);
  //   if (files) { 
  //     for(let i=0; i<=event.target.files.length; i++){
  //     this.form.patchValue({ images: files });
  //     this.form.get('images').updateValueAndValidity();
  //     const fileReader = new FileReader();
  //     fileReader.onload = () => {
  //       this.imagesDisplay[i] = fileReader.result;
  //     };
  //     fileReader.readAsDataURL(files);
  //   }
  // }}
  onMultipleImageUpload(e){
   // console.log(e);
    if(e.target.files){
      for(let i=0; i<e.target.files.length; i++){
        // console.log(e.target.files.length);
               
        this.form.patchValue({ images:e.target.files[i]});
       // console.log(this.url[i]);
        this.form.get('images').updateValueAndValidity();
        const fileReader = new FileReader();
        fileReader.onload = () => {
         // this.url.push(e.target.result);
          //console.log(this.url);
          this.imagesDisplay[i] = fileReader.result;
          
        };
        fileReader.readAsDataURL(e.target.files[i]);
      }
    }  
    this.imagesUpdate=true;
  }

  get productform() {
    return this.form.controls;
  }

}
