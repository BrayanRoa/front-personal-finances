import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private themeSubject = new BehaviorSubject<string>('saga-blue'); // Tema inicial
    currentTheme = this.themeSubject.asObservable();

    changeTheme(theme: string) {
        this.themeSubject.next(theme);

        // Cambia la clase del tema en el <body>
        const body = document.body;
        body.className = ''; // Elimina clases previas
        body.classList.add(theme); // Añade la nueva clase del tema
    }

}