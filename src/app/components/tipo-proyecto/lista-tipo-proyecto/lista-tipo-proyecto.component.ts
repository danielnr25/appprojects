import { Component, Input } from '@angular/core';
import { TipoProyecto } from '../../../interfaces/tipo-proyecto';
import {MatTableModule} from '@angular/material/table';

const MATERIAL_MODULES = [MatTableModule]
@Component({
  selector: 'app-lista-tipo-proyecto',
  imports: [MATERIAL_MODULES],
  templateUrl: './lista-tipo-proyecto.component.html',
  styleUrl: './lista-tipo-proyecto.component.css'
})
export class ListaTipoProyectoComponent {
  @Input() listaTipoProyectos: TipoProyecto[]=[{
    idtipo_proyecto:0, nombre:'vacio',comentario:'sin comentario',estado:'sin estado'
  }];

  @Input() EstiloTabla:any;
  displayedColumns: string[] = ['idtipo_proyecto','nombre','comentario','estado'];
}
