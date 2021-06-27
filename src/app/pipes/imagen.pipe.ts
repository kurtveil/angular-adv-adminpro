import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
const BASE_URL = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios' | 'medicos' | 'hopitales'): string {
      if (!img) {
        return `${BASE_URL}/uploads/usuarios/no-image`;
      } else if (img.includes('https')){
        return img;
      } else if (img) {
        return `${BASE_URL}/uploads/${tipo}/${img}`;
      } else {
        return `${BASE_URL}/uploads/usuarios/no-image`;
      }
  }

}
