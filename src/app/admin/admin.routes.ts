import { Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { TipoProyectoComponent } from "./tipo-proyecto/tipo-proyecto.component";
import { authGuard } from "../guards/auth.guard";
import { ProyectoComponent } from "./proyecto/proyecto.component";

export const routes:Routes = [
 {
  path:'',
  component: AdminComponent,
  canActivate:[authGuard],
  children:[
    {
        path:'tipo_proyecto',
        component:TipoProyectoComponent
    },
    {
      path:'proyecto',
      component:ProyectoComponent
    }
  ]
 }
]
