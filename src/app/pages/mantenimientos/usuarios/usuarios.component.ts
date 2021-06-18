import { Component, OnInit, OnDestroy } from '@angular/core';

import { Usuario } from '../../../models/usuario.model';

import Swal from 'sweetalert2';

import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imgSubs: Subscription;
  constructor(
    private usuariosServices: UsuarioService,
    private busquedaService: BusquedasService,
    private modalImagenService: ModalImagenService
    ) {

    }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.newImage
    .pipe(delay(100))
    .subscribe(img => this.cargarUsuarios());
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuariosServices.cargarUsuarios(this.desde)
    .subscribe(({ total, usuarios }) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false;
    });
  }

  cambiarPagina( valor: number ) {
    this.desde += valor;

    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalUsuarios ){
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar(termino: string){
    if(termino.length === 0){
      return this.usuarios = this.usuariosTemp;
    }
    this.busquedaService.buscar('usuarios', termino).subscribe( res => {
      this.usuarios = res;
    });
  }

  eliminarUsuario(usuario: Usuario){
    if(usuario.uid === this.usuariosServices.uid){
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }

    Swal.fire({
      title: 'Eliminar usuario?',
      text: `Esta a punto de eliminar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuariosServices.eliminarUsuario(usuario).subscribe(
          res => {

            this.cargarUsuarios();
            Swal.fire(
              'Eliminado!',
              `${usuario.nombre} fue eliminado correctamente`,
              'success'
            );
          });
      }
    });
  }

  cambiarRole(usuario: Usuario){
    this.usuariosServices.guardarUsuario(usuario).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  abrirModal(usuario: Usuario){
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }
}
