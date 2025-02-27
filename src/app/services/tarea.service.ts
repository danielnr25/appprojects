import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Tarea } from '@interfaces/tarea';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})

export class TareaService {
  urlApi:string = environment.api;
  constructor(private http:HttpClient) { }

  getListTarea(idproyecto:number):Observable<Tarea[]>{
    const token = localStorage.getItem('token');
    const options = {
      headers:{
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
      }
    }

    return this.http.get<{message:string;data:Tarea[]}>(`${this.urlApi}/tareas?idproyecto=${idproyecto}`,options).pipe(
      map(response =>response.data)
    );
  }

  agregarTarea(dato:Tarea){
    const token = localStorage.getItem('token');
    const options = {
      headers:{
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
      }
    }
    return this.http.post<{message:string;data:Tarea[]}>(`${this.urlApi}/tareas`,dato,options);
  }

  actualizarTarea(dato:Tarea){
    const token = localStorage.getItem('token');
    const options = {
      headers:{
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
      }
    }
    return this.http.put<{message:string;data:Tarea[]}>(`${this.urlApi}/tareas/${dato.idtarea}`,dato,options);
  }

  eliminarTarea(dato:Tarea){
    const token = localStorage.getItem('token');
    const options = {
      headers:{
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
      }
    }
    return this.http.delete<{message:string;data:Tarea[]}>(`${this.urlApi}/tareas/${dato.idtarea}`,options);
  }

  actualizarTareaEstado(dato:Tarea){
    const token = localStorage.getItem('token');
    const options = {
      headers:{
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
      }
    }
    return this.http.put<{message:string;data:Tarea[]}>(`${this.urlApi}/tareas/estado/${dato.idtarea}`,dato,options);
  }



}
