/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PedidoService } from './pedidoService.service';

describe('Service: PedidoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PedidoService]
    });
  });

  it('should ...', inject([PedidoService], (service: PedidoService) => {
    expect(service).toBeTruthy();
  }));
});
