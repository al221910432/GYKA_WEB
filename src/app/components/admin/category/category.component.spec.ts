import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';

import { CategoryService } from 'src/app/_service/category.service';

describe('CategoryService', () => {
    let service: CategoryService;
    let httpMock: HttpTestingController;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [CategoryService],
      });
  
      service = TestBed.inject(CategoryService);
      httpMock = TestBed.inject(HttpTestingController);
    });
  
    afterEach(() => {
      httpMock.verify();
    });
   
    it('Se esta obteniendo una lista de categorias', () => {
        const categorias = [{ id: 1, name: 'panaderia' }, { id: 2, name: 'botanas' }];
      
        service.getListCategory().subscribe(categories => {
          expect(categories).toEqual(categorias);
        });
      
        const req = httpMock.expectOne('https://gykabackendfinal-production.up.railway.app/api/category/');
        expect(req.request.method).toBe('GET');
        req.flush(categorias);
      });
      
  });
  
  





