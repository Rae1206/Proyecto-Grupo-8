import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionClientesComponent } from './gestion-clientes.component';

describe('GestionClientesComponent', () => {
  let component: GestionClientesComponent;
  let fixture: ComponentFixture<GestionClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionClientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
