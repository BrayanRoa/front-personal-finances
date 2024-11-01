import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.dev';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionResponse } from '../interfaces/transaction.interface';
import { CategoryCountResponse } from '../interfaces/category.interface';

@Injectable({ providedIn: 'root' })
export class TransactionsService {

    public baseUrl: string = `${environment.API_ENDPOINT}/transaction`
    // private token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE1MjUyNGVhLWNkNzctNDQxMi05Njg4LWUxODNjYzllOTkyYyIsImlhdCI6MTcyOTgwNTQyMywiZXhwIjoxNzI5ODEyNjIzfQ.BL18Q89fbnA1X39FZps0IrSC3ZsUYUX8Jk9I14Iu-xE';

    constructor(public http: HttpClient) { }

    getTransactions(params: any): Observable<TransactionResponse> {

        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

        // Crear HttpParams desde el objeto params
        const httpParams = new HttpParams({ fromObject: params });
        console.log({httpParams});
        // Pasar HttpParams a http.get()
        return this.http.get<TransactionResponse>(`${this.baseUrl}`, { params: httpParams, headers: headers });
    }
}