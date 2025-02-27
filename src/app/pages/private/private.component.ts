import { Component, inject } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { RouterModule,RouterOutlet } from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { map,shareReplay } from 'rxjs/operators';

const MATERIAL_MODULES = [MatSidenavModule,MatIconModule,MatButtonModule,MatToolbarModule,MatListModule]

@Component({
  selector: 'app-private',
  imports: [MATERIAL_MODULES,RouterModule,RouterOutlet,AsyncPipe],
  templateUrl: './private.component.html',
  styleUrl: './private.component.css'
})

export class PrivateComponent {
  private _breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches),shareReplay());

}
