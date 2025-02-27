import { Component, ViewChild } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { DxDataGridComponent, DxDataGridModule, DxFormModule, DxPopupModule, DxProgressBarModule,DxToolbarModule } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { TipoProyecto } from '@interfaces/tipo-proyecto';
import { TipoProyectoService } from '@services/tipo-proyecto.service';

const IMPORTS_DEVEXTREME = [DxDataGridModule,DxFormModule,DxProgressBarModule,DxPopupModule,DxToolbarModule]

@Component({
  selector: 'app-tipo-proyecto',
  imports: [IMPORTS_DEVEXTREME],
  templateUrl: './tipo-proyecto.component.html',
  styleUrl: './tipo-proyecto.component.css'
})

export class TipoProyectoComponent {
  @ViewChild(DxDataGridComponent, { static: true }) dataGrid?: DxDataGridComponent;
  customersData: any;
  shippersData: any;
  dataSource;
  url: string='';
  masterDetailDataSource: any;
  popupVisible:boolean=false;

  opcionesNuevo:any={
    icon: 'add',
    text: 'Agregar Tipo de Proyecto',
    onClick: () => {
      this.elementoTipoProyecto = {
        idtipo_proyecto:0,
        nombre:'',
        comentario:'',
        estado:''
      }
      console.log("Nuevo tipo proyecto");
      this.popupVisible = true;
    },
  };

  opcionesEliminar:any = {
    icon: 'remove',
    text: 'Eliminar Tipo de Proyecto',
    onClick: () => {
        console.log("Eliminar tipo proyecto");
        this.eliminarSeleccionados();
    },
  }

  editorOptions = { placeholder: 'Search column' };


  elementoTipoProyecto:TipoProyecto={
    idtipo_proyecto:0,
    nombre:'',
    comentario:'',
    estado:''
  };

  botonGuardarOpciones={
    width: 300,
    text: 'Guardar Tipo Proyecto',
    type: 'default',
    stylingMode: 'contained',
    onClick: () => {
      this.popupVisible = false;
      this.fnGuardar();
    },
  }

  showProgressBar:boolean=false;
  progressValue:number=0;

  readonly allowedPageSizes:any = [5,10, 30, 100, 'all'];
  showPageSizeSelector = true;
  showInfo = true;
  showNavButtons = true;


  constructor(private _tiposproyecto:TipoProyectoService){
    this.fnEditar = this.fnEditar.bind(this);
    this.dataSource = new DataSource({
      key:'idtipo_proyecto',
      load:() =>{
        return new Promise((resolve, reject) => {
          console.log('entro2')
          this._tiposproyecto.getTipoProyectos().subscribe({
            next: data =>{
              console.log('entro')
              console.log(data);
              let result = {
                data: data,
                totalCount:data.length
              };
              resolve(result);
            },
            error: err =>{
              reject(err);
            }
          })
        });
      }
    })
  }

  fnEditar(){
    console.log('Editar');
  }


  fnGuardar(){
    console.log('Guardando información ....')
  }

  eliminarSeleccionados(){
    console.log('eliminados');
  }

  obtenerAlto(){
    return window.innerHeight;
  }

  refresh(){
    this.dataGrid?.instance.refresh();
  }
}
