import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { BusquedasService } from '../../services/busquedas.service';

import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {


  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];


  constructor(private activatedRoute: ActivatedRoute,
              private busquedaService: BusquedasService) { }

  ngOnInit(): void {

    this.activatedRoute.params.
    subscribe(({termino}) => this.busquedaTotal(termino));
  }

  busquedaTotal(termino: string){
    this.busquedaService.busquedaGlobal(termino)
    .subscribe((res: any) => {
      this.usuarios = res.usuarios;
      this.medicos = res.medicos;
      this.hospitales = res.hospitales;
    });

  }

  abrirMedico(medico: Medico){

  }

}
