import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { ApiService } from './api.service';
import {
  HttpErrorResponse,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { throwError } from 'rxjs';

describe('ApiService', () => {
  let httpTestingController: HttpTestingController;
  let service: ApiService;

  const baseUrl = 'http://example.com';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiService,
        {
          provide: 'API_URL',
          useValue: baseUrl
        }
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('handle get', () => {
    it('should perform correctly', () => {
      const response = 'test';

      service.get('').subscribe(result => {
        expect(result).toBe(response);
      });

      const req = httpTestingController.expectOne({ url: baseUrl });
      req.flush(response);

      expect(req.request.method).toEqual('GET');
    });

    it('should perform correctly with httpParams', () => {
      const response = 'test';

      service
        .get('', new HttpParams({ fromString: 'angular=awesome' }))
        .subscribe(result => {
          expect(result).toBe(response);
        });

      const req = httpTestingController.expectOne({
        url: baseUrl + '?angular=awesome'
      });
      req.flush(response);

      expect(req.request.method).toEqual('GET');
    });

    it('should fail correctly', () => {
      const errorMessage = 'random error';

      spyOn(service, 'handleError').and.callThrough();

      service.get('').subscribe(
        result => fail('should have failed'),
        error => {
          expect(service.handleError).toHaveBeenCalled();
          expect(console.error).toHaveBeenCalled();
          expect(error.status).toEqual(404);
        }
      );

      const req = httpTestingController.expectOne(baseUrl);

      // Respond with mock error
      req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
    });
  });

  it('should return correct headers', () => {
    const headers: HttpHeaders = service.headers;
    expect(headers).toBeInstanceOf(HttpHeaders);
    expect(headers.get('Accept')).toBe('application/json');
    expect(headers.get('Content-Type')).toBe('application/json');
  });
});
