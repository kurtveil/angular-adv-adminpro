import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Medico } from '../models/medico.model';
import { environment } from 'src/environments/environment';
const urlBase = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(
    private http: HttpClient,
  ) { }

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

  cargarMedicos(){
    const url = `${ urlBase }/medicos`;
    return this.http.get(url, this.headers)
    .pipe(
      map((res: {ok: boolean, medicos: Medico[]}) => res.medicos)
    );
  }

  crearMedico(medico: {nombre: string, hospital: string}){
    const url = `${ urlBase }/medicos`;
    return this.http.post(url, medico, this.headers);
  }

  actualizarMedico(medico: Medico){
    const url = `${ urlBase }/medicos/${medico._id}`;
    return this.http.put(url, medico, this.headers);
  }

  borrarMedico(id: string){
    const url = `${ urlBase }/medicos/${id}`;
    return this.http.delete(url, this.headers);
  }

  obtenerMedicoPorId(id: string){
    const url = `${ urlBase }/medicos/${id}`;
    return this.http.get(url, this.headers)
    .pipe(
      map((res: {ok: boolean, medico: Medico}) => res.medico)
    );
  }
}
