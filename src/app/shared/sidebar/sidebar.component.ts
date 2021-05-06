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

  public menuItems: any[];
  public imgUrl = '';
  public usuario: Usuario;
  constructor(
    private sidebarService: SidebarService,
    private usuariosService: UsuarioService
  ) {
    this.menuItems = sidebarService.menu;
    console.log(this.menuItems);
    this.usuario = usuariosService.usuario;

  }


  ngOnInit(): void {
  }

}
