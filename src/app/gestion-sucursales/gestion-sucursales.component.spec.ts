import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSucursalesComponent } from './gestion-sucursales.component';

describe('GestionSucursalesComponent', () => {
  let component: GestionSucursalesComponent;
  let fixture: ComponentFixture<GestionSucursalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionSucursalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionSucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
