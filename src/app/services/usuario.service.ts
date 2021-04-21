import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../auth/interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../auth/interfaces/login-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
const urlBase = environment.base_url;
declare const gapi: any;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {

    this.googleInit();
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
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${urlBase}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      }),
      map(res => true),
      catchError(error => of(false))
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
