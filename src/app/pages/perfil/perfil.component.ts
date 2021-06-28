import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public profileForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
    ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nombre: [ this.usuario.nombre , Validators.required],
      email: [ this.usuario.email , [Validators.required, Validators.email]]
    });
  }

  actualizarPerfil() {
    this.usuarioService.actualizarUsuario(this.profileForm.value).subscribe(res => {
      const {nombre, email} = this.profileForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;

      Swal.fire('Guardado', 'Datos actualizados', 'success');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    }
    );

  }

  cambiarImagen(file: File){
    this.imagenSubir = file;
    if (!file) {
       return this.imgTemp = null;
      }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  subirImagen(){
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
    .then( img => {
      this.usuario.img = img;

      Swal.fire('Guardado', 'Imagen actualizada', 'success');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

}
