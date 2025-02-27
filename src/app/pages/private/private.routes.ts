import { Routes } from "@angular/router";
import { PrivateComponent } from "./private.component";
import { TipoProyectoComponent } from "../../components/tipo-proyecto/tipo-proyecto.component";

export const privateRoute: Routes  = [
  {
    path: "",
    component: PrivateComponent,
    children:[
      {
        path: "tipos-de-proyecto",
        component: TipoProyectoComponent
      },
      {
        path: "usuarios",
        component:TipoProyectoComponent
      }
    ]
  }
]

/*
  admin
  admin/tipo-de-proyecto
  admin/usuarios
*/
