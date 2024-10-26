import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageDashboardComponent } from './pages/main-page-dashboard/main-page-dashboard.component';
import { DashboardControlComponent } from './pages/dashboard-control/dashboard-control.component';

const routes: Routes = [
    {
        path: '',
        component: MainPageDashboardComponent,
        children: [
            {
                path: 'control',
                component: DashboardControlComponent
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    },
    
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [],
    declarations: [],
    providers: [],
})
export class AdministrationRoutingModule { }
