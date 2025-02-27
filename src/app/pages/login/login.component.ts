import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { FormBuilder, FormGroup,FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Login } from '../../interfaces/login';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';


const MATERIAL_MODULES = [MatCardModule,MatInputModule,MatButtonModule,MatIconModule,MatProgressBarModule,MatSnackBarModule]

@Component({
  selector: 'app-login',
  imports: [MATERIAL_MODULES,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  ocultarPassword:boolean = true;
  formularioLogin: FormGroup;
  mostrarLoading: boolean = false;


  private _serviceLogin = inject(LoginService);
  private _snackbar = inject(MatSnackBar);
  private _router = inject(Router);

  constructor(private fb:FormBuilder){
    this.formularioLogin = this.fb.group({
      usuario:['',Validators.required],
      clave:['',Validators.required]
    });
  }

  iniciarSession(){
    this.mostrarLoading = true;

    const request:Login = {
      Usuario: this.formularioLogin.value.usuario,
      Clave : this.formularioLogin.value.clave
    }


    this._serviceLogin.autenticar(request).subscribe({
      next: (data:any)=>{
        //console.log('sessión correcta',data)
        //console.log(data);
        const message = data['message'];
        const response = data['data'];
        const token = data['token']
        const permisos = data['permisos'];
        //console.log(message);
        //console.log(response);
        //console.log(permisos);
        //console.log('token',token);

        localStorage.setItem('token',token);
        localStorage.setItem('idperfil',response.idperfil);
        localStorage.setItem('permisos',JSON.stringify(permisos));
        this._router.navigate(['/admin']);

      },
      error: (data) =>{
        //console.log('Error data:',data);
        this.mostrarLoading = false;
        const titulo = data.status + '-' + data.statusText;
        const message = data.error['message'];

        this._snackbar.open(message,titulo,{
          duration:5000,
          horizontalPosition:'center',
          verticalPosition:'top'
        });

      },
      complete: () =>{
        this.mostrarLoading = false;
        //console.log('Acción completada')
      }
    })

  }

}
