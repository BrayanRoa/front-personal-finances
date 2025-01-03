import { Inject, Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private themeChangeSubject = new Subject<void>();
    themeChange$ = this.themeChangeSubject.asObservable();

    change = signal(0)

    constructor(@Inject(DOCUMENT) private document: Document) { }

    // Cambiar tema de PrimeNG y clases de CSS personalizadas
    switchTheme(theme: string) {
        const themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
        const rootElement = this.document.documentElement; // Acceso al <html>

        if (themeLink) {
            // Cambiar tema de PrimeNG
            themeLink.href = `${theme}.css`;
        }

        // Cambiar clases para tus variables personalizadas
        if (theme === 'vela-blue') {
            rootElement.classList.add('dark-mode');
            rootElement.classList.remove('light-mode');
        } else {
            rootElement.classList.add('light-mode');
            rootElement.classList.remove('dark-mode');
        }

        this.change.update(() => Math.random());

        this.themeChangeSubject.next(); // Emitir el cambio de tema
    }

    // Obtener el valor de una variable CSS personalizada
    getStyleVariable(variableName: string): string {
        return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
    }

    colorBorderStyle() {
        return this.getStyleVariable('--gray-600');
    }

    colorTextStyle() {
        return this.getStyleVariable('--color-texto');
    }

    colorLegendStyle() {
        return this.getStyleVariable('--color-texto');
    }

    colorBlueBar() {
        return this.getStyleVariable('--blue-500');
    }

    colorYellowBar() {
        return this.getStyleVariable('--yellow-500');
    }

    colorGreenBar() {
        return this.getStyleVariable('--green-500');
    }

    colorRedBar() {
        return this.getStyleVariable('--red-500');
    }

    colorCyanBar() {
        return this.getStyleVariable('--cyan-500');
    }

    colorPinkBar() {
        return this.getStyleVariable('--pink-500');
    }
}
