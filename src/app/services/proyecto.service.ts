import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Proyecto } from '@interfaces/proyecto';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProyectoService {
  urlApi:string = environment.api;
  constructor(private http:HttpClient) { }

  getListProyecto():Observable<Proyecto[]>{
    const token = localStorage.getItem('token');
    const options = {
      headers:{
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
      }
    }

    return this.http.get<{message:string;data:Proyecto[]}>(`${this.urlApi}/proyectos`,options).pipe(
      map(response =>response.data)
    );
  }

  agregarProyecto(dato:Proyecto){
    const token = localStorage.getItem('token');
    const options = {
      headers:{
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
      }
    }
    return this.http.post<{message:string;data:Proyecto[]}>(`${this.urlApi}/proyectos`,dato,options);
  }

  actualizarProyecto(dato:Proyecto){
    const token = localStorage.getItem('token');
    const options = {
      headers:{
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
      }
    }
    return this.http.put<{message:string;data:Proyecto[]}>(`${this.urlApi}/proyectos/${dato.idproyecto}`,dato,options);
  }

  eliminarProyecto(dato:Proyecto){
    const token = localStorage.getItem('token');
    const options = {
      headers:{
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
      }
    }
    return this.http.delete<{message:string;data:Proyecto[]}>(`${this.urlApi}/proyectos/${dato.idproyecto}`,options);
  }

  obtenerCombosProyecto(idproyecto:number){
    const token = localStorage.getItem('token');
    const options = {
      headers:{
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
      }
    }

    return this.http.get<{message:string;data:Proyecto[]}>(`${this.urlApi}/proyectos/combos/${idproyecto}`,options);
  }

}
