import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTipoProyectoComponent } from './lista-tipo-proyecto.component';

describe('ListaTipoProyectoComponent', () => {
  let component: ListaTipoProyectoComponent;
  let fixture: ComponentFixture<ListaTipoProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTipoProyectoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTipoProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
