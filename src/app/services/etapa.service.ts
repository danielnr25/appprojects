import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Etapa } from '@interfaces/etapa';

@Injectable({
  providedIn: 'root'
})

export class EtapaService {

  urlApi:string = environment.api;
  constructor(private http:HttpClient) { }

  getListEtapa(idproyecto:number):Observable<Etapa[]>{
    const token = localStorage.getItem('token');
    const options = {
      headers:{
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
      }
    }

    return this.http.get<{message:string;data:Etapa[]}>(`${this.urlApi}/etapas?idproyecto=${idproyecto}`,options).pipe(
      map(response =>response.data)
    );
  }

  agregarEtapa(dato:Etapa){
    const token = localStorage.getItem('token');
    const options = {
      headers:{
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
      }
    }
    return this.http.post<{message:string;data:Etapa[]}>(`${this.urlApi}/etapas`,dato,options);
  }

  actualizarEtapa(dato:Etapa){
    const token = localStorage.getItem('token');
    const options = {
      headers:{
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
      }
    }

    return this.http.put<{message:string;data:Etapa[]}>(`${this.urlApi}/etapas/${dato.idetapa}`,dato,options);

  }

  eliminarEtapa(dato:Etapa){
    const token = localStorage.getItem('token');
    const options = {
      headers:{
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
      }
    }

    return this.http.delete<{message:string;data:Etapa[]}>(`${this.urlApi}/etapas/${dato.idetapa}`,options);
  }



}
