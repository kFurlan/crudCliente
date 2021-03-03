import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CLIENTES } from './mock-clientes';
import { Cliente } from './Cliente';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientesUrl = 'api/clientes';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getClientes():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.clientesUrl)
      .pipe(
        tap(_ => this.log('fetched clientes')),
        catchError(this.handleError<Cliente[]>('getClientes', []))
      );
  }

  getClienteNo404<Data>(id: number): Observable<Cliente> {
    const url = `${this.clientesUrl}/?id=${id}`;
    return this.http.get<Cliente[]>(url)
      .pipe(
        map(clientes => clientes[0]),
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Cliente>(`getCliente id=${id}`))
      );
  }

  getCliente(id: number): Observable<Cliente> {
    const url = `${this.clientesUrl}/${id}`;
    return this.http.get<Cliente>(url).pipe(
      tap(_ => this.log(`fetched cliente id=${id}`)),
      catchError(this.handleError<Cliente>(`getCliente id=${id}`))
    );
  }

  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.clientesUrl, cliente, this.httpOptions).pipe(
      tap((newCliente: Cliente) => this.log(`added cliente w/ id=${newCliente.id}`)),
      catchError(this.handleError<Cliente>('addCliente'))
    );
  }

  deleteCliente(cliente: Cliente | number): Observable<Cliente> {
    const id = typeof cliente === 'number' ? cliente : cliente.id;
    const url = `${this.clientesUrl}/${id}`;
    return this.http.delete<Cliente>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted cliente id=${id}`)),
      catchError(this.handleError<Cliente>('deleteCliente'))
    );
  }

  updateCliente(cliente: Cliente): Observable<any> {
    return this.http.put(this.clientesUrl, cliente, this.httpOptions).pipe(
      tap(_ => this.log(`updated cliente id=${cliente.id}`)),
      catchError(this.handleError<any>('updateCliente'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`ClienteService: ${message}`);
  }
}