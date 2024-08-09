import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProveedoresComponent } from './gestion-proveedores.component';

describe('GestionProveedoresComponent', () => {
  let component: GestionProveedoresComponent;
  let fixture: ComponentFixture<GestionProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionProveedoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
