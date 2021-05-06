import { environment } from 'src/environments/environment';

const BASE_URL = environment.base_url;
export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public role?: string,
    public google?: boolean,
    public img?: string,
    public uid?: string,
  ) {
  }

  get imagenUrl() {
    // /uploads/usuarios
    if (this.img.includes('https')){
      return this.img;
    }

    if (this.img) {
      return `${BASE_URL}/uploads/usuarios/${this.img}`;
    } else {
      return `${BASE_URL}/uploads/usuarios/no-image`;
    }
  }
}
