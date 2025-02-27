import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
  /* {
    path:'',
    loadChildren: () => import('./pages/private/private.routes').then(m=>m.privateRoute)
  } */

  {
    path:'',
    redirectTo:'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path : 'admin',
    //component: AdminComponent
    loadChildren: () => import('./admin/admin.routes').then(a=>a.routes)
  }


];
