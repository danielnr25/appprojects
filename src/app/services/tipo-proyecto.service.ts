import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TipoProyecto } from '../interfaces/tipo-proyecto';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoProyectoService {

  urlApi:string = environment.api;

  http = inject(HttpClient) // me permite hacer peticiones http a un servidor
  constructor() { }

  getTipoProyectos():Observable<TipoProyecto[]> {
    const token = localStorage.getItem('token');
    const options = {
      headers:{
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
      }
    }
   /*  return this.http.get<{message:string;data:TipoProyecto[]}>('http://127.0.0.1:8000/api/tipo_proyectos',options).pipe(
      map(response =>response.data)
    ); */
    return this.http.get<{message:string;data:TipoProyecto[]}>(`${this.urlApi}/tipo_proyectos`,options).pipe(
      map(response =>response.data)
    );
  }

  agregarTipoProyecto(dato:TipoProyecto){
    const token = localStorage.getItem('token');
    const options = {
      headers:{
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
      }
    }

    return this.http.post<{message:string;data:TipoProyecto[]}>(`${this.urlApi}/tipo_proyectos`,dato,options).pipe(
      map(response =>response.data)
    );

  }

  actualizarTipoProyecto(dato:TipoProyecto){
    const token = localStorage.getItem('token');
    const options = {
      headers:{
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
      }
    }
    return this.http.put<{message:string;data:TipoProyecto[]}>(`${this.urlApi}/tipo_proyectos/${dato.idtipo_proyecto}`,dato,options).pipe(
      map(response =>response.data)
    );
  }

  eliminarTipoProyecto(dato:TipoProyecto){
    const token = localStorage.getItem('token');
    const options = {
        headers:{
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }

   return this.http.delete<{message:string;data:TipoProyecto[]}>(`${this.urlApi}/tipo_proyectos/${dato.idtipo_proyecto}`,options);
}


}
