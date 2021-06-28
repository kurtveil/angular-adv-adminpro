import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;
  constructor(private usuariosService: UsuarioService,
              private router: Router) {
    this.usuario = usuariosService.usuario;
   }

  ngOnInit(): void {
  }

  logout(){
    this.usuariosService.logout();
  }

  buscar(termino: string){

    if (termino.length === 0){
      return;
    }
    this.router.navigateByUrl(`/dashboard/search/${termino}`);
  }

}
