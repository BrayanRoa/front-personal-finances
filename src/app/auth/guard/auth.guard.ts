import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    CanMatchFn,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

//No hay necesidad de crear una clase, simplemente definiendo una función flecha y exportándola podemos utilizar sus funcionalidades de guard en el app-routing
export const canActivateGuard: CanActivateFn = ( //Hay que tener en cuenta el tipado CanActiveFn
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const loginService = inject(AuthService)
    const router = inject(Router)
    // return loginService.isLoggedIn ? true : router.createUrlTree(['/login']);
    return true
};

export const canMatchGuard: CanMatchFn = ( //Tipado CanMatchFN
    route: Route,
    segments: UrlSegment[]
) => {
    console.log('CanMatch');
    console.log({ route, segments });

    return true;
};
