import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;
  constructor(private usuariosService: UsuarioService) {
    this.usuario = usuariosService.usuario;
   }

  ngOnInit(): void {
  }

  logout(){
    this.usuariosService.logout();
  }

}
