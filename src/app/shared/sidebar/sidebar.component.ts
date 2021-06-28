import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SidebarService } from '../../services/sidebar.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public imgUrl = '';
  public usuario: Usuario;
  constructor(
    public sidebarService: SidebarService,
    private usuariosService: UsuarioService
  ) {
    this.usuario = usuariosService.usuario;

  }


  ngOnInit(): void {
  }

}
