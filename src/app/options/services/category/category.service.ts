import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { CategoryRequest, CategoryResponce } from '../../interfaces/interface';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {
public urlAddress = environment.BACKEND_URL;
public startApi = {categories : `${this.urlAddress}/categories`};
  constructor(
    private http : HttpClient 
  ) { }

  getAll():Observable<CategoryResponce[]>{
    return this.http.get<CategoryResponce[]>(this.startApi.categories);
  }
  create(category : CategoryRequest) : Observable<CategoryResponce>{
    return this.http.post<CategoryResponce>(this.startApi.categories,category);
  }
  edit(category:CategoryRequest,id:number):Observable<CategoryResponce>{
    return this.http.patch<CategoryResponce>(`${this.startApi.categories}/${id}`,category);
  }
  delete(id : number) : Observable<void>{
    return this.http.delete<void>(`${this.startApi.categories}/${id}`)
    }
}
