import {
  Component, EventEmitter, Input, NgModule, Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DxButtonModule, DxToastModule } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { UserAvatarComponent } from "../user-avatar/user-avatar.component";
import { Observable } from 'rxjs';


@Component({
    selector: 'task-kanban-card',
    templateUrl: './tarea-kanban-card.component.html',
    styleUrls: ['./tarea-kanban-card.component.scss'],
    standalone: true,
    imports: [
        DxButtonModule,
        DxToastModule,
        CommonModule,
        UserAvatarComponent
    ]
})
export class TaskKanbanCardComponent {
  @Input() task?: any;
  @Output() eventEditar: EventEmitter<any> = new EventEmitter();
  @Output() eventEliminar: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {
  }

  getAvatarText = (nombre: string) => nombre.split(' ').map((nombre) => nombre[0]).join('');

  notify = (e:any) => {
    e.event.stopPropagation();
    //notify(`Edit '${this.task?.nombre}' card event`);
    this.eventEditar?.emit(this.task);
  };

  eliminar = (e:any) => {
    e.event.stopPropagation();
    //notify(`Edit '${this.task?.nombre}' card event`);
    this.eventEliminar?.emit(this.task);
  };

  navigateToDetails = () => {
    //this.router.navigate(['/planning-task-details']);
  };
}
