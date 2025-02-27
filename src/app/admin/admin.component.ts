import { Component, inject } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { Router, RouterModule,RouterOutlet } from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { map,shareReplay } from 'rxjs/operators';

const MATERIAL_MODULES = [MatSidenavModule,MatIconModule,MatButtonModule,MatToolbarModule,MatListModule]

@Component({
  selector: 'app-admin',
  imports: [MATERIAL_MODULES,CommonModule,RouterModule,AsyncPipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  private _breakpointObserver = inject(BreakpointObserver);
  menusPrincipales: any;
  router = inject(Router);



  isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches),shareReplay());


  constructor(){
    let data:any = localStorage.getItem('permisos')?.toString();
    let permisos:[] = JSON.parse(data);
    this.menusPrincipales = permisos.filter((obj:any)=>{
      return obj.idopcion_menu_ref === null;
    })

   // console.log(this.menusPrincipales);

  }

   obtenerSubMenus(id:any):any{
    let dato:any = localStorage.getItem('permisos')?.toString();
    let permisos:[] = JSON.parse(dato);
    return permisos.filter((obj:any)=>{
      return obj.idopcion_menu_ref === id;
    })


   }



  fnLogout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }



}
