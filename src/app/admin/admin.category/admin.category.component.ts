import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryResponce } from 'src/app/options/interfaces/interface';
import { CategoryService } from 'src/app/options/services/category/category.service';

import { Storage, deleteObject, getDownloadURL, percentage, ref, uploadBytesResumable } from '@angular/fire/storage';

@Component({
  selector: 'app-admin.category',
  templateUrl: './admin.category.component.html',
  styleUrls: ['./admin.category.component.scss']
})
export class AdminCategoryComponent {
  public allCategories:Array<CategoryResponce> = [];
  public editStatus = false;
  public lockMenu = false;
  public statusLoad = false;
  public categoryId = 0;
  public progressPercent = 0;


  public categoryForm!: FormGroup
  constructor(
    private formBuild:FormBuilder,
    private categoryService:CategoryService,
    private storage : Storage
  ){}

  ngOnInit(): void {
    this.getAllCategories();
    this.initFormBuild();
  }
  initFormBuild():void {
    this.categoryForm = this.formBuild.group({
      name : [null,Validators.required],
      path : [null,Validators.required],
      imagePath : ['',Validators.required]
    })
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
  getAllCategories():void{
    this.categoryService.getAll().subscribe( data => {
      this.allCategories = data;
      console.log(this.allCategories);
      
    })
  }
  addCategory(): void {
    if (this.editStatus) {
      this.categoryService.edit(this.categoryForm.value, this.categoryId).subscribe(() => {
        this.getAllCategories();
      })
    } else {
      this.categoryService.create(this.categoryForm.value).subscribe(() => {
        this.getAllCategories();
      })
    }
    this.editStatus = false;
    this.lockMenu = false;
    this.categoryForm.reset();
  }

  editCategories(categoty: CategoryResponce): void {
   this.categoryForm.patchValue({
    name : categoty.name,
    path : categoty.path,
    imagePath :  categoty.imagePath
   });
    this.editStatus = true;
    this.lockMenu = true;
    this.categoryId = categoty.id;
  }

  deleteCategories(category: CategoryResponce): void {
    this.categoryService.delete(category.id).subscribe(() => {
      this.getAllCategories();
    })
  }

  upload(event: any): void {

    const file = event.target.files[0];
    this.upLoadFile('images', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({
          imagePath: data
        });
        this.statusLoad = true;
      })
      .catch(err => console.log(err))


  }

  async upLoadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if (file) {
      try {
        const providerRef = ref(this.storage, path);
        const task = uploadBytesResumable(providerRef, file);
        percentage(task).subscribe(data => {
          this.progressPercent = data.progress;
        });
        await task;
        url = await getDownloadURL(providerRef);
      }
      catch (error: any) {
        console.error(error);
      }
    }
    else {
      console.log('wrong format');

    }
    return Promise.resolve(url);
  }

  deletedImage(): void {
    const task = ref(this.storage, this.valueByControl('imagePath'));
    deleteObject(task)
      .then(() => {
        console.log('file deleted');
        this.progressPercent = 0;
        this.categoryForm.patchValue({
          imagePath : ''
        })
        this.statusLoad = false;
      })
  }
  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }
}
