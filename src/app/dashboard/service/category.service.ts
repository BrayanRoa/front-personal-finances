import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryCountResponse } from '../interfaces/category.interface';
import { environment } from '../../../environments/environment.dev';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {
    public baseUrl: string = `${environment.API_ENDPOINT}/category`

    constructor(public http: HttpClient) { }

    getNumberTransactionsByCategories(walletId: number): Observable<CategoryCountResponse> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

        // const httpParams = new HttpParams({ fromObject: params });
        return this.http.get<CategoryCountResponse>(`${this.baseUrl}/${walletId}/countTransaction`, { headers: headers });
    }

}