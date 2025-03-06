import {
  Component,Input, OnChanges, ViewChild, Output, EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { DxSortableModule, DxSortableComponent } from 'devextreme-angular/ui/sortable';

import notify from 'devextreme/ui/notify';
import { DxSortableTypes } from 'devextreme-angular/ui/sortable';
import { CardMenuComponent } from "../card-menu/card-menu.component";
import { TaskKanbanCardComponent } from "../tarea-kanban-card/tarea-kanban-card.component";
import { Task, TaskStatus, taskStatusList } from '@interfaces/task';
import { TareaService } from '@services/tarea.service'


type Board = {
  name: TaskStatus
  cards: Task[]
};

@Component({
    selector: 'tarea-kanban',
    templateUrl: './tarea-kanban.component.html',
    styleUrls: ['./tarea-kanban.component.scss'],
    standalone: true,
    imports: [
        DxButtonModule,
        DxScrollViewModule,
        DxSortableModule,
        CommonModule,
        CardMenuComponent,
        TaskKanbanCardComponent
    ]
})
export class TareaKanbanComponent implements OnChanges {
  @ViewChild(DxSortableComponent, { static: false }) sortable?: DxSortableComponent;

  @Input() dataSource?: any[];

  @Output() addTaskEvent: EventEmitter<any> = new EventEmitter();
  @Output() editTaskEvent: EventEmitter<any> = new EventEmitter();
  @Output() eliminarTaskEvent: EventEmitter<any> = new EventEmitter();

  kanbanDataSource: Board[] = [];

  statuses = taskStatusList;

  boardMenuItems: Array<{ text: string }> = [
    { text: 'Agregar Tarea' },
    { text: 'Copia Lista' },
    { text: 'Mover Lista' },
  ];

  constructor(private servicioTarea : TareaService){
  }

  ngOnInit(){

    console.log('recibe data',this.dataSource);
  }

  refresh() {
    console.log('refresh instance.update');
    this.sortable?.instance.update();
  }

  fillOutBoard = (cards: any[]): Board[] => {
    const result: Board[] = [];
    for (const status of this.statuses) {
      const value = cards.filter((item) => item.estado === status);

      result.push(<Board>{ name: status, cards: value });
    }

    return result;
  };

  ngOnChanges(changes: any) {
    console.log('ngOnChanges',changes);
    if (changes.dataSource) {
      this.kanbanDataSource = this.fillOutBoard(changes.dataSource.currentValue);
    }
  }

  getCardsByStatus = (status: any): Task[] => {
    const cards: any = this.dataSource?.filter((task:any) => task.status === status);

    return cards;
  };

  onListReorder = (e: DxSortableTypes.ReorderEvent) => {

    console.log('onListReorder');
    const { fromIndex, toIndex } = e;
    const list = this.kanbanDataSource.splice(fromIndex, 1)[0];
    this.kanbanDataSource.splice(toIndex, 0, list);
  };

  onTaskDragStart(e: DxSortableTypes.DragStartEvent) {
    console.log('onTaskDragStart');
    const { fromData, fromIndex } = e;
    e.itemData = fromData.cards[fromIndex];
  }

  onTaskDrop(e: DxSortableTypes.ReorderEvent | DxSortableTypes.AddEvent) {
    console.log('onTaskDrop');
    const {
      fromData, toData, fromIndex, toIndex, itemData,
    } = e;



    fromData.cards.splice(fromIndex, 1);
    toData.cards.splice(toIndex, 0, itemData);

    console.log('itemData',itemData,toData.name);
    if(!(toData.name==itemData.estado)){
      itemData.estado = toData.name;
      itemData.idestado = (toData.name=='Pendiente'?1:(toData.name=='En proceso'?2:(toData.name=='Completado'?3:0)));

      let datos :any = {
        idtarea:itemData.idtarea,
        nombre:itemData.nombre,
        comentario:itemData.comentario,
        idestado:itemData.idestado,
        idetapa:itemData.idetapa,
        idmiembro:itemData.idmiembro,
        idarea : itemData.idarea,
        idproyecto:itemData.idproyecto

      };
      console.log('guardar',datos);

      this.servicioTarea.actualizarTareaEstado(datos).subscribe({
        next: (data:any) => {

          console.log('data',data);
          notify('Se actualizo la tarea', 'success', 2000);
          this.refresh();


        },
        error: errores => {
          console.log(errores);
        }
      });
    }
  }

  addTask(nombre:string) {
    this.addTaskEvent.emit(nombre);
  }

  fnEditarTarea(e:any){
    console.log('en medio');
    this.editTaskEvent.emit(e);
  }

  fnEliminarTarea(e:any){
    console.log('en medio');
    this.eliminarTaskEvent.emit(e);
  }
}
