import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryResponce, ProductResponse } from 'src/app/options/interfaces/interface';
import { CategoryService } from 'src/app/options/services/category/category.service';
import { ImageService } from 'src/app/options/services/image/image.service';
import { ProductsService } from 'src/app/options/services/products/products.service';

@Component({
  selector: 'app-admin.products',
  templateUrl: './admin.products.component.html',
  styleUrls: ['./admin.products.component.scss']
})
export class AdminProductsComponent {

public adminCategories:Array<CategoryResponce> = [];
public adminProducts:Array<ProductResponse> = [];
public lockMenu = false;
public statusLoad = false;
public productForm!:FormGroup;

public editStatus = false;
public uploadPercent = 0;
public isUploaded = false;
public isOpen = false;
private currentCategoryId = 0;
private currentProductId = 0;

constructor(
  private categoryService:CategoryService,
  private productService:ProductsService,
  private formBuuilder:FormBuilder,
  private imageService:ImageService
){}
ngOnInit(): void {
  this.initFormProduct();
  this.loadCategory();
  this.loadProducts();
}

  showMenu(e: any): void { 
    if (e.target.name === 'active') {
      this.lockMenu = false;
    
      e.target.name = '';
    } else {
      this.lockMenu = true;
    
      e.target.name = 'active';
    }
  }
initFormProduct():void{
  this.productForm = this.formBuuilder.group({
    category : [null,Validators.required],
    name : [null,Validators.required],
    path : [null,Validators.required],
    weight : [null,Validators.required],
    ingredients : [null,Validators.required],
    price : [null,Validators.required],
    imagePath : [null]
  })
}
loadCategory():void {
this.categoryService.getAll().subscribe(data => {
  this.adminCategories = data;
  this.productForm.patchValue({
    category: this.adminCategories[0].id
  })
})
}
loadProducts():void{
  this.productService.getAll().subscribe(data =>{
    this.adminProducts = data;
    this.productForm.reset();
  })
}
  addCategory():void {
    if(this.editStatus){
      this.productService.edit(this.productForm.value, this.currentProductId).subscribe(() => {
        this.loadProducts();
        this.isOpen = false;
        this.editStatus = false;
      })
    } else {
      this.productService.create(this.productForm.value).subscribe(() => {
        this.loadProducts();
        this.isOpen = false;
        this.editStatus = false;
      })
    }
  }

  editProduct(product: ProductResponse): void {
    this.productForm.patchValue({
      category: product.category,
      name: product.name,
      path: product.path,
      ingredients: product.ingredients,
      weight: product.weight,
      price: product.price,
      imagePath: product.imagePath
    });
    this.isOpen = true;
    this.isUploaded = true;
    this.editStatus = true;
    this.currentProductId = product.id;
  }

  deleteProduct(product: ProductResponse): void {
    this.productService.delete(product.id).subscribe(() => {
      this.loadProducts();
    })
  }

  upload(event:any):void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }
  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.productForm.patchValue({ imagePath: null });
      })
      .catch(err => {
        console.log(err);
      })
  }

  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }
}
