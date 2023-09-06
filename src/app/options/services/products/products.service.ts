import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductRequest, ProductResponse } from '../../interfaces/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public urlAddress = environment.BACKEND_URL;
  public startApi = { product: `${this.urlAddress}/product` };
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(this.startApi.product);
  }
  create(product: ProductRequest): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(this.startApi.product, product);
  }
  edit(product: ProductRequest, id: number): Observable<ProductResponse> {
    return this.http.patch<ProductResponse>(`${this.startApi.product}/${id}`, product);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.startApi.product}/${id}`)
  }
}
