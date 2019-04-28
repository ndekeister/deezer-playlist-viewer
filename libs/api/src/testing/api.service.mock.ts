import { Observable, of } from 'rxjs';

export class ApiServiceMock {
  get(): Observable<any> {
    return of();
  }
}
