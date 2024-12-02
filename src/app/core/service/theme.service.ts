import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    private themeChangeSubject = new Subject<void>();
    themeChange$ = this.themeChangeSubject.asObservable();

    constructor(@Inject(DOCUMENT) private document: Document) { }

    switchTheme(theme: string) {
        const themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;

        if (themeLink) {
            themeLink.href = `${theme}.css`; // bundle name
            this.themeChangeSubject.next(); // Emitir el cambio de tema
        }
    }
}