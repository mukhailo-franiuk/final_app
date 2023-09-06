import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedResponse } from 'src/app/options/interfaces/interface';
import { SharedService } from 'src/app/options/services/shared/shared.service';
import { Storage, deleteObject, getDownloadURL, percentage, ref, uploadBytesResumable } from '@angular/fire/storage';

@Component({
  selector: 'app-admin.shared',
  templateUrl: './admin.shared.component.html',
  styleUrls: ['./admin.shared.component.scss']
})
export class AdminSharedComponent {
  public dataSet!: string
  public statusLoad = false;
  public lockMenu = false;
  public editStatus = false;
  public sharedId = 0;
  public isUploaded = false;
  public dateCreateShared!: string;
  public adminShared: Array<SharedResponse> = [];
  public date!: string;
  public urlMy!:string

  public sharedForm!: FormGroup;
  public progresPercent!: number;


  constructor(
    private formBuild: FormBuilder,
    private sharedServices: SharedService,
    private storage: Storage

  ) { }
  ngOnInit(): void {
    this.initFormShared();
    this.getAll();
  }

  initFormShared(): void {
    this.sharedForm = this.formBuild.group({
      date: new Date(),
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: ['', Validators.required]
    })
  }
  showMenu(e: any): void {
    if (e.target.name === 'active') {
      this.lockMenu = false;
      this.statusLoad = true;
      e.target.name = '';
    } else {
      this.lockMenu = true;
      this.statusLoad = false;
      e.target.name = 'active';
    }
  }

  getAll(): void {
    this.sharedServices.getAll().subscribe(data => {
      this.adminShared = data;
    })
  }

  addCategory(): void {

    if (this.editStatus) {
      this.sharedServices.update(this.sharedForm.value, this.sharedId).subscribe(() => {
        this.getAll();
      })
    } else {
      this.sharedServices.create(this.sharedForm.value).subscribe(() => {
        this.getAll();
        console.log(this.urlMy);
        
      })
    }
    this.lockMenu = false;
    this.editStatus = false;
    this.sharedForm.reset();
  }

  editShared(shared: SharedResponse): void {
    this.sharedForm.patchValue({
      name: shared.name,
      title: shared.title,
      description: shared.description,
      imagePath: shared.imagePath
    });
    this.editStatus = true;
    this.lockMenu = true;
    this.sharedId = shared.id;
  }

  deleteShared(shared: SharedResponse): void {
    this.sharedServices.delete(shared.id).subscribe(() => {
      this.getAll();
    })
  }

  upload(event: any): void {

    const file = event.target.files[0];
    this.upLoadFile('images', file.name, file)
      .then(data => {
        this.sharedForm.patchValue({
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
          this.progresPercent = data.progress;
        });
        await task;
        url = await getDownloadURL(providerRef);
        this.urlMy = url;
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
        this.progresPercent = 0;
        this.sharedForm.patchValue({
          imagePath: ''
        })
        this.statusLoad = false;
      })
  }
  valueByControl(control: string): string {
    return this.sharedForm.get(control)?.value;
  }
}

