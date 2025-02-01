import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginResponse, Person } from '../../auth/interfaces/auth-response.interface';
import { CommonResponse } from '../../shared/interfaces/common-response.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private baseUrl: string = `${environment.API_URL}/auth`
    private user?: string
    private loggedIn: boolean = false

    constructor(private http: HttpClient) { }

    login(person: Person): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.baseUrl}/login`, person)
            .pipe(
                tap(user => {
                    localStorage.setItem('token', user.data.token)
                    this.user = user.data.name
                    this.loggedIn = true
                })
            )
    }

    register(person: Person): Observable<CommonResponse> {
        return this.http.post<CommonResponse>(`${this.baseUrl}/register`, person)
    }

    verifyEmail(userId: string, code: string) {
        return this.http.get<CommonResponse>(`${this.baseUrl}/validate-email/${userId}/${code}`)
    }

    resentCode(userId: string) {
        return this.http.get<CommonResponse>(`${this.baseUrl}/resend-code/${userId}`)
    }

    logout() {
        localStorage.removeItem('token');
        this.loggedIn = false
    }

    get isLoggedIn(): boolean {
        // si el usuario recarga el navegador no se deberia salir al login a menos que el token haya expirado
        const token = localStorage.getItem('token'); // O sessionStorage
        return !!token; // Devuelve true si hay un token válido
    }

}