import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../auth/interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../auth/interfaces/login-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
const urlBase = environment.base_url;
declare const gapi: any;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {

    this.googleInit();
  }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get uid(): string{
    return this.usuario.uid || '';
  }

  googleInit() {
    return new Promise<void>((resolve) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '986753093743-mkaql0umilaheh4uvk0lgvmdht4iakuj.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    });
  }

  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then( () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  validarToken(): Observable<boolean> {
    return this.http.get(`${urlBase}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((res: any) => {
        const {email, google, img = '', nombre, role, uid} = res.usuario;
        this.usuario = new Usuario( nombre, email, '', role, google, img, uid     );
        localStorage.setItem('token', res.token);
        return true;
      }),

      catchError(() => of(false))
    );
  }

  crearUsuario(formData: RegisterForm): any {

    return this.http.post(`${urlBase}/usuarios`, formData)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
        }),
      );
  }

  actualizarUsuario(data: {email: string, nombre: string, role: string}){
    data = {
      ...data,
      role: this.usuario.role
    };
    return this.http.put(`${urlBase}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });

  }

  login(formData: LoginForm): any {
    return this.http.post(`${urlBase}/login`, formData)
      .pipe(
        tap(
          (res: any) => {
            console.log(res);
            localStorage.setItem('token', res.token);
          })
      );
  }
  loginGoogle(token: any): any {
    return this.http.post(`${urlBase}/login/google`, { token })
      .pipe(
        tap(
          (res: any) => {
            console.log(res);
            localStorage.setItem('token', res.token);
          })
      );
  }
}
