import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Area } from '@interfaces/area';


@Injectable({
  providedIn: 'root'
})


export class AreaService {
  urlApi:string = environment.api;
  constructor(private http:HttpClient) { }

  getListArea(idproyecto:number):Observable<Area[]>{
    const token = localStorage.getItem('token');
    const options = {
      headers:{
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
      }
    }

    return this.http.get<{message:string;data:Area[]}>(`${this.urlApi}/areas?idproyecto=${idproyecto}`,options).pipe(
      map(response =>response.data)
    );
  }

  agregarArea(dato:Area){
    const token = localStorage.getItem('token');
    const options = {
      headers:{
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
      }
    }

    return this.http.post<{message:string;data:Area[]}>(`${this.urlApi}/areas`,dato,options);
  }

  actualizarArea(dato:Area){
    const token = localStorage.getItem('token');
    const options = {
      headers:{
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
      }
    }

    return this.http.put<{message:string;data:Area[]}>(`${this.urlApi}/areas/${dato.idarea}`,dato,options);
  }

  eliminarArea(dato:Area){
    const token = localStorage.getItem('token');
    const options = {
      headers:{
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
      }
    }
    return this.http.delete<{message:string;data:Area[]}>(`${this.urlApi}/areas/${dato.idarea}`,options);
  }


}
