import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedRequest, SharedResponse } from '../../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public urlAddress = environment.BACKEND_URL;
  public apiGo = { shared: `${this.urlAddress}/shared` };
  constructor(
    private http: HttpClient
  ) { }
  ngOnInit(): void {

  }
  getAll(): Observable<SharedResponse[]> {
    return this.http.get<SharedResponse[]>(this.apiGo.shared);
  }

  create(shared: SharedRequest): Observable<SharedResponse> {
    return this.http.post<SharedResponse>(this.apiGo.shared, shared);
  }
  update(shared: SharedRequest, id: number): Observable<SharedResponse> {
    return this.http.patch<SharedResponse>(`${this.apiGo.shared}/${id}`, shared);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiGo.shared}/${id}`)
  }

}
