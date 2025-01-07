import { Injectable } from '@angular/core';
import { environment } from '../../../environments/dev';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginResponse, Person } from '../../auth/interfaces/auth-response.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private baseUrl: string = `${environment.API_ENDPOINT}/auth`
    private user?: string
    private loggedIn: boolean = false

    constructor(private http: HttpClient) { }

    login(person: Person): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.baseUrl}/login`, person)
            .pipe(
                tap(user => {
                    sessionStorage.setItem('token', user.data.token)
                    this.user = user.data.name
                    this.loggedIn = true
                })
            )
    }

    logout() {
        sessionStorage.removeItem('token');
        this.loggedIn = false
    }

    get isLoggedIn(): boolean {
        // si el usuario recarga el navegador no se deberia salir al login a menos que el token haya expirado
        const token = sessionStorage.getItem('token'); // O sessionStorage
        return !!token; // Devuelve true si hay un token válido
    }

}