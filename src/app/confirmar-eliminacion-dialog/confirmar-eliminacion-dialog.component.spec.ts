import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarEliminacionDialogComponent } from './confirmar-eliminacion-dialog.component';

describe('ConfirmarEliminacionDialogComponent', () => {
  let component: ConfirmarEliminacionDialogComponent;
  let fixture: ComponentFixture<ConfirmarEliminacionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmarEliminacionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmarEliminacionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
