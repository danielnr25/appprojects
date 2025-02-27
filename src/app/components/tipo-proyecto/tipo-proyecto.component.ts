import { Component, inject, signal } from '@angular/core';
import { TipoProyecto } from '../../interfaces/tipo-proyecto';
import { TipoProyectoService } from '../../services/tipo-proyecto.service';
import { ListaTipoProyectoComponent } from './lista-tipo-proyecto/lista-tipo-proyecto.component';
@Component({
  selector: 'app-tipo-proyecto',
  imports: [ListaTipoProyectoComponent],
  templateUrl: './tipo-proyecto.component.html',
  styleUrl: './tipo-proyecto.component.css'
})
export class TipoProyectoComponent {
  private _servicioTipoProyecto = inject(TipoProyectoService);
  listTypeProject = signal<TipoProyecto[]>([]);

  ngOnInit(){
      this._servicioTipoProyecto.getTipoProyectos().subscribe({
        next: (response) =>{
          console.log('Se listo la informacion',response);
          this.listTypeProject.set(response);
        },
        error:(response)=>{
          console.log('El error de la data',response)
        },
        complete:()=>{
          console.log('Siempre se ejecuta')
        }
      })
  }
}
