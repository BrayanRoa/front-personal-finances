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
                    localStorage.setItem('token', user.data.token)
                    this.user = user.data.name
                    this.loggedIn = true
                })
            )
    }

    logout() {
        localStorage.removeItem('token');
        this.loggedIn = false
    }

    get isLoggedIn() {
        return this.loggedIn
    }

}