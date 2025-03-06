import {
  Component, OnInit, NgModule, ViewChild, Input, inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxTabsModule } from 'devextreme-angular/ui/tabs';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxTabsTypes } from 'devextreme-angular/ui/tabs';
import { DxTextBoxTypes } from 'devextreme-angular/ui/text-box';
import notify from 'devextreme/ui/notify';
import { forkJoin, map, Observable } from 'rxjs';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';
import { TareaKanbanComponent } from '../tarea-kanban/tarea-kanban.component';
import { DxFormModule, DxPopupModule } from 'devextreme-angular';
import { TareaService } from '@services/tarea.service'
import { ProyectoService } from '@services/proyecto.service'

@Component({
  selector:'panel-canva',
    templateUrl: './admin-tarea-lista.component.html',
    styleUrls: ['./admin-tarea-lista.component.scss'],
    standalone: true, // nos permite usar el componente sin necesidad de importarlo en otro modulo, es decir, que sea independiente de otros modulos y pueda ser usado en cualquier parte de la aplicacion
    imports: [DxButtonModule,
        DxDataGridModule,
        DxTabsModule,
        DxToolbarModule,
        DxLoadPanelModule,
        CommonModule, TareaKanbanComponent, DxPopupModule, DxFormModule
      ]
})
export class AdminTareaListaComponent implements OnInit {
  //@ViewChild('planningDataGrid', { static: false }) dataGrid: TaskListGridComponent;

  //@ViewChild('planningGantt', { static: false }) gantt: TaskListGanttComponent;

  @ViewChild('planningKanban', { static: false }) kanban?: TareaKanbanComponent;

  //@ViewChild(TaskFormComponent, { static: false }) taskForm: TaskFormComponent;

  @Input() idproyecto:number=0;

  newTask:any = {};

  taskPanelItems:any[] = [];



  isAddTaskPopupOpened = false;


  //taskCollections$: Observable<{ allTasks: Task[]; filteredTasks: Task[] }>;
  taskCollections:any[]=[];

  servicioTarea = inject(TareaService);

  tareasCargadas:boolean=false;

  popupVisible:boolean=false;
  entidadGenerica:any; //entidad generica para guardar o editar alguna tarea

  guardarButtonOptions = {
    width: 300,
    text: 'Guardar',
    type: 'default',
    stylingMode: 'contained',
    onClick: () => {
      this.popupVisible = false;
      this.fnGuardar(this.entidadGenerica);
    },
  };

  lista_areas :any[]=[];
  lista_estados :any[]=[];
  lista_etapas :any[]=[];
  lista_miembros :any[]=[];

  constructor(private servicioProyecto:ProyectoService) {

  }

  ngOnInit(): void {
    this.refresh();
  }

  tabValueChange(e: DxTabsTypes.ItemClickEvent) {
    const { itemData } = e;
 };

  addTask = () => {
    this.entidadGenerica = {
      idtarea:0
    }
    this.fnCombos();
  };

  addTaskDesdePanel(panel:string){
    this.entidadGenerica = {
      idtarea:0,
      idestado:(panel=='Pendiente'?1:(panel=='En proceso'?2:(panel=='Completado'?3:null)))
    }
    this.fnCombos();
  }

  editTarea(e:any){
    console.log('editar',e);
    this.entidadGenerica = e;
    this.fnCombos();

  }

  eliminarTarea(e:any){
    console.log('eliminarTarea',e);
    let datosEliminar:any={
      idtarea:e.idtarea
    };


    this.servicioTarea.eliminarTarea(datosEliminar).subscribe({
      next: data => {

        console.log('data',data);

        notify("Se elimino correctamente", 'success', 2000);
        this.refresh();

      },
      error: errores => {
        console.log(errores);
      }
    });

  }

  onClickSaveNewTask = () => {
    /*notify({
        message: `New task "${this.taskForm.getNewTaskData().text}" saved`,
        position: { at: 'bottom center', my: 'bottom center' }
      },
      'success');*/
  };

  refresh = () => {
    console.log('refresh');
    this.servicioTarea.getListTarea(this.idproyecto).subscribe({
      next: data => {
        console.log('tereas',data);
        this.taskCollections = data;
        this.tareasCargadas = true;
        this.kanban?.refresh();
      },
      error: err => {

      }
    });
    /*if (this.displayGrid) {
      this.dataGrid?.refresh();
    } else if (this.displayKanban) {*/

    /*} else {
      this.gantt.refresh();
    }*/
  };

  //chooseColumnDataGrid = () => this.dataGrid.showColumnChooser();

  //searchDataGrid = (e: DxTextBoxTypes.InputEvent) => this.dataGrid.search(e.component.option('text'));

  exportToPdf = () => {
    /*if (this.displayGrid) {
      this.dataGrid.onExportingToPdf();
    } else {
      this.gantt.onExporting();
    }*/
  };

  fnCombos(){
    this.servicioProyecto.obtenerCombosProyecto(this.idproyecto).subscribe({
      next: (data:any) => {

        console.log('data combos',data);
        this.lista_areas = data.lista_areas;
        this.lista_estados = data.lista_estados;
        this.lista_etapas = data.lista_etapas;
        this.lista_miembros = data.lista_miembros;


        this.popupVisible = true;

      },
      error: errores => {
        console.log(errores);
      }
    });
  }

  fnGuardar(entidad:any){


    if(entidad.idtarea>0){
      let datos :any = {
        idtarea:entidad.idtarea,
        nombre:entidad.nombre,
        comentario:entidad.comentario,
        idestado:entidad.idestado,
        idetapa:entidad.idetapa,
        idmiembro:entidad.idmiembro,
        idarea : entidad.idarea,
        idusuario:1,
        idproyecto:entidad.idproyecto

      };
      console.log('guardar',datos);

      this.servicioTarea.actualizarTarea(datos).subscribe({
        next: (data:any) => {

          console.log('data',data);
          notify('Se actualizo la tarea', 'success', 2000);
          this.refresh();


        },
        error: errores => {
          console.log(errores);
        }
      });

    }else{
      let datos :any = {
        idtarea:0,
        nombre:entidad.nombre,
        comentario:entidad.comentario,
        idestado:entidad.idestado,
        idetapa:entidad.idetapa,
        idmiembro:entidad.idmiembro,
        idarea : entidad.idarea,
        idusuario:1,
        idproyecto:this.idproyecto

      };
      this.servicioTarea.agregarTarea(datos).subscribe({
        next: (data:any) => {

          console.log('data',data);
          notify('Se creo la tarea', 'success', 2000);
          this.refresh()
        },
        error: errores => {
          console.log(errores);
        }
      });
    }
  }
}
