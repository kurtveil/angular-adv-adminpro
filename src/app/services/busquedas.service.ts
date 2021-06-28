import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

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

  private transformarUsuarios(resultados: any[]): Usuario[] {
    return resultados.map(
      user => new Usuario(user.nombre, user.email,
        '', user.role, user.google, user.img, user.uid)
    );
  }

  private transformarHospitals(resultados: any[]): Hospital[] {
    return resultados;
  }

  private transformarMedicos(resultados: any[]): Medico[]{
    return resultados;
  }

  busquedaGlobal(termino: string){
    const url = `${ BASE_URL }/todo/${termino}`;
    return this.http.get(url, this.headers);
  }

  buscar(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    termino: string
  ){
    const url = `${ BASE_URL }/todo/coleccion/${ tipo }/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((res: any) => {
          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios(res.resultados);

              case 'hospitales':
              return this.transformarHospitals(res.resultados);

              case 'medicos':
                return this.transformarMedicos(res.resultados);
            default:
              return [];
          }
        })
      );
  }

}
