import { Component, ViewChild } from '@angular/core';
import { DxButtonModule, DxDataGridComponent, DxDataGridModule, DxFormModule, DxPopupModule, DxProgressBarModule, DxRadioGroupModule, DxScrollViewModule, DxTabsModule, DxToolbarModule } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';

import { Proyecto } from '@interfaces/proyecto';
import { Tarea } from '@interfaces/tarea';

import { ProyectoService } from '@services/proyecto.service';
import { TipoProyectoService } from '@services/tipo-proyecto.service';

import { AreaComponent } from '../area/area.component';
import { MiembroComponent } from '../miembro/miembro.component';
import { EstadoComponent } from '../estado/estado.component';
import { EtapaComponent } from '../etapa/etapa.component';
import { UserAvatarComponent } from '@shared/user-avatar/user-avatar.component';
import { TareaKanbanComponent } from '@shared/tarea-kanban/tarea-kanban.component';
import { AdminTareaListaComponent } from '@shared/admin-tarea-lista/admin-tarea-lista.component';

const MODULES_EXTREME = [DxDataGridModule,DxFormModule,DxPopupModule,DxProgressBarModule,DxScrollViewModule,DxTabsModule,DxButtonModule,DxToolbarModule,DxRadioGroupModule];

@Component({
  selector: 'app-proyecto',
  imports: [MODULES_EXTREME],
  templateUrl: './proyecto.component.html',
  styleUrl: './proyecto.component.css'
})

export class ProyectoComponent {
  @ViewChild(DxDataGridComponent, { static: true }) dataGrid?: DxDataGridComponent;
  customersData: any;
  shippersData: any;

  url: string='';
  masterDetailDataSource: any;
  editorOptions = { placeholder: 'Search column' };
  popupVisible:boolean=false;

  showProgressBar:boolean=false;
  progressValue:number=0;

  readonly allowedPageSizes:any = [5,10, 30, 100, 'all'];
  showPageSizeSelector = true;
  showInfo = true;
  showNavButtons = true;

  listaTiposProyecto:any=[];
  taskPanelItems:any[] = [
    {text: 'Informacion'},
    {text: 'Areas'},
    {text: 'Etapas'},
    {text: 'Estados'},
    {text: 'Miembros'},
    {text: 'Panel Canva de Tareas'}
  ]

  mostrarInformacionProyecto:boolean=true;
  mostrarEstado:boolean=false;
  mostrarKanba:boolean=false;
  mostrarArea:boolean=false;
  mostrarEtapa:boolean=false;
  mostrarMiembro:boolean=false;

  misTareas:Tarea[] =[{
    idtarea:0,
    nombre:'Tarea 01',
    comentario:'',
    idestado:1,
    idproyecto:1,
    idarea:1,
    idetapa:1,
    idmiembro:1,
    area:'Area 01',
    etapa:'Etapa 01',
    miembro:'Miembro 01',
    estado:'Pendiente'
  }]

  opcionesNuevo:any={
    icon: 'add',
    text: 'Agregar Proyecto',
    onclick: () =>{
      this.elementoProyecto = {
        idproyecto:0,
        nombre:'',
        idtipoProyecto:0,
        fechaInicio:new Date(),
        fechaFin:new Date(),
        detalle:'',
        estado:'',
        idusuario:1
      }
      console.log("Nuevo proyecto");
      this.popupVisible = true;
      if(this.elementoProyecto.idproyecto>0){
        this.taskPanelItems = [
          { text: 'Proyecto'},
          { text: 'Areas'},
          { text: 'Etapas'},
          { text: 'Estados'},
          { text: 'Miembros'},
          {text: 'Panel Canva'}
        ]
      }else{
        this.taskPanelItems = [
          {
            text: 'Proyecto',
          }
        ]
      }
    }
  }

  opcionesEliminar:any = {
    icon: 'remove',
    text: 'Eliminar Proyecto',
    onClick: () => {
      console.log("Eliminar proyecto");
      this.eliminarSeleccionados();
    },
  }

  elementoProyecto:Proyecto={
    idproyecto:0,
    nombre:'',
    idtipoProyecto:0,
    fechaInicio:new Date(),
    fechaFin:new Date(),
    detalle:'',
    estado:'',
    idusuario:1
  }

  botonGuardarOpciones = {
    width: 300,
    text: 'Guardar Proyecto',
    type: 'default',
    stylingMode: 'contained',
    onClick: () => {
      this.popupVisible = false;
      this.fnGuardar();
    },
  }



  constructor(){

  }

  fnEditar(){

  }

  obtenerAlto(){

  }

  fnGuardar(){

  }

  eliminarSeleccionados(){

  }

  refresh(){

  }

  fnCancelar(){

  }

  tabValueChange(){

  }

}
