import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';

const urlBase = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal = true;
  public tipo: 'usuarios' | 'medicos' | 'hospitales';
  public id: string;
  public img: string;

  public newImage: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string,
    img: string = 'no-image'
  ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    if (img.includes('https')){
      this.img = img;
    } else {
      this.img = `${urlBase}/uploads/${tipo}/${img}`;
    }
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() { }

}
