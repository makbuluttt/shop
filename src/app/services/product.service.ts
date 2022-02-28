import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Product } from '../product/product';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';



@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }
  path = "http://localhost:3000/products"

  getProducts(categoryId: any): Observable<Product[]> {

    let newPatch = this.path;
    if (categoryId) {
      newPatch = newPatch + "?categoryId=" + categoryId
    }
    // alert(categoryId)
    return this.http
      .get<Product[]>(newPatch).pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  addProduct(product: Product): Observable<Product> {
    const httpOptions={
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization' : 'Token'
      })
    }
    return this.http.post<Product>(this.path, product,httpOptions).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = ''
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'There is an error' + err.error.message
    } else {
      errorMessage = 'System is not working properly!'
    }
    return throwError(errorMessage);
  }
}
