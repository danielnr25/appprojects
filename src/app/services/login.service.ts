import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Login } from "../interfaces/login";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class LoginService {
  http = inject(HttpClient) // me permite hacer peticiones http a un servidor
  constructor() { }

  autenticar(data:Login):Observable<Login>{
    return this.http.post<Login>('http://127.0.0.1:8000/api/autenticar',data);
  }

  estadoAutenticado(){
    const token = localStorage.getItem('token');
    return token;
  }

}
