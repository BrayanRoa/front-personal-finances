import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginResponse, Person } from '../../auth/interfaces/auth-response.interface';
import { CommonResponse } from '../../shared/interfaces/common-response.interface';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, GithubAuthProvider } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private baseUrl: string = `${environment.API_URL}/auth`
    private user?: string
    private loggedIn: boolean = false

    constructor(private auth: Auth, private http: HttpClient) { }

    async signUpWithGitHub(): Promise<string> {
        try {
            const provider = new GithubAuthProvider();
            const result = await signInWithPopup(this.auth, provider);
            const idToken = await result.user.getIdToken(); // Obtener token de Firebase
            return idToken;
        } catch (error) {
            console.error('Error al iniciar sesión con GitHub:', error);
            throw error;
        }
    }

    async signUpWithGoogle(): Promise<string> {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(this.auth, provider);
            const idToken = await result.user.getIdToken(); // Obtener el token de Firebase
            return idToken; // Retornar el token
        } catch (error) {
            console.error('Error al iniciar sesión con Google:', error);
            throw error;
        }
    }


    registerFirebase(token: string): Observable<CommonResponse> {
        return this.http.get<CommonResponse>(`${this.baseUrl}/register/firebase/${token}`)
    }

    loginWithToken(idToken: string): Observable<any> {
        const headers = new HttpHeaders({ Authorization: `Bearer ${idToken}` });
        return this.http.post<any>(`${this.baseUrl}/login/firebase`, {}, { headers })
            .pipe(
                tap(user => {
                    localStorage.setItem('token', user.data.token)
                    localStorage.setItem('name', user.data.name)
                    localStorage.setItem('email', user.data.email)
                    // this.user = user.data.name
                    this.loggedIn = true
                })
            );
    }

    login(person: Person): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.baseUrl}/login`, person)
            .pipe(
                tap(user => {
                    localStorage.setItem('token', user.data.token)
                    localStorage.setItem('name', user.data.name)
                    localStorage.setItem('email', user.data.email)
                    // this.user = user.data.name
                    this.loggedIn = true
                })
            )
    }

    register(person: Person): Observable<CommonResponse> {
        return this.http.post<CommonResponse>(`${this.baseUrl}/register`, person)
    }

    // envio ese type='' porque en el back reutilizo el mismo servicio para validar el registro del usuario y el cambio de la contraseña
    verifyEmail(userId: string, code: string, type: string) {
        return this.http.get<CommonResponse>(`${this.baseUrl}/validate-email/${userId}/${code}?type=${type}`)
    }

    resentCode(userId: string) {
        return this.http.get<CommonResponse>(`${this.baseUrl}/resend-code/${userId}`)
    }

    //aqui se envia el código para verificar que el usuario es el que esta pidiendo el cambio de contraseña
    passwordRecovery(email: string) {
        return this.http.post<CommonResponse>(`${this.baseUrl}/password-recovery`, { email: email })
    }

    passwordReset(email: string, password: string) {
        return this.http.post<CommonResponse>(`${this.baseUrl}/password-reset`, { email: email, password: password })
    }

    async logout() {
        try {
            await signOut(this.auth);
            localStorage.removeItem('token'); // Eliminar token del localStorage
            localStorage.removeItem('email'); // Eliminar token del localStorage
            localStorage.removeItem('name'); // Eliminar token del localStorage
            console.log('Sesión cerrada correctamente');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    }

    get isLoggedIn(): boolean {
        // si el usuario recarga el navegador no se deberia salir al login a menos que el token haya expirado
        const token = localStorage.getItem('token'); // O sessionStorage
        return !!token; // Devuelve true si hay un token válido
    }
}