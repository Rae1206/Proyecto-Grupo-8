import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCategoriasComponent } from './gestion-categorias.component';

describe('GestionCategoriasComponent', () => {
  let component: GestionCategoriasComponent;
  let fixture: ComponentFixture<GestionCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionCategoriasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
