import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { WalletService } from '../../../core/service/wallet.service';
import { ApiResponse } from '../../../shared/interfaces/common-response.interface';
import { BanksInformation } from '../../../shared/interfaces/wallet/wallet.interface';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const walletsData: ResolveFn<ApiResponse<BanksInformation[]>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    return inject(WalletService).getBanksInformation().pipe(
        catchError((error) => {
            console.error('Error en resolver walletsData:', error);
            return of({ status: 500, statusMsg: 'Error fetching data', data: [] }); // Devuelve una respuesta vacía
        })
    );
};
