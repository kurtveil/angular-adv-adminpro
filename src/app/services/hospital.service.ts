import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';
const urlBase = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    private http: HttpClient,
  ){}
  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
        headers: {
        'x-token': this.token
      }
    };
  }

  cargarHospitales(){
    const url = `${ urlBase }/hospitales`;
    return this.http.get(url, this.headers)
    .pipe(
      map((res: {ok: boolean, hospitales: Hospital[]}) => res.hospitales)
    );
  }

  crearHospital(nombre: string){
    const url = `${ urlBase }/hospitales`;
    return this.http.post(url, {nombre}, this.headers);
  }

  actualizarHospital(id: string, nombre: string){
    const url = `${ urlBase }/hospitales/${id}`;
    return this.http.put(url, {nombre}, this.headers);
  }

  borrarHospital(id: string){
    const url = `${ urlBase }/hospitales/${id}`;
    return this.http.delete(url, this.headers);
  }

}
