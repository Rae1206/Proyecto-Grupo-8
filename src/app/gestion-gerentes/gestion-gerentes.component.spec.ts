import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionGerentesComponent } from './gestion-gerentes.component';

describe('GestionGerentesComponent', () => {
  let component: GestionGerentesComponent;
  let fixture: ComponentFixture<GestionGerentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionGerentesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionGerentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
