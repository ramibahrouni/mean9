import { Injectable } from '@angular/core';
import { Observable, of, throwError, from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import { Client } from '../app/Client';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getClients(): Observable<Client[]> {
    // @ts-ignore
    return this.http.get<Client[]>(`${apiUrl}`, httpOptions)
    .pipe(catchError(this.handleError('getClients', []))
    );
  }


  getCLientById(id: String): Observable<Client> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Client>(url).pipe(
      catchError(this.handleError<Client>(`getClientById=${id}`))
    );
  }


  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(apiUrl, client, httpOptions).pipe(
      catchError(this.handleError<Client>('addClient'))
    );
  }

  updateClient(id: string, client: Client): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, client, httpOptions).pipe(
      catchError(this.handleError<any>('updateCLient'))
    );
  }

  deleteClient(id: string): Observable<Client> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Client>(url, httpOptions)
      .pipe(
      catchError(this.handleError<Client>('deleteCLient'))
    );
  }




}
