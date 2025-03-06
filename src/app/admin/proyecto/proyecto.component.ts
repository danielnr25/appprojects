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
  dataSource;
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
        idtipo_proyecto:0,
        fecha_inicio:new Date(),
        fecha_fin:new Date(),
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
    idtipo_proyecto:0,
    fecha_inicio:new Date(),
    fecha_fin:new Date(),
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

  constructor(private servicioProyectos:ProyectoService,private servicioTipoProyecto:TipoProyectoService){
    this.fnEditar = this.fnEditar.bind(this);
    this.dataSource = new DataSource({
      key: 'idproyecto',
      load: (loadOptions) => {
        return new Promise((resolve, reject) => {
          this.servicioProyectos.getListProyecto().subscribe({
            next: data => {
              console.log(data);
              let result = {
                data: data,
                totalCount: data.length
              };
              resolve(result);
            },
            error: err => {
              reject(err);
            }
          });
        });
      }
    });
  }

  fnEditar(e:any){
    this.elementoProyecto = e.row.data;
    this.popupVisible = true;
    if(this.elementoProyecto.idproyecto>0){
      this.taskPanelItems = [
        {
          text: 'Proyecto',
        },
        {
          text: 'Areas',
        },
        {
          text: 'Etapas',
        },
        {
          text: 'Estados',
        },
        {
          text: 'Miembros',
        },
        {
          text: 'Panel Canva',
        }
      ]
    }else{
      this.taskPanelItems = [
        {
          text: 'Proyecto',
        }
      ]
    }

    this.mostrarInformacionProyecto=true;
  }

  obtenerAlto(){
    return window.innerHeight;
  }

  fnGuardar(){
    let datos = {
      idproyecto : this.elementoProyecto.idproyecto,
      nombre : this.elementoProyecto.nombre,
      fecha_inicio : this.elementoProyecto.fecha_inicio,
      fecha_fin : this.elementoProyecto.fecha_fin,
      estado : this.elementoProyecto.estado,
      idusuario : 1,
      detalle: this.elementoProyecto.detalle,
      idtipo_proyecto : this.elementoProyecto.idtipo_proyecto
    }


    if(this.elementoProyecto.idproyecto > 0 ){
      this.servicioProyectos.actualizarProyecto(datos).subscribe({
        next: data => {
          console.log(data);
          notify({
            message: 'Se actualizo de manera correcta',
            type:'success',
            displayTime: 1000,
            animation: {
              show: {
                type: 'fade', duration: 400, from: 0, to: 1,
              },
              hide: { type: 'fade', duration: 40, to: 0 },
            },
          });
        },
        error: err => {
          console.log(err)
        }
      });
    }else{
      this.servicioProyectos.agregarProyecto(datos).subscribe({
        next: data => {
          console.log(data);
          notify({
            message: 'Se guardo de manera correcta',
            type:'success',
            displayTime: 1000,
            animation: {
              show: {
                type: 'fade', duration: 400, from: 0, to: 1,
              },
              hide: { type: 'fade', duration: 40, to: 0 },
            },
          });
        },
        error: err => {
          console.log(err)
        }
      });
    }
  this.refresh();
  }

  eliminarSeleccionados(){
    const seleccionados :any = this.dataGrid?.instance.getSelectedRowsData();
    if (seleccionados.length === 0) {
      notify({
        message: 'Debe seleccionar un registro a eliminar',
        type:'info',
        displayTime: 1000,
        animation: {
          show: {
            type: 'fade', duration: 400, from: 0, to: 1,
          },
          hide: { type: 'fade', duration: 40, to: 0 },
        },
      });
      return;
    }

    this.showProgressBar = true;
    const totalItems = seleccionados.length;
    let itemsEliminados = 0;
    seleccionados.forEach((item:any, index:any) => {
      let datosEliminar:any={
        idproyecto:item.idproyecto
      };

      this.servicioProyectos.eliminarProyecto(datosEliminar).subscribe({
        next: data => {
          console.log('data',data);
          itemsEliminados++;
          this.progressValue = (itemsEliminados / totalItems) * 100;

          // Si todos los elementos han sido eliminados, oculta la barra de progreso
          if (itemsEliminados === totalItems) {
            this.showProgressBar = false;
            this.progressValue = 0;

            notify("Se elimino correctamente", 'success', 2000);
            this.refresh();
          }

        },
        error: errores => {
          console.log(errores);
        }
      });
    });
  }

  refresh(){
    this.dataGrid?.instance.refresh();
  }

  fnCancelar(){
    this.popupVisible=false;
  }

  tabValueChange(e:any){
    this.mostrarInformacionProyecto=(e.itemIndex == 0);
  }

}
