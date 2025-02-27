import { Component,ViewChild } from '@angular/core';
import { DxDataGridComponent, DxDataGridModule, DxFormModule, DxPopupModule, DxProgressBarModule,DxButtonModule,DxToolbarModule } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import { TipoProyecto } from '@interfaces/tipo-proyecto';
import {TipoProyectoService} from '@services/tipo-proyecto.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const IMPORTS_DEVEXTREME = [ DxDataGridModule,DxFormModule,DxPopupModule,DxProgressBarModule,DxButtonModule,DxToolbarModule];

@Component({
  selector: 'app-tipo-proyecto',
  standalone: true,
  imports: [IMPORTS_DEVEXTREME],
  templateUrl: './tipo-proyecto.component.html',
  styleUrl: './tipo-proyecto.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class TipoProyectoComponent {
    @ViewChild(DxDataGridComponent, { static: true }) dataGrid?: DxDataGridComponent;
    customersData: any;
    shippersData: any;
    dataSource;
    url: string='';
    masterDetailDataSource: any;

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

    opcionesEliminar:any={
        icon: 'remove',
        text: 'Eliminar Tipo de Proyecto',
        onClick: () => {
            console.log("Eliminar tipo proyecto");
            this.eliminarSeleccionados();
        },
    };

    editorOptions = { placeholder: 'Search column' };
    popupVisible:boolean=false;

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

    constructor(private servicioTipos:TipoProyectoService){
        this.fnEditar = this.fnEditar.bind(this);
        this.dataSource = new DataSource({
          key: 'idtipo_proyecto',
          load: (loadOptions) => {

            return new Promise((resolve, reject) => {

              this.servicioTipos.getTipoProyectos().subscribe({
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
        this.elementoTipoProyecto = e.row.data; // Asigna los datos del registro seleccionado al objeto que se esta editando
        this.popupVisible = true; // Muestra el popup de edición
        console.log('fila',e, this.popupVisible);
    }

    obtenerAlto(){
      return window.innerHeight;
    }

    fnGuardar(){
      if(this.elementoTipoProyecto.idtipo_proyecto > 0 ){
        this.servicioTipos.actualizarTipoProyecto(this.elementoTipoProyecto).subscribe({
          next: data => {
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

        this.servicioTipos.agregarTipoProyecto(this.elementoTipoProyecto).subscribe({
          next: data => {
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

  eliminarSeleccionados() {
    const seleccionados :any = this.dataGrid?.instance.getSelectedRowsData();

    console.log(seleccionados);

    if (seleccionados.length === 0) {
      notify({
        message: 'Debe seleccionar un registro a eliminar',
        type:'info',
        displayTime: 1000,
        //position: { at: 'top right', my: 'top right' },
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

      console.log('datos item',item);

      let datosEliminar:any={
        idtipo_proyecto:item.idtipo_proyecto
      };

      this.servicioTipos.eliminarTipoProyecto(datosEliminar).subscribe({
        next: data => {


          itemsEliminados++;
          this.progressValue = (itemsEliminados / totalItems) * 100;

          // Si todos los elementos han sido eliminados, oculta la barra de progreso
          if (itemsEliminados === totalItems) {
            this.showProgressBar = false;
            this.progressValue = 0;

            notify(data.message, 'success', 2000);
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


}
