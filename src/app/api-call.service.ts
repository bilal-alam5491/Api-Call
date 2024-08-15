import { Injectable } from '@angular/core';
import { map, Observable, catchError, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IDisplay } from './display/displayInterface';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  constructor(private _http: HttpClient) {}

  getData(): Observable<IDisplay[]> {
    return this._http
      .get<IDisplay[]>('https://fakestoreapi.com/products')
      .pipe(
        map((res: IDisplay[]) => {
          return res;
        }),
        catchError((err) => {
          console.error('Error fetching data:', err);
          return throwError(() => err); 
        })
      );
  }
}
