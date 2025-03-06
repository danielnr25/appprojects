import { Component,ViewChild,Input } from '@angular/core';
import { DxDataGridComponent, DxDataGridModule, DxFormModule, DxPopupModule, DxProgressBarModule } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import {Area} from '@interfaces/area';
import {AreaService} from '@services/area.service';

const MODULES_DEVEXTREME = [DxDataGridModule,DxFormModule,DxPopupModule,DxProgressBarModule];
@Component({
  selector: 'app-area',
  imports: [MODULES_DEVEXTREME],
  templateUrl: './area.component.html',
  styleUrl: './area.component.css'
})

export class AreaComponent {
  @ViewChild(DxDataGridComponent, { static: true }) dataGrid?: DxDataGridComponent;
  @Input() idproyecto:number=0;
  customersData: any;
  shippersData: any;
  dataSource;
  url: string='';
  masterDetailDataSource: any;

  opcionesNuevo:any={
    icon: 'add',
    text: 'Agregar Area',
    onClick: () => {
      this.elementoArea = {
        idarea:0,
        nombre:'',
        comentario:'',
        estado:'',
        idproyecto:0
      }
      console.log("Nueva area");
      this.popupVisible = true;
    },
  };

  opcionesEliminar:any={
    icon: 'remove',
    text: 'Eliminar Area',
    onClick: () => {
      console.log("Eliminar area");
      this.eliminarSeleccionados();
    },
  };

  editorOptions = { placeholder: 'Search column' };
  popupVisible:boolean=false;
  elementoArea:Area ={
    idarea:0,
    nombre:'',
    comentario:'',
    estado :'',
    idproyecto:0
  }

  botonGuardarOpciones={
    width: 300,
    text: 'Guardar Area',
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

  constructor(private servicioArea:AreaService){

  }

  fnEditar(e:any){
    this.elementoArea = e.row.data;
    this.popupVisible = true;
  }

  obtenerAlto(){
    return window.innerHeight;
  }

  fnGuardar(){
    if(this.elementoArea.idarea > 0 ){
      this.servicioArea.actualizarArea(this.elementoArea).subscribe({
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
          this.refresh();
        },
        error: err => {
          console.log(err)
        }
      });
    }else{
      this.servicioArea.agregarArea(this.elementoArea).subscribe({
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
          this.refresh();
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
    if(seleccionados.length) === 0{
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

      this.showProgressBar=true;

      const totalItems = seleccionados.length;
      let itemsEliminados = 0;
      seleccionados.forEach((item:any, index:any) => {

        let datosEliminar:any={
          idarea:item.idarea
        };

        this.servicioArea.eliminarArea(datosEliminar).subscribe({
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

  }

  refresh(){
    this.dataGrid?.instance.refresh();
  }




}
