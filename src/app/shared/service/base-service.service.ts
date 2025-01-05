import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/dev';

@Injectable({ providedIn: 'root' })
export class BaseService {
    baseUrl: string = `${environment.API_ENDPOINT}`;

    constructor() { }

    // Método para obtener headers
    getHeaders() {
        return new HttpHeaders()
            .set('Content-Type', 'application/json'); // No necesitas manejar el token aquí
    }

    // Método para construir parámetros de URL
    buildParams(params: { [key: string]: any }): HttpParams {
        let httpParams = new HttpParams();
        Object.keys(params).forEach(key => {
            if (params[key] !== undefined && params[key] !== null) {
                httpParams = httpParams.set(key, params[key].toString());
            }
        });
        return httpParams;
    }

    
}
