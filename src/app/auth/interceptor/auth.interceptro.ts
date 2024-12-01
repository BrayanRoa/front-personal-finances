import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { showModal } from '../../shared/components/sweet-alert-modal/sweet-alert-modal';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');

        // Clonar la solicitud con el token si existe
        const clonedReq = token
            ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
            : req;

        return next.handle(clonedReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    // Muestra el modal de SweetAlert
                    showModal({ title: error.error.statusMsg, text: "invalid token or expired token", icon: "error", confirmButtonText: "Ok" }).then(() => {
                        localStorage.removeItem('token'); // Limpia el token expirado
                        this.router.navigate(['/login']); // Redirige al login
                    });
                }

                // Propaga el error al flujo normal de la aplicación
                return throwError(() => error);
            })
        );
    }
}
