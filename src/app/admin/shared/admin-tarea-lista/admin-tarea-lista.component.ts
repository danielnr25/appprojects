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
  selector: 'panel-canva',
  standalone:true,
  imports: [DxButtonModule,
    DxDataGridModule,
    DxTabsModule,
    DxToolbarModule,
    DxLoadPanelModule,
    CommonModule, TareaKanbanComponent, DxPopupModule, DxFormModule],
  templateUrl: './admin-tarea-lista.component.html',
  styleUrl: './admin-tarea-lista.component.css'
})
export class AdminTareaListaComponent implements OnInit {
  @ViewChild('planningKanban', { static: false }) kanban?: TareaKanbanComponent;
  @Input() idproyecto:number=0;

  newTask:any = {};
  taskPanelItems:any[] = [];
  isAddTaskPopupOpened = false;
  taskCollections:any[]=[];
  servicioTarea = inject(TareaService);
  tareasCargadas:boolean=false;
  popupVisible:boolean=false;
  entidadGenerica:any; // entidad generica nos sirve para guardar o editar alguna tarea
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
          console.error(err);
        }
    });

  };
}
